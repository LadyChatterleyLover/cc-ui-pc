<template>
  <div>
    <button class="mr-3" @click="Message({ message: 'success', type: 'success' })">success</button>
    <button class="mr-3"  @click="Message({ message: 'warning', type: 'warning' })">warning</button>
    <button class="mr-3"  @click="Message({ message: 'info', type: 'info' })">info</button>
    <button class="mr-3"  @click="Message.warning('error')">error</button>
  </div>
</template>

<script lang="ts" setup>
import Message from "@/components/message/src/message"
</script>

<style lang="scss" scoped></style>
