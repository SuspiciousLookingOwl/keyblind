<template>
  <div id="app">
    <app-header ref="header" />
    <div ref="content">
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </div>
    <div ref="space"></div>
    <app-footer ref="footer" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import AppFooter from "./components/AppFooter.vue";
import AppHeader from "./components/AppHeader.vue";

@Component({
  components: { AppFooter, AppHeader }
})
export default class App extends Vue {}
</script>

<style>
@import "./assets/main.css";
</style>
