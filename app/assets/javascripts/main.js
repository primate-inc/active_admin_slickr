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
  $('#header').prepend('<div id="open_close" class="open" />');

  /******************************************************************
  // Minimise and grow sidebar
  /******************************************************************/

  $('#open_close').click(function () {
    if($('#open_close').hasClass('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  if($(".logged_in.admin_dashboard").length === 0) {
    windowSizeChecker();
  }

  $(window).bind('resize', function(e) {
    windowSizeChecker();
  });

  function closeMenu() {
    $('#wrapper').addClass('minimise_header');
    $('#open_close').removeClass('open');
    $('#open_close').addClass('closed');
    $('#tabs').hide();
    $('#site_title').hide();
    $('#utility_nav').hide();
  }

  function openMenu() {
    $('#wrapper').removeClass('minimise_header');
    $('#open_close').removeClass('closed');
    $('#open_close').addClass('open');
    $('#tabs').show();
    $('#site_title').show();
    $('#utility_nav').show();
  }

  function windowSizeChecker() {
    if($( window ).width() > large_break) {
      openMenu();
    } else {
      closeMenu();
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
  // Hide select checkboxes on smaller tables
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

  /******************************************************************
  // Make all filters the same width as the max
  /******************************************************************/
  var filterMaxWidth = 0;
  $('.filter_fields .filter_form_field').each(function() {
    var itemWidth = $(this)[0].offsetWidth;
    filterMaxWidth = Math.max(filterMaxWidth, itemWidth)
  });
  $('.filter_fields .filter_form_field').css('width', filterMaxWidth);

  /******************************************************************
  // Align inputs if filters are all stacked
  /******************************************************************/
  var filterStacked = true
  var offSetLeft
  var labelMaxWidth = 0

  areFiltersStacked();
  filterSpacing();

  $(window).bind('resize', function(e) {
    filterStacked = true
    var labelMaxWidth = 0

    areFiltersStacked();
    filterSpacing();
  });

  function areFiltersStacked() {
    $('.filter_fields .filter_form_field label').each(function(index) {
      var itemWidth = $(this)[0].offsetWidth;
      labelMaxWidth = Math.max(labelMaxWidth, itemWidth);

      if(index === 0) {
        offSetLeft = $(this)[0].offsetLeft;
      } else {
        if($(this)[0].offsetLeft !== offSetLeft) {
          filterStacked = false;
        }
      }
    });
  }

  function filterSpacing() {
    var labelWidth
    $('.filter_fields .filter_form_field label').each(function() {
      if(filterStacked) {
        labelWidth = $(this)[0].offsetWidth;
        $(this)[0].style.marginRight = (labelMaxWidth - labelWidth + 50) + 'px';
      } else {
        $(this)[0].style.marginRight = '1em';
      }
    });
  }
});
