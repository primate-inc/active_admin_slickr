# ActiveAdminSlickr

Welcome to your new gem! In this directory, you'll find the files you need to be able to package up your Ruby library into a gem. Put your Ruby code in the file `lib/active_admin_slickr`. To experiment with that code, run `bin/console` for an interactive prompt.

TODO: Delete this and the text above, and describe your gem

## Installation

Add this line to your application's Gemfile:

```ruby
gem 'active_admin_slickr'
```

And then execute:

```bash
bundle
```

Or install it yourself as:

```bash
gem install active_admin_slickr
```

## Stylesheets

Firstly, please comment out the default Active Admin stylesheets.

```css
// Active Admin's got SASS!
// @import "active_admin/mixins";
// @import "active_admin/base";
```

Then add the following in `active_admin.scss`:

```css
@import 'active_admin_slickr';
```

## Javascript
- In the `active_admin.js` file, you require `active_admin_slickr`.

```javascript
//= require active_admin/base

//= require active_admin_slickr
```

## Additions to Active Admin

### Time picker

The new style can be used within a form like so:

```ruby
f.input :time, as: :time_picker, wrapper_html: { class: 'clockpicker', 'data-autoclose': 'true' }
```

### Checkbox

New styling for checkbox and be use within a form like so:

```ruby
input :published,
      wrapper_html: { class: 'true_false'}
```

### Multi select

This is useful when you need to create an interface whereby a user wants to add an array of books to an author for example. You could add this migration:

```ruby
def change
  add_column :authors, :book_ids, :text, array: true, default: []
end
```

and in the Active Admin you would add the following to the Author form

```ruby
input :book_ids,
      as: :select,
      collection: Book.all.map{ |book| [book.name, book.id] },
      input_html: { multiple: true, class: 'chosen-select', 'data-placeholder': 'Select options...' }
```

ensuring that you keep the class ```chosen-select```.

Additionally, you can add the class ```chosen-select chosen-select-ordered``` and your input will save in order which items are selected. By default, a multiselect will save in the order of the options within the multi-select. 

With this in place you now have a ready to use multi select that will save an array of book ids.

Note that if you use an interface like this, you need to handle the case where a book is removed from the database. To handle this you could do the following in the Book model:

```ruby
before_destroy :delete_associated_book_ids

private

def delete_associated_book_ids
  # type casting the book_ids to an integer array
  # remove the id everywhere it appears in the book_ids column in authors
  sql = "UPDATE authors SET book_ids = array_remove(book_ids::int[], #{id})"
  ActiveRecord::Base.connection.execute(sql)
end
```

## Development

### Webpack

```bash
yarn watch
```

or within Docker container
```bash
docker-compose run app yarn watch
```

Stylesheets in `stylesheets/files_to_edit` will be watched and compiled by webpack
into `webpack_output`. Only make edits to the files in `files_to_edit` and webpack
will automatically output to `webpack_output` after using the PostCSS loader.

### Install

After checking out the repo, run `bin/setup` to install dependencies. You can also run `bin/console` for an interactive prompt that will allow you to experiment.

To install this gem onto your local machine, run `bundle exec rake install`. To release a new version, update the version number in `version.rb`, and then run `bundle exec rake release`, which will create a git tag for the version, push git commits and tags, and push the `.gem` file to [rubygems.org](https://rubygems.org).

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/[USERNAME]/active_admin_slickr.


## License

The gem is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
