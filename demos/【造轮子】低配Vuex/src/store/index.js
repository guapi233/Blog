import Vue from "vue";
// import Vuex from "vuex";
import Vuex from "../../vuex/index";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    name: "Mob",
  },
  getters: {
    getName(state) {
      return "我是" + state.name;
    },
  },
  mutations: {
    nameLog(state, string) {
      state.name += string;
    },
  },
  actions: {
    enNameLog({ commit }, string) {
      commit("nameLog", string);
    },
  },
  modules: {},
});
