<template>
  <div>
    <cc-button class="mr-3" @click="handleClick">MessageBox</cc-button>
    <!-- <button class="mr-3"  @click="MessageBox({ message: 'warning', type: 'warning' })">warning</button>
    <button class="mr-3"  @click="MessageBox({ message: 'info', type: 'info' })">info</button>
    <button class="mr-3"  @click="MessageBox.warning('error')">error</button> -->
  </div>
</template>

<script lang="ts" setup>
import {h} from 'vue'
import Message from "@/components/message/src/message"
import MessageBox from "@/components/messageBox/src/MessageBox"

const handleClick = () => {
  // MessageBox.alert("This is a message", "Title", {
  //   confirmButtonText: "OK",
  //   callback: (action: "confirm" | "cancel") => {
  //     Message({
  //       type: "info",
  //       message: `action: ${action}`,
  //     })
  //   },
  // })

  // MessageBox.confirm("proxy will permanently delete the file. Continue?", "Warning", {
  //   type: "warning",
  // })
  // .then(() => {
  //   Message({
  //     type: 'success',
  //     message: 'Delete completed',
  //   })
  // })
  // .catch(() => {
  //   Message({
  //     type: 'info',
  //     message: 'Delete canceled',
  //   })
  // })

  // MessageBox.prompt("Please input your e-mail", "Tip", {
  //   confirmButtonText: "OK",
  //   cancelButtonText: "Cancel",
  // })
  //   .then(({ value }: any) => {
  //     Message({
  //       type: "success",
  //       message: `Your email is:${value}`,
  //     })
  //   })
  //   .catch(() => {
  //     Message({
  //       type: "info",
  //       message: "Input canceled",
  //     })
  //   })
  MessageBox.alert(
    '<strong>proxy is <i>HTML</i> string</strong>',
    'HTML String',
    {
      dangerouslyUseHTMLString: true,
    }
  )
}
</script>

<style lang="scss" scoped></style>
