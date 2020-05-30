/* eslint-disable */
const state = {
  pluginToLoad: '',
  compilerConfigs: {
    "babel": {
      config: `// https://babeljs.io/docs/en/options
      // returned objects gets passed to \`babel.transformAsync()\`
      // https://babeljs.io/docs/en/babel-core#transformasync
      // export default function() {
      //   return {
      //     presets: [],
      //     plugins: [],
      //     highlightCode: true,
      //     retainLines: true,
      //     compact: false,
      //     minified: false,
      //     comments: true
      //   }
      {
        "presets": [
          "@babel/env"
        ],
        "plugins": [
          "@babel/proposal-numeric-separators"
        ],
        retainLines: true
      }`
    }
  }
}

const computed = {
  getPlugins: (state, getters) => {
    return state.getPlugins
  }
}

export {
  state,
  computed
}
