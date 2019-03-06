# uwds-top-bar

This doc is a WIP

## Using the top-bar

1. Here we will describe the process for including the required js/mjs file in an adopter's project/website. We have used npm and unpkg in the past, but folks have expressed interest in self-hosting and creating our own CDN. 

2. Use the custom element:

```html
<uwds-top-bar 
  theme-name="My" 
  app-name="Fancy App" 
  app-url="/my/home/path">
</uwds-top-bar>
```

### Attributes

- app-url
- app-name
- theme-name

### Slots

- uwds-navigation
- uwds-help
- uwds-notifications
- uwds-profile

### CSS-vars

- uwds-top-bar-bg: Sets background color 
- uwds-top-bar-color: Sets text color for top-bar elements
- uwds-top-bar-font: Sets font face of the app-name
- uwds-top-bar-font-weight: Sets font weight of the app-name
- uwds-top-bar-depth: Sets the z-index 
- theme-name-font-weight: Sets font-weight for the theme-name