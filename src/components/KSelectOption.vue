<template>
  <div class="my-2">
    <div class="py-1">{{ label }}</div>
    <select
      class="form-control form-control-sm form-dark"
      :value="value"
      @input="$emit('input', $event.target.value)"
    >
      <option
        v-for="option in options"
        :disabled="typeof option !== 'string' && !option.value"
        :value="typeof option !== 'string' ? option.value : option"
        :key="typeof option !== 'string' ? option.label : option"
      >
        {{
          typeof option !== "string"
            ? option.label
            : option.charAt(0).toUpperCase() + option.slice(1)
        }}
      </option>
    </select>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

interface Option {
  label: string;
  value: string;
}

@Component
export default class KSelectOption extends Vue {
  @Prop() value!: string;
  @Prop() label!: string;
  @Prop() options!: (Option | string)[];
}
</script>
