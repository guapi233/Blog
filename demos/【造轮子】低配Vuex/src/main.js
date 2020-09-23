import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import cstore from "./store";

Vue.config.productionTip = false;

new Vue({
  router,
  store: cstore,
  // store: "???",
  baba: { name: "崔永杰" },
  render: (h) => h(App),
}).$mount("#app");
