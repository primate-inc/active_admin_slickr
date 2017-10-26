$(function () {
  $('#index_table_admin_users').stacktable();

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

  // Hide batch actions when not needed
  $('.batch_actions_selector').hide();
  $('.resource_selection_cell input[type="checkbox"]').change(function() {
    if ($(".resource_selection_cell input:checkbox:checked").length) {
      $('.batch_actions_selector').show(100);
    } else {
      $('.batch_actions_selector').hide(100);
    }
  });
  $('.resource_selection_toggle_cell input[type="checkbox"]').change(function() {
    if ($(".resource_selection_toggle_cell input:checkbox:checked").length) {
      $('.batch_actions_selector').show(100);
    } else {
      $('.batch_actions_selector').hide(100);
    }
  });

 // Add hamburger to header
  $('#header').prepend('<div id="hamburger" class="open" />');

  // Minimise and grow sidebar
  $('#hamburger').click(function () {
    if($('#hamburger').hasClass('open')) {
      $('#wrapper').addClass('minimise_header');
      $('#hamburger').removeClass('open');
      $('#hamburger').addClass('closed');
      $('.tabs').hide();
      $('#site_title').hide();
    } else {
      $('#wrapper').removeClass('minimise_header');
      $('#hamburger').removeClass('closed');
      $('#hamburger').addClass('open');
      $('.tabs').show();
      $('#site_title').show();
    }
  });
});
