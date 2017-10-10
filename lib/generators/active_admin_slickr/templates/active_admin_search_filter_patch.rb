module ActiveAdmin
  module Filters
    module ViewHelper
      # Helper method to render a filter form
      def active_admin_filters_form_for(search, filters, options = {})
        defaults = { builder: ActiveAdmin::Filters::FormBuilder,
                     url: collection_path,
                     html: {class: 'filter_form'} }
        required = { html: {method: :get},
                     as: :q }
        options  = defaults.deep_merge(options).deep_merge(required)

        form_for search, options do |f|
          fields = content_tag :div, class: 'filter_fields' do
            filters.each do |attribute, opts|
              next if opts.key?(:if)     && !call_method_or_proc_on(self, opts[:if])
              next if opts.key?(:unless) &&  call_method_or_proc_on(self, opts[:unless])
              opts[:input_html] = instance_exec(&opts[:input_html]) if opts[:input_html].is_a?(Proc)
              f.filter attribute, opts.except(:if, :unless)
            end
          end

          buttons = content_tag :div, class: "buttons" do
            f.submit(I18n.t('active_admin.filters.buttons.filter')) +
              link_to(I18n.t('active_admin.filters.buttons.clear'), '#', class: 'clear_filters_btn') +
                      hidden_field_tags_for(params, except: except_hidden_fields)
          end

          f.template.concat fields
          f.template.concat buttons
        end
      end

      private

      def except_hidden_fields
        [:q, :page]
      end
    end
  end
end
