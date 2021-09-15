<template>
  <div class="sidebar-container">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="false"
        :router="true"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :active-text-color="variables.mentuActiveText"
        :collapse-transition="false"
        :unique-opened="false"
        mode="vertical"
      >
        <sidebar-item v-for="(item, index) in constantRouters" :key="index" :item="item" :basePath="item.path"></sidebar-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import variables from '@/assets/styles/variable.scss'
import { constantRouters } from '../../router/index'
import SidebarItem from './SidebarItem'
export default {
  name: 'Sidebar',
  components: { SidebarItem },
  data () {
    return {
      variables,
      constantRouters
    }
  },
  computed: {
    activeMenu () {
      const route = this.$route
      const { meta, path } = route
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    }
  }
}
</script>
