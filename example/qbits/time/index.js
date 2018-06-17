
(function ($) {
  var defaults = { timeZone: null };

  // Qbit constructor
  var Qbit = function (element, jqbit) {
    var settings = this.settings = $.extend({}, defaults, jqbit.args);

    jqbit.loadHTML(function () {
      showTime($(element).find('.time')[0], settings);
    });
  }

  // Qbit methods
  $.extend(Qbit.prototype, {
    setTimeZone: function (tz) {
      this.settings.timeZone = tz;
    }
  });

  function showTime(element, settings) {
    var tzOption = settings.timeZone ? { timeZone: settings.timeZone } : {};
    $(element).html(new Date().toLocaleString("en-US", tzOption));
    setTimeout(function () { showTime(element, settings); }, 1000);
  }

  // add Qbit function to qbit
  $.fn.qbit.addQbitToList('time', Qbit);
})(jQuery);
