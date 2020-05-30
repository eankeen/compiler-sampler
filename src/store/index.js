/* eslint-disable */
import { createStore } from 'vuex'

const state = {
  languages: {
    babel: {
      displayName: "Babel",
      // "_comment": "returned objects gets passed to \`babel.transformAsync()\` https://babeljs.io/docs/en/babel-core#transformasync",
      config: `{
  "presets": [
    "@babel/env"
  ],
  "plugins": [
    "@babel/proposal-numeric-separators"
  ],
  "retainLines": true
}`,
      variants: {
        presets: [
          "@babel/preset-env",
          "@babel/preset-flow",
          "@babel/preset-react",
          "@babel/preset-typescript"
        ],
        plugins: [
          "@babel/plugin-transform-modules-commonjs",
          "@babel/plugin-proposal-nullish-coalescing-operator",
          "@babel/plugin-proposal-numeric-separator",
          "@babel/plugin-proposal-optional-chaining"
        ]
      }
    },
    typescript: {
      displayName: "TypeScript",
      variants: {
        default: ["default"]
      }
    },
    postcss: {
      displayName: "PostCSS",
      variants: {
        presets: ["postcss-preset-env"],
        plugins: [
          "autoprefixer",
          "postcss-attribute-case-insensitive",
          "postcss-color-functional-notation",
          "postcss-color-gray",
          "postcss-color-hex-alpha",
          "postcss-color-mod-function",
          "postcss-color-rebeccapurple",
          "postcss-custom-media",
          "postcss-custom-properties",
          "postcss-custom-selectors",
          "postcss-dir-pseudo-class",
          "postcss-double-position-gradients",
          "postcss-env-function",
          "postcss-focus-visible",
          "postcss-focus-within",
          "postcss-font-variant",
          "postcss-gap-properties",
          "postcss-image-set-function",
          "postcss-initial",
          "postcss-lab-function",
          "postcss-logical",
          "postcss-media-minmax",
          "postcss-nesting",
          "postcss-overflow-shorthand",
          "postcss-page-break",
          "postcss-place",
          "postcsspseudo-class-any-link",
          "postcss-replace-overflow-wrap",
          "postcss-selector-matches",
          "postcss-selector-not"
        ]
      }
    }
  },
  babel: {
    plugins: [],
    presets: [],
    input: '',
    output: '',
    isTransformError: '',
    transformText: ''
  }
}

export default createStore({
  state() {
    return {
      strict: process.env.NODE_ENV !== 'production',
      state,
      getters: {
        currentPluginToLoad (state) {
          return state.languages['javascript'].pluginToLoad
        },
        getLanguageConfig(language) {
          const config = state.languages[language].config
          return JSON.parse(config)
        }
      },
      mutations: {
        setPluginToLoad (state, newPlugin) {
          state.languages['javascript'].pluginToLoad = newPlugin
        }
      },
      actions: {
      },
      modules: {
      }
    }
  }
})
