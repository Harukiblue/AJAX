function AjaxClass(){
	this.collection = new Array();
}
AjaxClass.prototype.Get = function(file, callback, returnType){
	var aArgs = Array.prototype.slice.call(arguments, 3);
	if (typeof returnType === 'undefined') { returnType = 0; }
	var xmlhttp;

	if (window.XMLHttpRequest) {
		// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp = new XMLHttpRequest();
	} else {
		// code for IE6, IE5
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}

	xmlhttp.onreadystatechange = function() {
		if(xmlhttp.readyState == XMLHttpRequest.DONE || xmlhttp.readyState == 4){
		   if(xmlhttp.status == 200){
				switch(returnType){
					case 0:
						aArgs = [xmlhttp.responseText].concat(aArgs);
						callback.apply(null, aArgs);
					break;
					case 1:
						aArgs = [xmlhttp.responseXML].concat(aArgs);
						callback.apply(null, aArgs);
					default:
						aArgs = [xmlhttp.responseText].concat(aArgs);
						callback.apply(null, aArgs);
					break;
				}
		   }else if(xmlhttp.status == 400) {

		   }else{

		   }
		}
	}

	xmlhttp.open("GET", file, true);
	xmlhttp.send();
}
AjaxClass.prototype.Write = function(id, txt){
	var container = document.getElementById(id);
	console.log(container, id, txt);
	var content = document.createElement("span");
	content.innerHTML = txt;
	container.appendChild(content);
}
AjaxClass.prototype.Load = function (callback){
	for(var i = 0; i < this.collection.length; i++){
		var item = this.collection[i];
		param = {
			ctx: this,
			index: i,
			callback: callback
		}
		this.Get(item.path, function(data, param){
			var item = param.ctx.collection[param.index];
			item.data = data;
			item.loaded = true;
			param.ctx.collection[param.index] = item;
			if(param.ctx.Done()){
				param.callback();
			}
		}, item.type, param);
	}
}
AjaxClass.prototype.Done = function (){
	for(var i = 0; i < this.collection.length; i++){
		if(!this.collection[i].loaded){
			return false;
		}
	}
	return true;
}
AjaxClass.prototype.Add = function (path, id, returnType){
	this.collection.push({
		path: path,
		id, id,
		data: "",
		loaded: false,
		type: returnType !== null && returnType !== undefined ? returnType : 0
	});
}
AjaxClass.prototype.Find = function (id){
	for(var i = 0; i < this.collection.length; i++){
		if (this.collection[i].id === id){
			return this.collection[i];
		}
	}
}
AJAX = new AjaxClass();