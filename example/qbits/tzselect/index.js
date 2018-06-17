
(function ($) {
  var defaults = {};

  // Qbit constructor
  var Qbit = function (element, jqbit) {
    var settings = this.settings = $.extend({}, (jqbit.args || defaults));

    jqbit.loadHTML(function () {
      var $element = $(element);
      if (settings.select) {
        $element.find('.tzselect').val(settings.select);
      }
      if (settings.timeElement) {
        $element.find('.tzselect').change(function (e) {
          // get the time qbit and set timezone
          var c = $.fn.qbit.getElementQbit(settings.timeElement, 'time');
          c.setTimeZone($(this).val());
        });
      }
    });
  }

  // add qbit function to qbit
  $.fn.qbit.addQbitToList('tzselect', Qbit);
})(jQuery);
