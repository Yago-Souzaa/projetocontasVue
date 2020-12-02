<template>

    <div id="app" class="columns is-centered">
      <ContaPessoal msg="Bem Vindo Yago"/>
    </div>
 
</template>

<script>
import ContaPessoal from "./components/ContaPessoal.vue";

export default {
  name: "App",
  data: function () {
    return {
    };
  },
  components: {
    ContaPessoal,
  },
};
</script>

<style>
#app {
  text-align: center;
  margin-top: 60px;
}
</style>
