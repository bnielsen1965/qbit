# Qbit

A jQuery plugin that provides dynamic loading of Javascript and HTML bits into
a web page. It is intended as a simple component loader for jQuery based applications.

Each Qbit consists of a bit of Javascript that may include a bit of HTML.
The Javascript and HTML files reside in a sub-directory named after the Qbit.
I.E. a time and tzselect Qbit may have the following directory structure...
```
public_html/
+-- qbits/
    +-- time/
        +-- index.js
        +-- index.html
    +-- tzselect/
        +-- index.js
        +-- index.html
```


## Requirements

- jQuery


## Install

Download the Qbit project.

Copy the qbit.js plugin source file to your HTML application directory and include
a script tags in your HTML to load the jQuery and Qbit libraries.

I.E.
```html
<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
<script src="js/qbit.js"></script>
```


## Usage

Call the qbit plugin on selected elements with the name of the Qbit to load into
the selected elements.

```html
<script>
$(document).ready(function () {
  // load the example qbit into elements with the example class name
  $('.example').qbit('example');
});
</script>
```

A Qbit may accept additional parameters and/or arguments. See the documentation for
the Qbit to get details on how to use the Qbit.
