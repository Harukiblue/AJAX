# AJAX
Get files via ajax. This uses vanilla JS ajax, no third party library. Retrieve a single file or a multiple file with the ajax registry.

* Get a single file via ajax and then perform a callback
HTML
```html
<section>
	<h2>Get single file via ajax</h2>
	<div id="output-single"></div>
</section>

```
JavaScript
```javascript
AJAX.Get("data/file.txt", function(data){
	AJAX.Write("output-single", data);
});
```

* Load multiple files via ajax and then perform a callback function
HTML
```html
<section>
	<h2>Get multiple files via ajax</h2>
	<div id="output-001"></div>
	<div id="output-002"></div>
	<div id="output-003"></div>
</section>
```
JavaScript
```javascript
AJAX.Add("data/001.txt", "001");
AJAX.Add("data/002.txt", "002");
AJAX.Add("data/003.txt", "003");
AJAX.Load(function(){
	AJAX.Write("output-001", AJAX.Find("001").data);
	AJAX.Write("output-002", AJAX.Find("002").data);
	AJAX.Write("output-003", AJAX.Find("003").data);
});
```
