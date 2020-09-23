<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    {{ $store.state.name }}
    {{ $store.getters.getName }}
    <button @click="handleClick">名字变长</button>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    // HelloWorld
  },
  methods: {
    handleClick() {
      // this.$store.commit("nameLog", "*");
      this.$store.dispatch("enNameLog", "*");
    }
  }
};
</script>
