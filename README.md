# Qbit

A jQuery plugin that provides dynamic loading of Javascript and HTML bits into
a web page. It is intended as a simple component loader for jQuery based applications.

Each Qbit compnent that is developed can be easily reused throughout an application
or provided as a package to be downloaded and used in other applicatons.

Each Qbit consists of a bit of Javascript and may include a bit of HTML. The default
path for the Qbits is in a directory named 'qbits' in the hosted web application's
directory. And each Qbit will have a sub-directory named after the Qbit.
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

Copy the qbit.js plugin source file to your HTML application directory.

Include script tags in your HTML to load the jQuery and Qbit libraries.

I.E.
```html
<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
<script src="js/qbit.js"></script>
```

Create the qbits directory in your hosted directory and copy the Qbits you plan on
using into the qbits directory.


## Usage

After the install is complete you then edit your web page and call the qbit plugin
on selected elements with the name of the Qbit to load into the selected elements.

I.E. Here we load the example Qbit into every element with the class name 'example'...
```html
<div class="example"></div> <span class="example"></span>

<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
<script src="js/qbit.js"></script>
<script>
$(document).ready(function () {
  // load the example qbit into elements with the example class name
  $('.example').qbit('example');
});
</script>
```

A Qbit may accept additional parameters and/or arguments. See the documentation for
the Qbit to get details on how to use the Qbit. The folllowing example loads the time
Qbit into an element and passes a timezone argument...

```HTML
<div id="current_time"></div>

<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
<script src="js/qbit.js"></script>
<script>
$(document).ready(function () {
  // load the example qbit into elements with the example class name
  $('#current_time').qbit('time', { timeZone: "America/New_York" });
});
</script>
```


## Developing Qbits

New Qbits can be created by creating a new sub-directory in the qbits path and naming
the directory after the new Qbit. Then create the index.js and index.html files for
the new Qbit in the directory.

The example Qbit is a good starting point to see how the index.js is developed. The
example Qbit is the simplest type of Qbit and only loads the contents of the index.html
into the selected elements...

```javascript
// example Qbit
(function ($) {
  var defaults = {};

  // Qbit constructor
  var Qbit = function (element, jqbit) {
    // build settings from defaults and arguments passed to the jQuery qbit
    var settings = this.settings = $.extend({}, defaults, jqbit.args);

    // use jQuery qbit to load the Qbit HTML
    jqbit.loadHTML(function () {
      // actions to take after Qbit HTML is loaded
    });
  }

  // Qbit methods
  $.extend(Qbit.prototype, {
    // additional methods attached to new instances of this Qbit
  });

  // add Qbit qbit plugin list
  $.fn.qbit.addQbitToList('example', Qbit);
})(jQuery);
```

When the web page requests this Qbit the jQuery plugin will load the index.js if
it has not yet been loaded, it then creates a new instance of the Qbit method from
the index.js for each element, and then calls the Qbit constructor on each element
while passing the element and a reference to the jQuery qbit plugin instance that
is creating the Qbit.

In this example Qbit the constructor creates a settings object from the components
defaults and any arguments passed by the jQuery qbit plugin. The constructor then
uses the loadHTML() method from the jQuery qbit plugin to load the index.html that
is associated with the example Qbit.

Each Qbit must include the Qbit constructor function and must call the $.fn.qbit.addQbitToList()
method at the end of loading the index.js file to inform the jQuery qbit plugin that
the Qbit is loaded and ready for use.
