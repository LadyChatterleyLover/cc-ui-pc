<template>
  <div class="p-5 bg-slate-50 h-screen relative" style="top: 200px;left: 500px;">
    <cc-popper v-model="show" placement="left">
     <div class="w-10 h-10 bg-primary"></div>
     <template #content>this is content</template>
    </cc-popper>
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

<style lang="scss" scoped></style>
