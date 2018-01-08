<template>
  <div class="panel panel-default login-form" @keyup.13="submitForm()">
    <div class="panel-heading">登录并接受 superman。 邀请，加入项目 Teambition 新手引导</div>
    <div class="panel-body accept-body">
      <btn type="primary" @click="submits">{{submit.text}}</btn>
    </div>
  </div>
</template>
<script>
// import api from 'src/api'
export default {
  name: 'AcceptInvite',
  title () {
    return '邀请成员'
  },
  data() {
    return {
      submit: {
        loading: false,
        text: '加 入'
      }
      // ruleForm: {
      //   username: '13691425060',
      //   password: '123456'
      // }
    }
  },
  created() {
    // 客户端 服务端同时请求axios
  },
  mounted() {
    // 客户端请求axios
  },
  asyncData({ store }) {
    // return store.dispatch(`doLogins`)
  },
  methods: {
    submits() {
      /**
       * 登录
       */
      // const param = this.ruleForm
      // api.post('/login', param).then((response) => {
      //   if (response.code === 200) {
      //   } else {
      //     this.submit.text = '登 录'
      //     this.notify('danger', response.message)
      //   }
      // }).catch((error) => {
      //   console.log(error)
      // })
    }
  }
}

</script>
<style lang="less">
  .accept-body {
    text-align: center;
  }
</style>
