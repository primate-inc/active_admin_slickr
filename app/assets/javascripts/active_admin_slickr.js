$(document).ready(function() {
  // wrapper for filter input fields
  $('.filter_form_field').wrapAll('<div class="filter_fields" />');

  // wrapper for ui-dialogue
  $('.batch_action').click(function() {
    $('.ui-dialog').wrap('<div class="dialog_wrapper" />');
    $(".ui-dialog-titlebar button").text('');

    $(".ui-dialog").find(".ui-button").click(function () {
      $('.dialog_wrapper').remove();
      $('#dialog_confirm').remove();
    });
  });
});
