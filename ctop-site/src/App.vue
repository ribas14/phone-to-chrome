<template>
  <div id="app">
    <head>
      <title>HTML Reference</title>
    </head>
    <Chat msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import Chat from './components/Chat.vue'

export default {
  name: 'app',
  components: {
    Chat
  },
  
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
