<template>
  <div class="my-4">
    <div>
      {{ label }}
      <small class="text-secondary"> ({{ preview ? preview(value) : value }}) </small>
    </div>
    <input
      type="range"
      :min="min"
      :max="max"
      class="slider"
      :value="value"
      @input="$emit('input', $event.target.value)"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class KSlider extends Vue {
  @Prop() value!: number;
  @Prop() min!: number;
  @Prop() max!: number;
  @Prop() label!: string;
  @Prop({ default: undefined }) preview!: (value: number) => {};
}
</script>

<style scoped>
.slider {
  -webkit-appearance: none;
  width: 100%;
  height: 0.3rem;
  border-radius: 5px;
  background: #858585;
  outline: none;
  opacity: 0.7;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
}

.slider:hover {
  opacity: 1;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background: #d1d1d1;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background: #d1d1d1;
  cursor: pointer;
}

.slider::-moz-thumb {
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background: #d1d1d1;
  cursor: point;
}

.slide-leave-active,
.slide-enter-active {
  transition: 1s;
}
.slide-enter {
  transform: translate(100%, 0);
}
.slide-leave-to {
  transform: translate(-100%, 0);
}

.slide-enter-active,
.slide-leave-active {
  transition: margin-bottom 0.8s ease-out;
}

.slide-enter,
.slide-leave-to {
  margin-bottom: -200px;
}

.slide-enter-to,
.slide-leave {
  margin-bottom: 0px;
}
</style>
