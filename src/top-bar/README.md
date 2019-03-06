# uwds-top-bar

This doc is a WIP

## Using the top-bar

1. Here we will describe the process for including the required js/mjs file in an adopter's project/website. We have used npm and unpkg in the past, but folks have expressed interest in self-hosting and creating our own CDN. It would also be valuable to link from here directly to the pertinent component page on the design system site.

2. Use the custom element:

```html
<uwds-top-bar 
  theme-name="My" 
  app-name="Fancy App" 
  app-url="/my/home/path">
</uwds-top-bar>
```

### Attributes

- app-url: Sets the url to link to when a user clicks the app title
- app-name: Sets the app name text
- theme-name: Sets the theme name text (useful if the app is part of a broader collection of apps, like MyUW)

### Slots

- uwds-navigation: Slot for a hamburger button to toggle side navigation
- uwds-help: Slot for the help & feedback button
- uwds-notifications: Slot for the notifications bell
- uwds-profile: Slot for the profile button/menu component

### CSS-vars

- uwds-top-bar-bg: Sets background color 
- uwds-top-bar-color: Sets text color for top-bar elements
- uwds-top-bar-font: Sets font face of the app-name
- uwds-top-bar-font-weight: Sets font weight of the app-name
- uwds-top-bar-depth: Sets the z-index 
- theme-name-font-weight: Sets font-weight for the theme-name