/*
* Copyright (C) 2018 Bryan Nielsen - All Rights Reserved
*
* Author: Bryan Nielsen <bnielsen1965@gmail.com>
*
*
* This file is part of the qbit jQuery plugin.
* qbit is free software: you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.
*
* qbit is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU General Public License for more details.
*
* You should have received a copy of the GNU General Public License
* along with this application.  If not, see <http://www.gnu.org/licenses/>.
*/
;
(function ($, window, document, undefined) {
  "use strict";


  // Create the defaults once
  var pluginName = "qbit";
  var defaults = {
    path: 'qbits/'
  };

  var qbits = {};
  var queue = [];
  var queueRunning = false;

  // The plugin constructor
  function Plugin(element, options, comArgs) {
    options = options || {};
    if (typeof options === 'string' || options instanceof String) {
      options = { qbit: options };
    }
    this.element = element;
    this.settings = $.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;
    this.args = comArgs; // qbit arguments
    this.init();
    this.queueQbit(this.settings.qbit, this.element);
    if (this.settings.qbit && !qbits[this.settings.qbit]) {
      this.loadQbit(this.settings.qbit);
    }
  }

  // Avoid Plugin.prototype conflicts
  $.extend(Plugin.prototype, {
    // Initialize this instance of the plugin.
    init: function () {
      // keep a reference to self
      this.instance = this;
    },

    getQbitPath: function () {
      return this.settings.path;
    },

    // load qbit file into plugin
    loadQbit: function (name) {
      this.qbitName = name;
      if (qbits[name] === false) {
        return;
      }
      qbits[name] = false; // prevent additional loads
      $.getScript(this.getQbitPath().replace(/\/$/, '') + '/' + name + '/index.js', function() {
  			// load complete
  		})
  		.fail(function (jqxhr, settings, exception) {
  			console.log('Error loading qbit ' + name + ', ' + exception);
  		});
    },

    // queue a qbit for execution
    queueQbit: function (name, element) {
      queue.push({ name: name, element: element });
      this.startQueue();
    },

    // start queue processing qbits
    startQueue: function () {
      if (queueRunning) {
        return;
      }
      this.runQueue();
    },

    // process the queue qbits
    runQueue: function () {
      var _this = this;
      queueRunning = true;
      var doneList = [];
      // process each queued qbit
      queue.forEach(function (c, i) {
        // check to see if qbit is loaded
        if (qbits[c.name]) {
          // qbit ready to run
          doneList.push(i);
          // if qbit is not attached to element
          if (!$.data(c.element, "qbit_" + c.name)) {
            var _qbit = $.data(c.element, "plugin_" + pluginName);
            // add qbit to element and call constructor with element and element's qbit instance
            $.data(c.element, "qbit_" + c.name, new qbits[c.name](c.element, _qbit));
          }
        }
      });
      // filter out queued qbits that are done
      queue = queue.filter(function (c, i) {
        return -1 === doneList.indexOf(i);
      });
      if (queue.length) {
        // continue if qbits waiting in queue
        setTimeout(function () { _this.runQueue(); }, 50);
      }
      else {
        queueRunning = false;
      }
    },

    loadHTML: function (callback) {
      $(this.element).load(this.getQbitPath().replace(/\/$/, '') + '/' + this.qbitName + '/index.html' , function() {
        if (callback) {
          callback();
        }
      });
    }
  });

  // A really lightweight plugin wrapper around the constructor,
  // preventing against multiple instantiations
  function PluginWrapper(options, comArgs) {
    return this.each(function () {
      if (!$.data(this, "plugin_" + pluginName)) {
        $.data(this, "plugin_" + pluginName, new Plugin(this, options, comArgs));
      }
    });
  }

  // extend wrapper methods
  $.extend(PluginWrapper, {
    // method called by compnents after they load to add them to plugin's list of qbits
    addQbitToList: function (name, qbit) {
      if (qbits[name]) {
        console.warn('Qbit "' + name + '" already loaded, overwrite prevented.');
        return;
      }
      else {
        qbits[name] = qbit;
      }
    },

    getElementQbit: function(element, qbit) {
      return $.data(element, 'qbit_' + qbit);
    }

  });

  $.fn[pluginName] = PluginWrapper;

})(jQuery, window, document);
