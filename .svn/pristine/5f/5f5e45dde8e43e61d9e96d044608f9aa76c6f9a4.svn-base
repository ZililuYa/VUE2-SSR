<template>
  <div class="panel panel-default form-company" @keyup.13="submitForm()">
    <div class="panel-heading">阿拉丁管控平台 -- 创建企业</div>
    <div class="panel-body">
      <form class="form-horizontal">
        <div class="form-group">
          <label for="name" class="col-xs-3 control-label"><span class="text-danger">* </span> 公司名称</label>
          <div class="col-xs-9">
            <input type="text" v-model="ruleForm.name" class="form-control" id="name" placeholder="公司名称">
          </div>
        </div>
        <div class="form-group">
          <label for="telephone" class="col-xs-3 control-label">联系电话</label>
          <div class="col-xs-9">
            <input type="tel" v-model="ruleForm.telephone" class="form-control" id="telephone" placeholder="联系电话">
          </div>
        </div>
        <div class="form-group">
          <label for="fax" class="col-xs-3 control-label">传真</label>
          <div class="col-xs-9">
            <input type="tel" v-model="ruleForm.fax" class="form-control" id="fax" placeholder="传真">
          </div>
        </div>
        <div class="form-group">
          <label for="address" class="col-xs-3 control-label">通讯地址</label>
          <div class="col-xs-9">
            <input type="text" v-model="ruleForm.address" class="form-control" id="address" placeholder="通讯地址">
          </div>
        </div>
        <div class="form-group">
          <label for="postCode" class="col-xs-3 control-label">邮政编码</label>
          <div class="col-xs-9">
            <input type="tel" v-model="ruleForm.postCode" class="form-control" id="postCode" placeholder="邮政编码">
          </div>
        </div>
        <div class="form-group">
          <label for="officialWebsite" class="col-xs-3 control-label">官网</label>
          <div class="col-xs-9">
            <input type="text" v-model="ruleForm.officialWebsite" class="form-control" id="officialWebsite" placeholder="官网">
          </div>
        </div>
        <div class="form-group">
          <label for="intranet" class="col-xs-3 control-label">内网</label>
          <div class="col-xs-9">
            <input type="text" v-model="ruleForm.intranet" class="form-control" id="intranet" placeholder="内网">
          </div>
        </div>
        <div class="form-group art-btn-group">
          <btn type="primary" @click="submitForm">{{submit.text}}</btn>
          <btn to="/user/login">返回</btn>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import api from 'src/api'
export default {
  name: 'Login',
  title () {
    return '创建公司'
  },
  data () {
    return {
      submit: {
        loading: false,
        text: '创建企业'
      },
      ruleForm: {
        name: '',
        telephone: '',
        fax: '',
        address: '',
        postCode: '',
        officialWebsite: '',
        intranet: ''
      }
    }
  },
  created () { },
  methods: {
    submits () {
      /**
        * 创建公司
       */
      let vm = this
      const param = vm.ruleForm
      api.post('/company/add', param).then((response) => {
        console.log(response)
        if (response.code === 200) {
          vm.submit.text = '创建成功，跳转中...'
          this.$notify({
            type: 'success',
            content: '企业创建成功'
          })
          setTimeout(function () {
            vm.$router.replace({ path: '/' })
          }, 2000)
        } else {
          vm.submit.text = '创建企业'
          this.$notify({
            type: 'danger',
            content: response.message
          })
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    submitForm () {
      /**
        * 验证
       */
      let vm = this
      vm.submit.text = '创建中...'
      let nameVal = vm.ruleForm.name.trim()
      // let passwordVal = vm.ruleForm.password.trim()
      if (nameVal === '') {
        vm.submit.text = '创建企业'
        this.$notify({
          type: 'danger',
          content: '请输入企业名称!'
        })
        return false
      }
      // if (passwordVal === '') {
      //   this.$notify({
      //     type: 'danger',
      //     content: '请输入密码!'
      //   })
      //   return false
      // }
      vm.submits()
    }
  }
}
</script>
<style lang="less">
.form-company {
  width: 480px;
  margin: 0 auto;
  border-radius: 3px;
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.75);
  .art-btn-group {
    text-align: center;
  }
}
</style>
