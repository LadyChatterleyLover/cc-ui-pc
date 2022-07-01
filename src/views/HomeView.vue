<template>
  <div class="p-5 bg-slate-50 h-screen">
    <cc-select v-model="value" class="m-2" placeholder="Select" size="large">
      <cc-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    </cc-select>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue"

const value = ref("")

const options = [
  {
    value: "Option1",
    label: "Option1",
  },
  {
    value: "Option2",
    label: "Option2",
  },
  {
    value: "Option3",
    label: "Option3",
  },
  {
    value: "Option4",
    label: "Option4",
  },
  {
    value: "Option5",
    label: "Option5",
  },
]
</script>

<style lang="scss" scoped></style>
