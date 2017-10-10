# ActiveAdminSlickr

Welcome to your new gem! In this directory, you'll find the files you need to be able to package up your Ruby library into a gem. Put your Ruby code in the file `lib/active_admin_slickr`. To experiment with that code, run `bin/console` for an interactive prompt.

TODO: Delete this and the text above, and describe your gem

## Installation

Add this line to your application's Gemfile:

```ruby
gem 'active_admin_slickr'
```

And then execute:

    $ bundle

Or install it yourself as:

    $ gem install active_admin_slickr

## Usage

- In the `active_admin.scss` file, you include `active_admin_slickr`. **Note: You have to comment the active admin stylesheets.**

```css
// Active Admin's got SASS!
// @import "active_admin/mixins";
// @import "active_admin/base";

// Active Bootstrap
@import 'active_admin_slickr';
```

- In the `active_admin.js` file, you require `active_admin_slickr`.

```javascript
//= require active_admin/base

//= require active_admin_slickr
```

## Generator
rails g active_admin_slickr:install

## Development

After checking out the repo, run `bin/setup` to install dependencies. You can also run `bin/console` for an interactive prompt that will allow you to experiment.

To install this gem onto your local machine, run `bundle exec rake install`. To release a new version, update the version number in `version.rb`, and then run `bundle exec rake release`, which will create a git tag for the version, push git commits and tags, and push the `.gem` file to [rubygems.org](https://rubygems.org).

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/[USERNAME]/active_admin_slickr.


## License

The gem is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
