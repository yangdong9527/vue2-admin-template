<template>
  <div>
    <el-button @click="handleLogin">点击登录</el-button>
  </div>
</template>

<script>
export default {
  name: 'Login',
  methods: {
    handleLogin () {
      this.$store.dispatch('login')
        .then(() => {
          this.$router.replace({ path: '/' })
        })
    }
  }
}
</script>
