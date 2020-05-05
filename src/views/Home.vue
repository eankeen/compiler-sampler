<template>
  <div class="home">
    <main class="input-output-parent">
      <div class="input">
        <textarea v-model="babelState.inputText" @keyup="babelTransform" name="input">let a = 4</textarea>
      </div>
      <div class="output">
        <textarea v-model="babelState.transformedText" name="output"></textarea>
      </div>
    </main>
    <h2>error</h2>
    <p v-if="babelState.isErrorOnTransform">{{ babelState.errorText }}</p>
    <button @click="babelTransform">transform</button>
  </div>
</template>

<script>
/* eslint-disable */
import { reactive, computed } from 'vue'
import * as babel from '@babel/core'
import p from '@babel/plugin-transform-modules-commonjs'
import p2 from '@babel/plugin-transform-spread'

export default {
  name: 'Home',
  setup() {
    // start
    const babelState = reactive({
      inputText: "import eeee from 'p'",
      transformedText: 'pre',
      isErrorOnTransform: false,
      errorText: null
    })

    function babelTransform() {
      (async () => {
        try {
          const { code, map, ast } = await babel.transformAsync(babelState.inputText, {
            plugins: [
              p, p2
            ]
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

.output {

}

textarea {
  width: 100%;
  height: 100%;
}
</style>
