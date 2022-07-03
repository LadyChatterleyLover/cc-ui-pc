<template>
  <div class="p-5 bg-slate-50 h-screen">
    <!-- <cc-popper v-model="show" placement="left">
     <div class="w-10 h-10 bg-primary"></div>
     <template #content>this is content</template>
    </cc-popper> -->
    <cc-select v-model="value" placeholder="请选择">
      <cc-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></cc-option>
    </cc-select>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue"

const show = ref(false)
const activeName = ref('first')
const handleClick = (tab: any, event: Event) => {
  console.log(tab, event)
}

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

<style lang="scss" scoped>
</style>
