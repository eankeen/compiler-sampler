<template>
  <div class="home">
    <main class="input-output-parent">
      <!-- <div class="input"> -->
        <div id="input-monaco" @keyup="babelTransform"></div>
        <!-- <textarea v-model="babelState.inputText"  name="input">let a = 4</textarea> -->
      <!-- </div> -->
      <div class="output">
        <textarea v-model="babelState.transformedText" name="output"></textarea>
      </div>
    </main>
    <h2>error</h2>
    <p v-if="babelState.isErrorOnTransform">{{ babelState.errorText }}</p>
  </div>
</template>

<script>
/* eslint-disable */
import { editor } from 'monaco-editor'
import { state } from '../state'
import { mapGetters, mapMutations, mapActions} from 'vuex'
import { reactive, computed, onCreated, onMounted } from 'vue'
import * as babel from '@babel/core'
import pluginTransformModulesCommonjs from '@babel/plugin-transform-modules-commonjs'
import pluginTransformSpread from '@babel/plugin-transform-spread'

let editor3

export default {
  name: 'Home',
  mounted() {
    const input = document.getElementById('input-monaco')
    const editor2 = editor.create(input, {
      value: "function hello() {\n\talert('Hello world!');\n}",
      language: "javascript"
    });
    console.log(editor2)
    console.log(editor2.getValue())
    editor3 = editor2
  },
  setup() {
    // onCreated(() => {

    //   const input = document.getElementById('input')
    //   editor.create(input, {
    //     value: "function hello() {\n\talert('Hello world!');\n}",
    //     language: "javascript"
    //   });
    // })

    const babelState = reactive({
      inputText: "import eeee from 'p'",
      transformedText: 'pre',
      isErrorOnTransform: false,
      errorText: null
    })

    function babelTransform() {
      console.log(editor3.getValue())
      babelState.inputText = editor3.getValue()

      const plugins = []
      if (state.pluginToLoad === 'plugin-transform-modules-commonjs') {
        plugins.push(pluginTransformModulesCommonjs)
      } else if (state.pluginToLoad === 'plugin-transform-spread') {
        plugins.push(pluginTransformSpread)
      }
      (async () => {
        try {
          console.log(state)
          const { code, map, ast } = await babel.transformAsync(babelState.inputText, {
            plugins
          })
          babelState.isErrorOnTransform = false
          babelState.transformedText = code
        } catch (err) {
          // error with parsing
          babelState.isErrorOnTransform = true
          console.log('parsing error')
          babelState.errorText = err
        }

      })()
    }

    return {
      babelState,
      babelTransform
    }
  }
}
</script>

<style lang="scss" scoped>
.input-output-parent {
  height: 200px;
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.input {

}

.input-monaco {
  height: 900px;
  width: 100%;
}
.output {

}

textarea {
  width: 100%;
  height: 100%;
}
</style>
