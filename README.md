# UWDS Components

This repository contains the source code for web components developed for (and used by) the (UW IT Design System)[https://github.com/UW-Madison-DoIT/uw-it-design-system].

## First-time setup

Clone the repository and navigate to it, then run `npm install`.

## Running locally

Run `npm start` to see the components in action.

## Contributing

When adding a new component to the collection, follow these guidelines:

1. Create a new directory for the component in the `src/` directory (e.g. "new-shiny")
2. Create an HTML and JS file for the component, with filenames that match the directory name (e.g. "new-shiny.html")
3. **Create a markdown document in the component directory, where you will document any watched attributes, slots, or CSS-vars.**

Once you have written some code you're ready to test, do the following:

1. Run `npm build` to have rollup bundle the components' HTMl and JS files
2. Add a script take for your new component module in `index.html` (e.g. "new-shiny.min.mjs")
3. Add the custom element tag for the component to the document body where appropriate (e.g. `<new-shiny></new-shiny>`)
