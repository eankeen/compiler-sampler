import { createStore } from 'vuex'

export default createStore({
  state () {
    return {
      strict: process.env.NODE_ENV !== 'production',
      choice: {
        plugin: ''
      },
      babel: {
        plugins: [],
        presets: [],
        input: '',
        output: '',
        isTransformError: '',
        transformText: ''

      },
      mutations: {
        setPlugin (state, newPlugin) {
          console.log(state, newPlugin)
          state.plugin = newPlugin
        }
      },
      actions: {
      },
      modules: {
      }
    }
  }
})
