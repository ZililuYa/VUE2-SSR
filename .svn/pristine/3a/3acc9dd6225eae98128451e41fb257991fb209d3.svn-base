<template>
  <header id="header" class="header">
    <top-header v-if="topHeader" :company="company" :users="users"></top-header>
    <menus :menus="menus"></menus>
  </header>
</template>
<script>
import TopHeader from 'components/header/TopHeader.vue'
import Menus from 'components/menu/Menu.vue'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      topHeader: false,
      company: {},
      users: {},
      menus: []
    }
  },
  computed: {
    ...mapGetters({
      userStatus: 'getUserStatus'
    })
  },
  created() {
    const status = this.userStatus
    if (status.code === 200) {
      this.topHeader = true
      this.company = status.data.company
      this.users = status.data.user
      this.menus = status.data.menu
    }
  },
  components: {
    TopHeader,
    Menus
  }
}
</script>
<style lang="stylus">
  .header
    background-color: #1e232f;
    padding: 12px 20px 0;
</style>
