<template>
  <div style="width: 256px">
    <a-menu
      :selected-keys="selectedKeys"
      :open-keys.sync="openKeys"
      mode="inline"
      :theme="theme"
    >
      <template v-for="item in menuData">
        <a-menu-item v-if="!item.children" :key="item.path" @click="()=> $router.push({path:item.path,qurey:$route.query})">
          <a-icon v-if='item.meta.icon' :type="item.meta.icon" />
          <span>{{ item.meta.tittle }}</span>
        </a-menu-item>
        <sub-menu v-else :key="item.path" :menu-info="item" />
      </template>
    </a-menu>
  </div>
</template>

<script>
// recommend use functional component
// <template functional>
//   <a-sub-menu :key="props.menuInfo.key">
//     <span slot="title">
//       <a-icon type="mail" /><span>{{ props.menuInfo.title }}</span>
//     </span>
//     <template v-for="item in props.menuInfo.children">
//       <a-menu-item v-if="!item.children" :key="item.key">
//         <a-icon type="pie-chart" />
//         <span>{{ item.title }}</span>
//       </a-menu-item>
//       <sub-menu v-else :key="item.key" :menu-info="item" />
//     </template>
//   </a-sub-menu>
// </template>
// export default {
//   props: ['menuInfo'],
// };

// const SubMenu = {
//   template: `
//       <a-sub-menu :key="menuInfo.key" v-bind="$props" v-on="$listeners">
//         <span slot="title">
//           <a-icon type="mail" /><span>{{ menuInfo.title }}</span>
//         </span>
//         <template v-for="item in menuInfo.children">
//           <a-menu-item v-if="!item.children" :key="item.key">
//             <a-icon type="pie-chart" />
//             <span>{{ item.title }}</span>
//           </a-menu-item>
//           <sub-menu v-else :key="item.key" :menu-info="item" />
//         </template>
//       </a-sub-menu>
//     `,
//   name: 'SubMenu',
//   props: {
//     menuInfo: {
//       type: Object,
//       default: () => ({})
//     }
//   }
// }
import SubMenu from './SubMenu'
export default {
  components: {
    'sub-menu': SubMenu
  },
  watch: {
    '$route.path': function (val) {
      this.selectedKeys = this.selectedKeysMap[val]
      this.openKeys = this.collapsed ? [] : this.openKeysMap[val]
    }
  },
  props: {
    theme: {
      type: String,
      default: 'dark'
    }
  },
  data () {
    // hashMap 形式
    this.selectedKeysMap = {}
    this.openKeysMap = {}
    const menuData = this.getMenuData(this.$router.options.routes) // 获得路由的配置
    return {
      collapsed: false,
      // list: [
      //   {
      //     key: '1',
      //     title: 'Option 1'
      //   },
      //   {
      //     key: '2',
      //     title: 'Navigation 2',
      //     children: [
      //       {
      //         key: '2.1',
      //         title: 'Navigation 3',
      //         children: [{ key: '2.1.1', title: 'Option 2.1.1' }]
      //       }
      //     ]
      //   }
      // ]
      menuData,
      selectedKeys: this.selectedKeysMap[this.$route.path],
      openKeys: this.collapsed ? [] : this.openKeysMap[this.$route.path]
    }
  },
  methods: {
    toggleCollapsed () {
      this.collapsed = !this.collapsed
    },
    getMenuData (routes = [], parentKeys = [], selectedKey) {
      const menuData = []
      routes.forEach(item => {
        if (item.name && !item.hideInMenu) {
          this.openKeysMap[item.path] = parentKeys
          this.selectedKeysMap[item.path] = [selectedKey || item.path]
          const newItem = { ...item }
          delete newItem.children
          if (item.children && !item.hideChildrenMenu) {
            newItem.children = this.getMenuData(item.children, [...parentKeys, item.path])
          } else {
            this.getMenuData(item.children, selectedKey ? parentKeys : [...parentKeys, item.path], selectedKey || item.path)
          }
          menuData.push(newItem)
        } else if (!item.hideInMenu && !item.hideChildrenMenu && item.children) {
          menuData.push(...this.getMenuData(item.children))
        }
      })
      return menuData
    }
  }
}
</script>
