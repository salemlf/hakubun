# -*- encoding: utf-8 -*-
# stub: security 0.1.3 ruby lib

Gem::Specification.new do |s|
  s.name = "security".freeze
  s.version = "0.1.3".freeze

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Mattt Thompson".freeze]
  s.date = "2014-08-05"
  s.description = "Library for interacting with the Mac OS X Keychain".freeze
  s.email = "m@mattt.me".freeze
  s.homepage = "http://mattt.me".freeze
  s.rubygems_version = "3.5.3".freeze
  s.summary = "Security".freeze

  s.installed_by_version = "3.5.3".freeze if s.respond_to? :installed_by_version

  s.specification_version = 4

  s.add_development_dependency(%q<rspec>.freeze, ["~> 0.6.1".freeze])
  s.add_development_dependency(%q<rake>.freeze, ["~> 0.9.2".freeze])
end
