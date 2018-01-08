<template>
  <div class="">
    <div class="main">
      <div class="view-main">
        <div class="col-xs-2">
          <b>允许访问的视图</b>
        </div>
        <div class="col-xs-7">
          <form class="">
            <label class="checkbox-inline" v-for="(item, index) in menuData">
              <input type="checkbox" :id="item.id" :value="item.id" :checked="item.check" @change="getChecked(index)"> {{item.name}}
            </label>
            <label class="checkbox-inline">
              <input type="checkbox" v-model="allChecked" @change="getAllChecked"> 全选
            </label>
          </form>
        </div>
        <div class="col-xs-3">
          <span>空代表访问没有访问限制</span>
        </div>
        <div class="view-btn-group art-btn-group col-xs-10 col-xs-offset-2">
          <btn class="" type="primary" @click="menuSubmit">保存</btn>
          <a href="javascript:void(0)" class="btn btn-default" @click="goBack">返回</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import api from 'src/api'
  import { deepCopy } from 'util/util'
  export default {
    name: 'viewManage',
    title () {
      return '视图'
    },
    data () {
      return {
        powerId: '',
        allChecked: false,
        menuData: []
      }
    },
    computed: {
      ...mapGetters({
        menuList: 'menuList'
      })
    },
    created () {
      this.menuData = deepCopy(this.menuList)
    },
    mounted () {
      // 客户端请求axios
      // 获取地址栏参数
      this.powerId = this.$route.params.id
      console.log('客户端获取菜单列表结果~~', this.menuList)
      this.menuAllCheck()
    },
    asyncData ({store, route}) {
      let param = {
        groupId: route.params.id
      }
      return store.dispatch('isMenuList', param)
    },
    methods: {
      ...mapActions([
        'isMenuList'
      ]),
      getChecked (index) {
        /**
         * checkbox change事件
         **/
        let vm = this
        vm.menuData[index].check = !vm.menuData[index].check
        this.menuAllCheck()
      },
      menuAllCheck () {
        let checkAll = true
        this.menuData.forEach((item, key) => {
          if (!item.check) {
            checkAll = false
          }
          this.allChecked = false
          if (key === (this.menuData.length - 1) && checkAll) {
            this.allChecked = true
          }
        })
      },
      getAllChecked () {
        /**
         * 全选
         **/
        this.menuData.forEach((item) => {
          item.check = this.allChecked
        })
      },
      menuSubmit () {
        /**
         * 提交
         **/
        let params = {}
        params.id = this.powerId
        params.viewId = ''
        this.menuData.forEach((item) => {
          if (item.check) {
            params.viewId += item.id + ','
          }
        })
        api.post('/group/update', params).then((response) => {
          if (response.code === 200) {
            this.$notify({
              type: 'success',
              content: '修改成功'
            })
            this.goBack()
          } else {
            this.$notify({
              type: 'danger',
              content: response.message
            })
          }
        }).catch((error) => {
          console.log(error)
        })
      },
      goBack () {
        /**
         * 返回上一页
         **/
        this.$router.go(-1)
      }
    }
  }
</script>

<style lang="less">
  @border: #ddd;
  .main {
    padding: 20px;
  }
  .view-main {
    overflow: hidden;
    border:1px solid @border;
    padding: 15px;
    .view-btn-group {
      clear: both;
      margin-top: 15px;
    }
  }
</style>
