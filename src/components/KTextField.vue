<template>
  <div class="my-2">
    <div>
      {{ label }}
    </div>
    <input type="text" :value="value" class="form-control form-control-sm form-dark" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class KSlider extends Vue {
  @Prop() value!: number;
  @Prop() label!: string;
}
</script>
