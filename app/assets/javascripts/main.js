$(function () {
  var large_break = 1200;

  $('.index .index_table').cardtable();
  /******************************************************************
  // wrapper for filter input fields
  /******************************************************************/
  $('.filter_form_field').wrapAll('<div class="filter_fields" />');

  /******************************************************************
  // wrapper for ui-dialogue
  /******************************************************************/
  $('.batch_action').click(function() {
    $('.ui-dialog').wrap('<div class="dialog_wrapper" />');
    $(".ui-dialog-titlebar button").text('');

    $(".ui-dialog").find(".ui-button").click(function () {
      $('.dialog_wrapper').remove();
      $('#dialog_confirm').remove();
    });
  });

  /******************************************************************
  // Hide batch actions when not needed
  /******************************************************************/
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

  /******************************************************************
  // Add hamburger to header
  /******************************************************************/
  $('#header').prepend('<div id="hamburger" class="open" />');

  /******************************************************************
  // Minimise and grow sidebar
  /******************************************************************/

  $('#hamburger').click(function () {
    if($('#hamburger').hasClass('open')) {
      closeHamburger();
    } else {
      openHamburger();
    }
  });

  if($(".logged_in.admin_dashboard").length === 0) {
    windowSizeChecker();
  }

  $(window).bind('resize', function(e) {
    windowSizeChecker();
  });

  function closeHamburger() {
    $('#wrapper').addClass('minimise_header');
    $('#hamburger').removeClass('open');
    $('#hamburger').addClass('closed');
    $('.tabs').hide();
    $('#site_title').hide();
  }

  function openHamburger() {
    $('#wrapper').removeClass('minimise_header');
    $('#hamburger').removeClass('closed');
    $('#hamburger').addClass('open');
    $('.tabs').show();
    $('#site_title').show();
  }

  function windowSizeChecker() {
    if($( window ).width() > large_break) {
      openHamburger();
    } else {
      closeHamburger();
    }
  }

  /******************************************************************
  // Hide flash messages after certain time
  /******************************************************************/
  if($(".logged_in .flashes .flash").length) {
    setTimeout(function() {
      document.getElementsByClassName('flash')[0].className += " hide";
    }, 2500);
    setTimeout(function() {
      document.getElementsByClassName('flash')[0].remove();
    }, 3000);
  }

  /******************************************************************
  // Tables
  /******************************************************************/
  if($( window ).width() <= large_break) {
    $('.logged_in .index_as_table tbody tr .col-actions').prev().hide();
  }
  $(window).bind('resize', function(e) {
    if($( window ).width() <= large_break) {
      $('.logged_in .index_as_table tbody tr .col-actions').prev().hide();
    } else {
      $('.logged_in .index_as_table tbody tr .col-actions').prev().show();
    }
  });
});
