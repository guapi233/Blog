<template>
  <div>
    <button @click="num++">{{ num }}</button>
    {{ $store }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      num: 0
    };
  },
  beforeCreate() {
    console.log(this.$options);
    console.log("子组件beforeCreate");
  },
  created() {
    console.log("子组件created");
  },
  beforeMount() {
    console.log("子组件beforeMount");
  },
  mounted() {
    console.log("子组件mounted");
  },
  beforeUpdate() {
    console.log("子组件beforeUpdate");
  },
  updated() {
    console.log("子组件updated");
  }
};
</script>

<style>
</style>