<template>
  <div id="app">
    <nav id="nav">
      <div class="controls">
        <router-link class="title" to="/">Compiler</router-link>
        <select name="language" @change="changeCurrentLanguage">
          <option
            v-for="language in Object.keys(supportedLanguages)"
            :key="language"
            :value="language"
            >{{ supportedLanguages[language].displayName }}</option
          >
        </select>
        <select name="variant" @change="choosePlugin">
          <!-- <optgroup v-for="languageVariants in supportedLanguages[currentLanguage].variants" :key="languageVariants" :label="supportedLanguages[currentLanguage]"> -->
          <optgroup
            v-for="[languageVariantType, languageVariantList] in Object.entries(
              supportedLanguages[currentLanguage].variants
            )"
            :key="languageVariantType"
            :label="languageVariantType"
          >
            <option
              v-for="languageVariant in languageVariantList"
              :key="languageVariant"
              >{{ languageVariant }}</option
            >
          </optgroup>
        </select>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
/* eslint-disable */
import { reactive, ref } from "vue";
import { state } from "./state";
import Store from './store';
import { useStore } from "vuex";
import a from "vuex"

export default {
  name: "App",
  setup() {
    console.log(Store)
    console.log(Store.getters.pluginToLoad)
    console.log(Store.state.supportedLanguages)

    function choosePlugin(ev) {
      const pluginToLoad = ev.target.value;
      // TODO: fix
      state.pluginToLoad = pluginToLoad;
    }

    const currentLanguage = ref("javascript");
    function changeCurrentLanguage(ev) {
      console.log("test", ev.target.value);
      const newLanguage = ev.target.value;
      currentLanguage.value = newLanguage;
    }
    const supportedLanguages = reactive({
      javascript: {
        displayName: "Babel",
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
    });

    return {
      choosePlugin,
      changeCurrentLanguage,
      currentLanguage,
      supportedLanguages
    };
  }
};
</script>

<style lang="scss">
@import "styles/common.scss";

*,
*::before,
*::after {
  color: $oc-gray-9;
  background: $oc-gray-0;
  padding: 0;
  margin: 0;
  border: 0 none;
}

#app {
  font-family: system-ui, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.title {
  margin: 4px;
}

select {
  padding: 6px 10px;
  border: 1px solid $oc-gray-9;
  border-radius: 2px;
  margin: 2px;
}

option {
}
</style>
