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

### Option 1

If you wish to be able to extend the stylesheets from the active_admin_slickr gem,
add the following in `active_admin.scss`:

```css
@import 'active_admin_slickr_sass';
```

### Option 2

If you will not be making any extensions to the active_admin_slickr gem, add the

following in `active_admin.scss`:

```css
@import 'active_admin_slickr_postcss';
```

## Javascript
- In the `active_admin.js` file, you require `active_admin_slickr`.

```javascript
//= require active_admin/base

//= require active_admin_slickr
```

## Development

### Webpack

```bash
npm run watch
```

Stylesheets will be watched and compiled by webpack with each change.

### Install

After checking out the repo, run `bin/setup` to install dependencies. You can also run `bin/console` for an interactive prompt that will allow you to experiment.

To install this gem onto your local machine, run `bundle exec rake install`. To release a new version, update the version number in `version.rb`, and then run `bundle exec rake release`, which will create a git tag for the version, push git commits and tags, and push the `.gem` file to [rubygems.org](https://rubygems.org).

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/[USERNAME]/active_admin_slickr.


## License

The gem is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
