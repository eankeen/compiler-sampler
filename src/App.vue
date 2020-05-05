<template>
  <div id="app">
    <nav id="nav">
      <router-link to="/">Home</router-link>
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
export default {
  name: 'App',
  setup() {
    function choosePlugin() {
      console.log('change')
    }

    return {
      choosePlugin
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
