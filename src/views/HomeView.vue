<template>
  <div class="p-5">
    <div style="width: 500px">
      <cc-form ref="formRef" :model="model" :rules="rules" label-width="90">
        <cc-form-item label="用户名" prop="username">
          <cc-input v-model="model.username"></cc-input>
        </cc-form-item>
        <cc-form-item label="密码" prop="password">
          <cc-input v-model="model.password"></cc-input>
        </cc-form-item>
        <cc-form-item>
          <cc-button class="flex-1" block type="primary" @click="reset">重置</cc-button>
          <cc-button class="flex-1" block type="primary" @click="submit">登录</cc-button>
        </cc-form-item>
      </cc-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Message from "@/components/message/src/message"
import { ref } from "vue"

const formRef = ref<any>()

const model = ref({
  username: "admin",
  password: "123456",
})

const rules = ref({
  username: [
    {
      required: true,
      message: "用户名不能为空",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "密码不能为空",
      trigger: "change",
    },
    {
      min: 2,
      max: 6,
      message: "密码在2-6位之间",
    },
  ],
})

const submit = () => {
  formRef.value.validate((valid: boolean) => {
    if (valid) {
      Message.success("提交成功")
    } else {
      Message.error("表单填写有误，请检查")
    }
  })
}

const reset = () => {
  formRef.value.resetFields()
}
</script>

<style lang="scss" scoped></style>
