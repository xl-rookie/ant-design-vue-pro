<template>
  <div class="['nav-theme-${navTheme}','nav-layout-${navLayout}']">
    <a-layout id="components-layout-demo-side" style="min-height: 100vh">
      <a-layout-sider
        v-if="navLayout==='left'"
        :theme="navTheme"
        :trigger="null"
        v-model="collapsed"
        width="256px"
        collapsible>
        <div class="logo" >ant design vue pro</div>
        <SideMenu :theme="navTheme"></SideMenu>
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0" >
          <a-icon class="triggle"
                  :type="collapsed ? 'menu-unfold':'menu-fold' "
                  @click="collapsed = !collapsed"></a-icon>
          <Header></Header>
        </a-layout-header>
        <a-layout-content style="margin: 0 16px">
          <router-view></router-view>
        </a-layout-content>
        <a-layout-footer style="text-align: center">
          <Footer></Footer>
        </a-layout-footer>
      </a-layout>
    </a-layout>
    <SettingDrawer></SettingDrawer>
  </div>
</template>

<script>
import Header from './Header'
import Footer from './Footer'
import SideMenu from './SideMenu'
import SettingDrawer from '../components/SettingDrawer'
export default {
  name: 'BasicLayout',
  data () {
    return {
      collapsed: false
    }
  },
  computed: {
    navTheme () {
      return this.$route.query.navTheme || 'dark'
    },
    navLayout () {
      return this.$route.query.navLayout || 'left'
    }
  },
  components: {
    Header,
    Footer,
    SideMenu,
    SettingDrawer
  }
}
</script>

<style scoped>
.triggle{
padding: 0 20px;
  line-height: 64px;
  font-size: 20px;
}.triggle:hover{
  background: white;
 }
</style>
