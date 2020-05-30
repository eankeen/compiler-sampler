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
import { editor } from "monaco-editor";
import { state } from "../state";
import { mapGetters, mapMutations, mapActions } from "vuex";
import { reactive, computed, onCreated, onMounted, ref } from "vue";
// TODO: fix dependencies and others (ex. regenerator-runtime)
import * as babel from "@babel/core";
import pluginTransformModulesCommonjs from "@babel/plugin-transform-modules-commonjs";
import pluginTransformSpread from "@babel/plugin-transform-spread";
import pluginNumericSeparator from "@babel/plugin-proposal-numeric-separator";
import presetEnv from "@babel/preset-env";

let actualEditor

export default {
  name: "Home",
  setup() {
    onMounted(async () => {
      const editorInput = document.getElementById('input-monaco')
      console.log(editorInput)
      actualEditor = editor.create(editorInput, {
        value: "import { foo } from './bar'\n\nconst a = 1_000;\n\nfunction hello() {\n  alert('Hello world!');\n}",
        language: "javascript"
      })
      await babelTransform()
    })

    const babelState = reactive({
      inputText: "'loading...'",
      transformedText: "'loading...'",
      isErrorOnTransform: false,
      errorText: null
    });

    async function babelTransform() {
      babelState.inputText = actualEditor.getValue();


      const plugins = [];
      const presets = [];
      if (state.pluginToLoad === "@babel/plugin-transform-modules-commonjs") {
        plugins.push(pluginTransformModulesCommonjs);
      } else if (state.pluginToLoad === "@babel/plugin-transform-spread") {
        plugins.push(pluginTransformSpread);
      }
      plugins.push(pluginNumericSeparator)
      console.log(plugins, presets)

      try {
        console.log(state);
        const { code, map, ast } = await babel.transformAsync(
          babelState.inputText,
          {
            plugins,
            presets
          }
        );
        babelState.isErrorOnTransform = false;
        babelState.transformedText = code;
      } catch (err) {
        // error with parsing
        babelState.isErrorOnTransform = true;
        console.error("parsing error");
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
