import Vue from 'vue'
import {
  Button,
  Scrollbar,
  Menu,
  Submenu,
  MenuItem,
  Breadcrumb,
  BreadcrumbItem
} from 'element-ui'

const components = [
  Button,
  Menu,
  Submenu,
  MenuItem,
  Breadcrumb,
  BreadcrumbItem
]

components.forEach(component => {
  Vue.component(component.name, component)
})

Vue.use(Scrollbar)
