<template>
  <div id="app">
    <img src="./assets/logo.png" class="logo">
    <Users/>
  </div>
</template>

<script>
import Users from './components/Users'

export default {
  name: 'App',
  components: {
    Users
  }
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

.logo {
  max-width: 300px;
}

.blue-button {
  border: none;
  border-radius: 6px;
  color: #fff;
  font-weight: 600;
  background: #00a0e3;
}
</style>
