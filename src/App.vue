<template>
  <div id="app">
    <div class="editor-work">
        <Component/>
    </div>
  </div>
</template>

<script>
import Component from './components/Component.vue';


export default {
  name: 'App',
  components: {
    Component,
  },
  data() {
    return {
      data: [],
    };
  },
}
</script>

<style lang="less">
html {
  height: 100%;
}
body {
  height: 100%;
  margin: 0px;
}

#app {
 height: 100%;
 .editor-work {
  display: flex;
  height: 100%;
 }
}
</style>
