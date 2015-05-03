# theme-switch

Switch theme(ui and syntax) quickly.

![gif](https://raw.githubusercontent.com/t9md/t9md/2391f495870160c16ee560e0ee5dc913f0df74d4/img/atom-theme-switch.gif)

# Configuration

Configure profile set directly in your `config.cson` or via setting UI.  
Each profile is space sepalated pair of ui-theme and syntax-theme.

e.g.
```coffeescript
"*":
  "theme-switch":
    profiles: [
      "atom-dark-ui spacegray-dark-syntax"
      "atom-dark-ui atom-dark-syntax"
      "atom-light-ui atom-light-syntax"
    ]
```

# How to use

From command palette, invoke
* `Theme Swtich: Next`
* `Theme Swtich: Prev`
