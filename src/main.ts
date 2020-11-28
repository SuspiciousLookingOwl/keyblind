import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vueDebounce from "vue-debounce";

Vue.config.productionTip = false;

Vue.use(vueDebounce, {
  listenTo: "change"
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
