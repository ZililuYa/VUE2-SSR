<template>
  <div class="view">
    <menuSub :menu="menu"></menuSub>
    <router-view class="wrap"></router-view>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import menuSub from 'components/menu/Menusub.vue'
import { isHistory, getUserMenu } from 'util/util'
export default {
  name: 'Home',
  title() {
    return '首页'
  },
  data() {
    return {
      menu: []
    }
  },
  created() {
    // 获取用户路由
    const menus = getUserMenu(this.userStatus, this.$route.path)
    console.log('currentMenus - ', menus)
    this.menu = menus
  },
  computed: {
    ...mapGetters({
      userStatus: 'getUserStatus'
    })
  },
  mounted() {
    if (this.$route.path === '/' || isHistory('/home')) {
      // this.$router.replace({ path: '/home/index' })
      window.location.href = '/home/index'
    }
  },
  components: { menuSub },
  asyncData({ store }) {},
  methods: {}
}

</script>
