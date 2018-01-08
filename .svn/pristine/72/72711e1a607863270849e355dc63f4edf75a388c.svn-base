<template>
  <div>
    <div class="featurebar">
      <ul class="ul">
        <li class="active"><a href="">任务配置</a>
        </li>
      </ul>
    </div>
    <div class="custon-main">
      <div class="col-lg-2">
        <left-side :active="type"></left-side>
      </div>
      <div class="col-lg-10">
        <custom-main :title="title"></custom-main>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import leftSide from '../components/leftSide.vue'
  import customMain from '../components/customMain.vue'
  export default {
    name: 'system',
    data () {
      return {
        type: 'type',
        title: '类型'
      }
    },
    computed: {
      ...mapGetters({
        state: 'projectState'
      })
    },
    components: {leftSide, customMain},
    asyncData ({store}) {
      store.dispatch('isProjectState')
    },
    methods: {
    }
  }
</script>

<style lang="less">
</style>
