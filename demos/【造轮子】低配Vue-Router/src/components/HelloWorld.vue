<template>
  <div class="hello">
    <son />
  </div>
</template>

<script>
import son from "./son";
export default {
  components: { son },
  name: "HelloWorld",
  props: {
    msg: String
  },
  beforeCreate() {
    console.log("父组件beforeCreate");
  },
  created() {
    console.log("父组件created");
  },
  beforeMount() {
    console.log("父组件beforeMount");
  },
  mounted() {
    console.log("父组件mounted");
  },
  beforeUpdate() {
    console.log("父组件beforeUpdate");
  },
  updated() {
    console.log("父组件updated");
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
