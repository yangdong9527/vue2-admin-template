<template>
  <div class="layout-wrapper">
    <sidebar />
    <navbar />
    <tags-view />
    <div class="app-main">
      <app-main />
    </div>
  </div>
</template>

<script>
import AppMain from './AppMain.vue'
import Navbar from './Navbar.vue'
import Sidebar from './sidebar/index'
import TagsView from './TagsView/index'

export default {
  name: 'Layout',
  components: { Sidebar, Navbar, AppMain, TagsView }
}

</script>
