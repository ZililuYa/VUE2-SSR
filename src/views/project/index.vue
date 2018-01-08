<template>
  <div class="view">
    <menuSub :menu="menu" :menuRight="menuRight"></menuSub>
    <router-view class="wrap"></router-view>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import menuSub from 'components/menu/Menusub.vue'
import { isHistory, getUserMenu } from 'util/util'
// import cookies from 'js-cookie'
export default {
  name: 'ProjectIndex',
  title() {
    return '项目'
  },
  data() {
    return {
      currentPage: 1,
      totalPage: 99,
      menuRight: [],
      menu: []
    }
  },
  computed: {
    ...mapGetters({
      data: 'projectState',
      userStatus: 'getUserStatus'
    })
  },
  methods: {
    forEachMenu(item) {
      // 循环二级菜单
      for (let key of item) {
        if (key.type === 3) {
          // 给功能按钮(全部项目、天机项目)添加图标
          if (key.permission === 'sys.project.add') {
            key['icon'] = 'plus'
          } else {
            key['icon'] = 'th-large'
          }
          this.menuRight.push(key)
        } else {
          this.menu.push(key)
        }
      }
    },
    setLeftMenus(item) {
      const id = window.sessionStorage.getItem('pid')
      const name = window.sessionStorage.getItem('pname')
      // 循环二级菜单
      let menus = []
      if (!id) return menus
      console.log('item11111111111111', item)
      for (let key of item) {
        if (key.type === 2) {
          switch (key.url) {
            case '/project/survey':
              menus.push({ text: name || key.name, url: '/project/survey/' + id })
              break
            case '/project/task':
              menus.push({ text: key.name, url: '/project/task/' + id })
              break
            case '/project/team':
              menus.push({ text: key.name, url: '/project/team/' + id })
              break
          }
        }
      }
      return menus
    }
  },
  created() {
    // 获取用户路由
    const menus = getUserMenu(this.userStatus, this.$route.path)
    console.log('currentMenus - ', menus)
    this.forEachMenu(menus)
  },
  mounted() {
    if (isHistory('/project')) {
      this.$router.push('/project/index')
    }
    // 赋值路由ID
    const menus = getUserMenu(this.userStatus, this.$route.path)
    const newMenus = this.setLeftMenus(menus)
    this.menu = newMenus
  },
  components: { menuSub },
  asyncData({ store }) {}
}

</script>
<style>
.wrap {
  padding: 0 !important;
}

</style>
