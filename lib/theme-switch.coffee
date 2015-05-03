{CompositeDisposable} = require 'atom'

module.exports = ThemeSwitch =
  subscriptions: null
  config:
    profiles:
      type: 'array'

  activate: (state) ->
    @subscriptions = new CompositeDisposable
    @subscriptions.add atom.commands.add 'atom-workspace', 'theme-switch:next': => @next()
    @subscriptions.add atom.commands.add 'atom-workspace', 'theme-switch:prev': => @prev()

  deactivate: ->
    @subscriptions.dispose()

  profileFor: (direction) ->
    profiles = atom.config.get "theme-switch.profiles"
    current  = atom.config.get "core.themes"

    i = _i for theme, _i in profiles when "#{theme}" is "#{current}"
    return profiles[0] unless i?

    i =
      if direction is 'next'
        (i + 1) % profiles.length
      else
        if i == 0 then profiles.length - 1 else i - 1

    profiles[i]

  next: ->
    atom.config.set "core.themes", @profileFor("next")

  prev: ->
    atom.config.set "core.themes", @profileFor("prev")
