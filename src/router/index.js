import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/index/Home'
  },
  {
    path: "/index",
    name: "index",
    component: () => import("../views/Index.vue"),

    //嵌套二级路由
    children: [
      {
        path: "/index/Home",
        name: "/index/Home",
        component: () => import("../views/modules/Home.vue")
      },
      {
        path: "/index/Upload",
        name: "/index/Upload",
        component: () => import("../views/modules/Upload.vue")
      },
      {
        path: "/index/Metamask",
        name: "/index/Metamask",
        component: () => import("../views/modules/Metamask.vue")
      },
      {
        path: "/index/Contract",
        name: "/index/Contract",
        component: () => import("../views/modules/Contract.vue")
      },
      {
        path: "/index/Bignum",
        name: "/index/Bignum",
        component: () => import("../views/modules/Bignum.vue")
      },
      {
        path: "/index/Test",
        name: "/index/Test",
        component: () => import("../views/modules/Test.vue")
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
