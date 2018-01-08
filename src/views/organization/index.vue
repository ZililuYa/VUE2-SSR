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
export default {
  name: 'organizationIndex',
  title() {
    return '组织'
  },
  data() {
    return {
      menuRight: [],
      menu: []
    }
  },
  components: { menuSub },
  computed: {
    ...mapGetters({
      getQrCode: 'getQrCode', // 二维码
      userStatus: 'getUserStatus'
    })
  },
  created() {
    // 获取用户路由
    const menus = getUserMenu(this.userStatus, this.$route.path)
    console.log('currentMenus - ', menus)
    this.menu = menus
  },
  mounted() {
    if (isHistory('/organization')) {
      this.$router.push('/organization/index')
    }
  },
  asyncData({ store, route }) {},
  methods: {}
}

</script>
