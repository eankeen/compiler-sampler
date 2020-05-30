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
    <h2>config</h2>
    <div class="input-output-parent">
        <div id="input-monaco-config" @keyup="babelTransform"></div>
    </div>
    <h2>error</h2>
    <p v-if="babelState.isErrorOnTransform">{{ babelState.errorText }}</p>
  </div>
</template>

<script>
/* eslint-disable */
import { editor } from "monaco-editor";
import { state } from "../state";
import store from "../store"
import { mapGetters, mapMutations, mapActions, useStore } from "vuex";
import { reactive, computed, onCreated, onMounted, ref } from "vue";
// TODO: fix dependencies and others (ex. regenerator-runtime)
import * as babel from "@babel/core";
import pluginTransformModulesCommonjs from "@babel/plugin-transform-modules-commonjs";
import pluginTransformSpread from "@babel/plugin-transform-spread";
import pluginNumericSeparator from "@babel/plugin-proposal-numeric-separator";
import presetEnv from "@babel/preset-env";

let actualEditor
let configEditor

export default {
  name: "Home",
  setup() {
    onMounted(async () => {
      const editorInput = document.getElementById('input-monaco')
      actualEditor = editor.create(editorInput, {
        value: "import { foo } from './bar'\n\nconst a = 1_000;\n\nfunction hello() {\n  alert('Hello world!');\n}",
        language: "javascript",
        formatOnType: true
      })

      const configEditorInput = document.getElementById('input-monaco-config')
      configEditor = editor.create(configEditorInput, {
        value: JSON.stringify(store.state.getters.getLanguageConfig('babel'), null, 2),
        language: "json",
        formatOnType: true
      })

      await babelTransform()
    })

    const babelState = reactive({
      inputText: "'loading...'",
      transformedText: "'loading...'",
      isErrorOnTransform: false,
      errorText: null
    });

    function transformConfig(config) {
      for (const preset of config.presets) {

      }
      config.presets = [ presetEnv ]

      for (const plugin of config.plugins) {

      }
      config.plugins = [ pluginNumericSeparator ]

      return config
    }

    async function babelTransform() {
      babelState.inputText = actualEditor.getValue();
      let languageConfig = JSON.parse(configEditor.getValue())
      languageConfig = transformConfig(languageConfig)

      try {
        console.info("about to load config %O", languageConfig)
        const { code, map, ast } = await babel.transformAsync(
          babelState.inputText,
          languageConfig
        );
        babelState.isErrorOnTransform = false;
        babelState.transformedText = code;
      } catch (err) {
        babelState.isErrorOnTransform = true;
        babelState.errorText = err;
      }
    }

    return {
      babelState,
      babelTransform
    };
  }
};
</script>

<style lang="scss" scoped>
.input-output-parent {
  height: 200px;
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.input-monaco, .input-monaco-config {
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
