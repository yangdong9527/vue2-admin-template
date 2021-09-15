<template>
  <div v-if="!item.meta || !item.meta.hidden">
    <!-- 当前路由 只有一个子路由且这个路由没有子路由 -->
    <template v-if="!alwaysShowRootMenu && theOnlyOneChild && !theOnlyOneChild.children">
      <!-- 不渲染没有 meta 的路由 -->
      <el-menu-item
        v-if="theOnlyOneChild.meta"
        :index="resolvePath(theOnlyOneChild.path)"
      >
        <svg
          v-if="theOnlyOneChild.meta.icon"
          aria-hidden="true"
          font-size="17px"
        >
          <use :xlink:href="theOnlyOneChild.meta.icon" />
        </svg>
        <span v-if="theOnlyOneChild.meta.title">{{theOnlyOneChild.meta.title}}</span>
      </el-menu-item>
    </template>
    <el-submenu v-else :index="resolvePath(item.path)">
      <template #title>
        <svg
          v-if="item.meta.icon"
          aria-hidden="true"
          font-size="17px"
        >
          <use :xlink:href="item.meta.icon" />
        </svg>
        <span v-if="item.meta.title">{{item.meta.title}}</span>
      </template>
      <template v-if="item.children">
        <sidebar-item
          v-for="child in item.children"
          :key="child.path"
          :item="child"
          :base-path="resolvePath(child.path)"
        ></sidebar-item>
      </template>
    </el-submenu>
  </div>
</template>

<script>
import path from 'path'
export default {
  name: 'SidebarItem',
  props: {
    item: {
      type: Object,
      required: true
    },
    basePath: {
      type: String,
      required: true
    }
  },
  methods: {
    resolvePath (routePath) {
      // todo 外部链接
      return path.resolve(this.basePath, routePath)
    }
  },
  computed: {
    alwaysShowRootMenu () {
      if (this.item.meta && this.item.meta.alwaysShow) {
        return true
      } else {
        return false
      }
    },
    showChildrenNumber () {
      if (this.item.children) {
        const showChildArr = this.item.children.filter(item => {
          if (item.meta && item.meta.hidden) {
            return false
          } else {
            return true
          }
        })
        return showChildArr.length
      }
      return 0
    },
    theOnlyOneChild () {
      // 当前路由拥有两个及以上的子项 当前路由为父级路由 子路由全部循环
      if (this.showChildrenNumber > 1) {
        return null
      }
      // 当前路由只有一个子路由 如果 alwaysShow 为 true, 只渲染当前路由的这个子路由
      if (this.item.children) {
        for (const child of this.item.children) {
          if (!child.meta || !child.meta.hidden) {
            return child
          }
        }
      }
      // 当前路由没有children
      return { ...this.item, path: '' }
    }
  }
}
/**
 * 实现思路
 * 循环每一项路由
 * 判断当前路由是否只有一个子路由或则没有子路由
 *  是渲染成MenuItem
 *  否当前项渲染成SubMenu, 递归组件渲染当前项子路由
 */
</script>

<style lang="scss" scoped>

</style>
