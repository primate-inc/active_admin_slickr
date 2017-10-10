require 'rails/generators/active_record'

module ActiveAdminSlickr
  module Generators
    class InstallGenerator < ActiveRecord::Generators::Base
      source_root File.expand_path("../templates", __FILE__)
      desc "Creates ActiveAdminSlickr initializer files for Active Admin"
      argument :name, type: :string, default: "application"

      def search_filter_patch
        template "active_admin_search_filter_patch.rb", "config/initializers/active_admin_search_filter_patch.rb"

        puts "Slickr install complete!"
      end
    end
  end
end
