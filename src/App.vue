<template>
  <div id="app">
    <nav id="nav">
      <router-link to="/">Home</router-link>
      <select name="language">
        <option value="javascript">Javascript</option>
        <option value="typescript">Typescript</option>
        <option value="reasonml">ReasonML</option>
      </select>
      <select @change="choosePlugin" name="select" id="option">
        <option value="plugin-transform-modules-commonjs">transform-modules-commonjs</option>
        <option value="plugin-transform-spread">transform-spread</option>
      </select>
    </nav>
    <router-view/>
  </div>
</template>

<script>
/* eslint-disable */
import { state } from './state'
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'App',
  setup() {
    function choosePlugin(ev) {
      const pluginToLoad = ev.target.value
      // TODO: fix
      state.pluginToLoad = pluginToLoad
    }

    return {
      choosePlugin
    }
  }
}
</script>

<style lang="scss">
@use 'styles/common.scss';

* {
  padding: 0;
  margin: 0;
  border: 0 none;
}

#app {
  font-family: system-ui, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

select {
  margin: 6px 8px;
  padding: 6px 10px;
}

option {

}
</style>
