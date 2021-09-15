<template>
  <el-breadcrumb>
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <!-- 除了特殊设置 和 最后一个不能设置点击 -->
        <span v-if="item.redirect === 'noredirect' || index === levelList.length -1 " class="no-redirect">{{ item.meta.title }}</span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import { compile } from 'path-to-regexp'
export default {
  name: 'Breadcrumb',
  data () {
    return {
      levelList: null
    }
  },
  created () {
    this.getBreadcrumb()
  },
  watch: {
    $route (route) {
      // redirect中间页排除
      if (route.path.startsWith('/redirect/')) {
        return
      }
      this.getBreadcrumb()
    }
  },
  methods: {
    getBreadcrumb () {
      let matched = this.$route.matched.filter(item => item.meta && item.meta.title)
      const first = matched[0]
      if (!this.isDashboard(first)) {
        matched = [{ path: '/home', meta: { title: '首页' } }].concat(matched)
      }
      this.levelList = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
    },
    isDashboard (route) {
      const name = route.name
      if (!name) return false
      return name === 'Dashboard'
    },
    handleLink (item) {
      const { redirect, path } = item
      if (redirect) {
        this.$router.push(redirect)
        return
      }
      this.$router.push(this.pathCompile(path))
    },
    pathCompile (path) {
      // 特殊处理 /abc/:id 这种路由
      const { params } = this.$route
      var toPath = compile(path)
      return toPath(params)
    }
  }
}
/**
 * 获取当前路由的matched 如果不是首页 记得添加上首页
 * 点击跳转时 特殊处理path
 */
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;
  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
