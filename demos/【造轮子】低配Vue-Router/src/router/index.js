import Vue from "vue";
// import VueRouter from "vue-router";
import VueRouter from "../../vueRouter/index";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Aaa from "../views/Temp.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      {
        path: "/a",
        component: About,
      },
    ],
  },
  {
    path: "/a",
    component: Aaa,
  },
  {
    path: "/about",
    name: "About",
    component: About,
    children: [
      {
        path: "/b",
        component: Home,
      },
    ],
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () =>
    //   import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes,
});

export default router;
