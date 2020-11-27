$(function () {

  var large_break = 1200;

  // Apply clockpicker styles
  $('.clockpicker').clockpicker();

  // Apply index cards layout
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
    $('#wrapper, #custom-wrapper').addClass('minimise_header');
    $('#open_close').removeClass('open');
    $('#open_close').addClass('closed');
    $('#tabs').hide();
    $('#site_title').hide();
    $('#utility_nav').hide();
  }

  function openMenu() {
    $('#wrapper, #custom-wrapper').removeClass('minimise_header');
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
  // Open nested sidebar items on click
  /******************************************************************/

  $('.menu_item.has_nested > a').click(function (e) {
    e.preventDefault();
    $(e.target).parent('li').toggleClass('active');  
  });

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
    var itemWidth = $(this).first().outerWidth(true);
    filterMaxWidth = Math.max(filterMaxWidth, itemWidth)
  });
  $('.filter_fields .filter_form_field').css('width', filterMaxWidth);

  /******************************************************************
  // Align inputs if filters are all stacked
  /******************************************************************/
  var filtersStacked = true
  var offSetLeft
  var labelMaxWidth = 0

  areFiltersStacked();
  filterSpacing();
  dateRangeWidth();

  $(window).bind('resize', function(e) {
    filtersStacked = true
    var labelMaxWidth = 0

    areFiltersStacked();
    filterSpacing();
    dateRangeWidth();
  });

  // True if filters in single column
  function areFiltersStacked() {
    $('.filter_fields .filter_form_field label').each(function(index) {
      var itemWidth = $(this).first().outerWidth(true);
      labelMaxWidth = Math.max(labelMaxWidth, itemWidth);

      if(index === 0) {
        offSetLeft = $(this)[0].offsetLeft;
      } else {
        if($(this)[0].offsetLeft !== offSetLeft) {
          filtersStacked = false;
        }
      }
    });
  }

  function filterSpacing() {
    var labelWidth
    $('.filter_fields .filter_form_field label').each(function() {
      if(filtersStacked) {
        labelWidth = $(this).first().outerWidth(true);
        $(this)[0].style.marginRight = (labelMaxWidth - labelWidth + 50) + 'px';
      } else {
        $(this)[0].style.marginRight = '1em';
      }
    });
  }

  function dateRangeWidth() {
    setTimeout(function(){
      $('.filter_fields .filter_form_field.date_range').each(function() {
        var firstDatepickerWidth = $(this).children('input.datepicker').first().innerWidth();
        $(this).children('input.datepicker').eq(1).css('max-width', (firstDatepickerWidth + 2) + 'px');
      });
    },50);
  }

  /******************************************************************
  // Checkboxes
  /******************************************************************/
  var checkboxes = $('.checkboxes .choices-group');

  // highlight boxes that are checked.
  checkboxes.each(function(i) {
    $(this).find('input').each(function(index) {
      if ($(this).is(':checked')) {
        $(this).parents().parents().addClass('checked')
      } else {
        $(this).parents().parents().removeClass('checked')
      }
    });
  });

  // Highlight boxes that are checked on click.
  $('.checkboxes').on('change', '.choice  input', function(e) {
    var box = e.target.closest('.choice');

    if($(this).is(":checked")) {
      box.className = 'choice checked';
    } else {
      box.className = 'choice';
    }
  });

  /******************************************************************
  // Booleans
  /******************************************************************/
  // highlight boolean check boxes that are checked.
  $('.true_false label, .has_many_delete label').each(function(i) {
    $(this).find('input').each(function(index) {
      if ($(this).is(':checked')) {
        $(this).parents().parents().addClass('checked')
      } else {
        $(this).parents().parents().removeClass('checked')
      }
    });
  });

  // Highlight boolean check boxes that are checked on click.
  $('.true_false, .has_many_delete').on('change', 'label  input', function(e) {
    var box;
    box = e.target.closest('.true_false');
    if(box === null) {
      box = e.target.closest('.has_many_delete');
    }

    if($(this).is(':checked')) {
      box.classList.add('checked');
    } else {
      box.classList.remove('checked');
    }
  });

  /******************************************************************
  // Chosen Select
  /******************************************************************/
  $('.chosen-select').chosen({
    allow_single_deselect: true,
    no_results_text: 'No results matched',
    width: '100%'
  })

  $('.chosen-select').change(function(e) {
    e.preventDefault();
    return false
  });  

  /******************************************************************
  // Chosen Select -- Ordered
  /******************************************************************/
  
  // Multiselect doesn't account for selection order, just the collection order.
  // Using chosen-order plugin, we fake the order in the UI from a data attribute.
  $('.chosen-select.chosen-select-ordered').each(function(i, el) {
    data = $(this).attr('data').split(' ')
    $(this).setSelectionOrder(data)
  })

  // On submit, we disable the multiselect input
  // and render a series of inputs in the order that we want. 
  $('.formtastic:has(".chosen-select.chosen-select-ordered")').one('submit', function(event) {
    event.preventDefault();
    $form = $(this)
    $('.chosen-select.chosen-select-ordered').each(function(i, el) {
      $multiselect = $(this)
      $multiselect.attr('disabled', 'disabled');
      $.each($multiselect.getSelectionOrder(), function(i, value) {
        $input = $('<input>').attr('type', 'hidden')
                             .attr('name', $multiselect.attr('name'))
                             .attr('value', value)
        $form.append($input)
      })
    })
    $(this).submit();
  })

  /******************************************************************
  // Form Tabs
  /******************************************************************/

  //Highlight the first tab with contents that have an error
  if($('.logged_in.create .tabs, .logged_in.update .tabs').length) {
    var errorIndex = [];
    $('.tab-content').children().each(function(index) {
      if(($(this).find('.error').length !== 0)) {
        errorIndex.push(index)
      }
    })
    if(errorIndex !== []) {
      $('.nav.nav-tabs .ui-tabs-tab').each(function(index) {
        if(index === errorIndex[0]) {
          $(this).find('a').trigger('click')
        }
        if($.inArray(index, errorIndex) !== -1) {
          $(this).addClass('ui-tabs-error')
        }
      })
    }
  }

  /******************************************************************
  // Reorderable relation
  /******************************************************************/

  $("input[class*='_lookup_field']").each(function(index,input) {
    var container = $(input).parent()
    var data = $(container).data('collection_data')
    var setup = $(container).data('setup')
    var listContainer = $(container).children("div[id*='_target_list']").first()
    var list = $("ul", $(listContainer)).first()
    var submitable_list = $(".lookup_submitable_area",$(container)).first()
    $(list).sortable({
      handle: ".reorder-handle",
    })
    $(input).autocomplete({
      lookup: data,
      maxHeight: 200,
      onSelect: function (suggestion) {
        var item = $("<li class='reorderable_relation_container-list-item'><span class='reorder-handle'>=</span><span class='reorderable_relation_container-list-item-title'>"+suggestion.value+"</span><span class='reorderable_relation_container-list-item-remove'>x</span></li>")
        var item_input = $("<input name='"+ setup.field_name +"' type='hidden' value='"+ suggestion.data +"'/>")
        item.append(item_input)
        list.append(item)
        $(input).val("")
      }
    });
  })
  $(".reorderable_relation_container-list").on("click",".reorderable_relation_container-list-item-remove", function(e) {
    if(confirm("Are you sure?")) {
      var target = e.target
      $(target).parent().remove()                                                                                                                          }
  })

});
