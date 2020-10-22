<template>
  <base-card>
    <router-view></router-view>
  </base-card>
</template>

<script>
// import VasarlasBase from "./components/vasarlas/VasarlasBase.vue";

export default {
  name: "App",
  components: {
    // VasarlasBase,
  },
  provide() {
    return {
      isLoading: this.isLoading,
      exportToExcel: this.exportToExcel,
    };
  },
  data() {
    return {
      isLoading: true,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
