module.exports = {
  activate () {
    this.disposable = atom.commands.add('atom-workspace', {
      'theme-switch:next': () => this.switchTheme('next', 'profiles'),
      'theme-switch:prev': () => this.switchTheme('prev', 'profiles'),
      'theme-switch:next-dark': () => this.switchTheme('next', 'darkProfiles'),
      'theme-switch:prev-dark': () => this.switchTheme('prev', 'darkProfiles'),
      'theme-switch:next-light': () => this.switchTheme('next', 'lightProfiles'),
      'theme-switch:prev-light': () => this.switchTheme('prev', 'lightProfiles'),
      'theme-switch:clip-current-theme': () => atom.clipboard.write(this.getCurrentTheme()),
      'theme-switch:add-to-profiles': () => this.addToProfile('profiles'),
      'theme-switch:add-to-dark-profiles': () => this.addToProfile('darkProfiles'),
      'theme-switch:add-to-light-profiles': () => this.addToProfile('lightProfiles')
    })
    this.lastTheme = this.getCurrentTheme()
  },

  deactivate () {
    this.disposable.dispose()
  },

  addToProfile (profileName) {
    const currentTheme = this.getCurrentTheme()
    const currentConfig = getConfig(profileName)
    const normalizedProfile = currentConfig.map(compactSpaces)
    if (normalizedProfile.indexOf(currentTheme) === -1) {
      setConfig(profileName, currentConfig.concat(currentTheme))
    }
  },

  getCurrentTheme () {
    return atom.config.get('core.themes').join(' ')
  },

  switchTheme (direction, profileName) {
    const profiles = getConfig(profileName).map(compactSpaces)
    let index = profiles.indexOf(this.lastTheme)

    // determine next/prev index
    if (index >= 0) {
      if (direction === 'next') {
        index++
        if (index >= profiles.length) index = 0
      } else {
        index--
        if (index < 0) index = profiles.length - 1
      }
    } else {
      index = 0
    }

    atom.config.set('core.themes', profiles[index].split(' '))
    this.lastTheme = profiles[index]
    if (getConfig('logToConsole')) {
      console.info('theme-switch:', this.lastTheme)
    }
  },
}

module.exports.config = {
  profiles: {
    order: 1,
    description: "list of 'ui and syntax pair' used for `theme-switch:next`, `theme-switch:prev`",
    type: "array",
    items: {
      type: "string"
    },
    default: [
      "atom-dark-ui atom-dark-syntax",
      "one-dark-ui one-dark-syntax",
      "atom-light-ui atom-light-syntax",
      "one-light-ui one-light-syntax"
    ]
  },
  darkProfiles: {
    order: 2,
    description: "used for `theme-switch:next-dark`, `theme-switch:prev-dark`",
    type: "array",
    items: {
      "type": "string"
    },
    default: [
      "atom-dark-ui atom-dark-syntax",
      "one-dark-ui one-dark-syntax"
    ]
  },
  lightProfiles: {
    order: 3,
    description: "used for `theme-switch:next-light`, `theme-switch:prev-light`",
    type: "array",
    items: {
      "type": "string"
    },
    default: [
      "atom-light-ui atom-light-syntax",
      "one-light-ui one-light-syntax"
    ]
  },
  logToConsole: {
    order: 4,
    type: "boolean",
    default: false
  },
}

function getConfig (param) {
  return atom.config.get(`theme-switch.${param}`)
}

function setConfig (param, value) {
  return atom.config.set(`theme-switch.${param}`, value)
}

function compactSpaces (text) {
  return text.replace(/ +/g, ' ')
}
