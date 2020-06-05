/**
* AJAX Get
*	Get a single file via ajax and then perform a callback
**/
AJAX.Get("data/file.txt", function(data){
	AJAX.Write("output-single", data);
});

/**
* AJAX registry
* 	Load multiple files via ajax and then perform a callback function
**/
AJAX.Add("data/001.txt", "001");
AJAX.Add("data/002.txt", "002");
AJAX.Add("data/003.txt", "003");
AJAX.Load(function(){
	AJAX.Write("output-001", AJAX.Find("001").data);
	AJAX.Write("output-002", AJAX.Find("002").data);
	AJAX.Write("output-003", AJAX.Find("003").data);
});