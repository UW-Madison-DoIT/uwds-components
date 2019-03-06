import { rollup } from 'rollup';
import html from 'rollup-plugin-html';
import minify from 'rollup-plugin-minify-es';

/**
 * Use HTML and minify plugin for each component directory
 */
let plugins = {
  topBarMin: [
    html({
      include: `src/top-bar/top-bar.html`,
      htmlMinifierOptions: {
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        conservativeCollapse: true
      }
    }),
    minify({
      output: {
        wrap_iife: true
      }
    })
  ],
  topBarFull: [
    html({
      include: `src/top-bar/top-bar.html`,
      htmlMinifierOptions: {
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        conservativeCollapse: true
      }
    })
  ],
};

/**
 * Export module and plain js versions of each component directory
 */
export default [
  {
    input: `src/top-bar/top-bar.js`,
    plugins: plugins.topBarMin,
    output: {
      file: `dist/top-bar/top-bar.min.js`,
      name: 'UWDSTopBar',
      format: 'iife'
    }
  },
  {
    input: `src/top-bar/top-bar.js`,
    plugins: plugins.topBarMin,
    output: {
      file: `dist/top-bar/top-bar.min.mjs`,
      name: 'UWDSTopBar',
      format: 'es'
    }
  },
  {
    input: `src/top-bar/top-bar.js`,
    plugins: plugins.topBarFull,
    output: {
      file: `dist/top-bar/top-bar.mjs`,
      name: 'UWDSTopBar',
      format: 'es'
    }
  },
  {
    input: `src/top-bar/top-bar.js`,
    plugins: plugins.topBarFull,
    output: {
      file: `dist/top-bar/top-bar.js`,
      name: 'UWDSTopBar',
      format: 'iife'
    }
  }
];
