<template>
  <div class="home">
    <h1>input</h1>
    <textarea v-model="babelState.inputText" @keydown="babelTransform" cols="30" rows="10">let a = 4</textarea>
    <h1>output</h1>
    <button @click="babelTransform">transform</button>
    <textarea v-model="babelState.transformedText" name="area" cols="30" rows="10"></textarea>
  </div>
</template>

<script>
/* eslint-disable */
import { reactive, computed } from 'vue'
import * as babel from '@babel/core'
import p from '@babel/plugin-transform-modules-commonjs'

export default {
  name: 'Home',
  setup() {
    // start
    const babelState = reactive({
      inputText: "import eeee from 'p'",
      transformedText: 'pre'
    })

    function babelTransform() {
      (async () => {
        const { code, map, ast } = await babel.transformAsync(babelState.inputText, {
          plugins: [
            p
          ]
        })
        babelState.transformedText = code
      })()
    }

    return {
      babelState,
      babelTransform
    }
  }
}
</script>
