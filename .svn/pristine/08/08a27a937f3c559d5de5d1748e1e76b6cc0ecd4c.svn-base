<template>
  <div class="">
    <div class="outer">
      <div class="company-inner">
        <div class="featurebar">
          <ul class="ul">
            <li><b>发信配置<span style="padding:0 8px">&gt;</span>邮箱配置</b></li>
          </ul>
        </div>
        <div class="company-info">
          <formData ref="formSend" class="form-horizontal">
            <div class="form-group">
              <label for="name" class="col-xs-3 control-label">邮箱</label>
              <div class="col-xs-6">
                <input type="email" v-model="ruleForm.email" class="form-control" id="username" validate="email" fh="fh_email">
                <span class="falseHints" id="fh_email"></span>
              </div>
            </div>
            <!-- <div class="form-group">
              <label for="fax" class="col-xs-3 control-label">smtp服务器</label>
              <div class="col-xs-8">
                <input type="text" v-model="ruleForm.mailHost" class="form-control" id="mailHost">
              </div>
            </div> -->
            <!-- <div class="form-group">
              <label for="officialWebsite" class="col-xs-3 control-label">smtp帐号</label>
              <div class="col-xs-8">
                <input type="text" v-model="ruleForm.username" class="form-control">
              </div>
            </div> -->
            <div class="form-group">
              <label for="officialWebsite" class="col-xs-3 control-label">授权码</label>
              <div class="col-xs-6">
                <input type="password" v-model="ruleForm.passwd" autocomplete="new-password" class="form-control" id="passwd" validate="required" fh="fh_passwd">
                <span class="falseHints" id="fh_passwd"></span>
              </div>
              <a class="get-pwd col-xs-3" href="http://service.mail.qq.com/cgi-bin/help?subtype=1&&id=28&&no=1001256" target="_blank">如何获取授权码？</a>
            </div>
            <!-- <div class="form-group">
              <label for="intranet" class="col-xs-3 control-label">加密方式</label>
              <div class="col-xs-8">
                <input type="text" v-model="ruleForm.codeType" class="form-control" id="codeType" disabled>
              </div>
            </div>
            <div class="form-group">
              <label for="intranet" class="col-xs-3 control-label">编码	</label>
              <div class="col-xs-8">
                <input type="text" class="form-control" value="UTF-8" disabled>
              </div>
            </div> -->
            <!-- <div class="form-group">
              <label for="intranet" class="col-xs-3 control-label">端口 </label>
              <div class="col-xs-8">
                <input type="text" class="form-control" v-model="ruleForm.port" validate="required" fh="fh_port">
                <span class="falseHints" id="fh_port"></span>
              </div>
            </div> -->
            <div class="form-group">
              <label for="intranet" class="col-xs-3 control-label">&nbsp;</label>
              <div class="col-xs-8">
                <btn class="" type="primary" @click="submit">保存</btn>
                <btn class="" @click="sendModal=true">发信</btn>
              </div>
            </div>
          </formData>
        </div>
      </div>
    </div>
    <modal v-model="sendModal" title="发送邮件" @hide="modalClose" ref="modal" id="send_modal" :footer="false" size="lg">
      <formData class="form-horizontal send-form" ref="sendForm">
        <div class="form-group">
          <label for="name" class="col-xs-3 control-label"> 收件人</label>
          <div class="col-xs-8">
            <input type="text" v-model="sendDatas.toUserMail" class="form-control" id="toUserMail" validate="required|email" fh="fh_toUserMail" placeholder="收件人账号">
            <span class="falseHints" id="fh_toUserMail"></span>
          </div>
        </div>
        <div class="form-group">
          <label for="name" class="col-xs-3 control-label"> 主题</label>
          <div class="col-xs-8">
            <input type="text" v-model="sendDatas.title" class="form-control" id="title" validate="required" fh="fh_title" placeholder="邮件主题">
            <span class="falseHints" id="fh_title"></span>
          </div>
        </div>
        <div class="form-group">
          <label for="telephone" class="col-xs-3 control-label">内容</label>
          <div class="col-xs-8">
            <editor v-model="sendDatas.content"></editor>
          </div>
        </div>
        <div class="form-group btn-groups">
          <btn class="" type="primary" @click="sendSubmit">发送</btn>
        </div>
      </formData>
    </modal>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import api from 'src/api'
  import formData from 'components/form/form.vue'
  import editor from 'components/editor/editor.vue'
  export default {
    name: 'department',
    title () {
      return '发信'
    },
    data () {
      return {
        ruleForm: {
          email: '',
          id: '',
          // username: '',
          // mailHost: '',
          passwd: ''
          // codeType: 'ttl'
          // port: ''
        },
        sendDatas: {
          toUserMail: '',
          title: '',
          content: ''
        },
        sendModal: false
      }
    },
    computed: {
      ...mapGetters({
        sendData: 'sendData'
      })
    },
    components: {formData, editor},
    created() {
      // 客户端
      console.log('客户端~~~~~~发信设置', this.sendData)
      this.ruleForm.email = this.sendData.email
      this.ruleForm.id = this.sendData.id
      // this.ruleForm.username = this.sendData.username
      // this.ruleForm.mailHost = this.sendData.mailHost
      this.ruleForm.passwd = this.sendData.passwd
      // this.ruleForm.codeType = this.sendData.codeType
      // this.ruleForm.port = this.sendData.port
    },
    mounted () {},
    asyncData ({store}) {
      return store.dispatch('isSend')
    },
    methods: {
      ...mapActions([
        'isSend'
      ]),
      submit () {
        /**
         * 验证
         */
        let fo = this.$refs.formSend.validate()
        if (!fo) {
          console.log('验证未通过')
          return false
        } else {
          this.doSubmit()
        }
      },
      doSubmit () {
        /**
         * 编辑提交
         */
        let vm = this
        api.post('/mail/updateSetting', vm.ruleForm).then((response) => {
          if (response.code === 200) {
            this.$notify({
              type: 'success',
              content: '编辑成功'
            })
            this.isSend()
          } else {
            this.$alert({
              content: response.message
            })
          }
        })
      },
      sendSubmit () {
        /**
         * 发送信息
         */
        let vm = this
        let form = vm.$refs.sendForm.validate()
        let fo = vm.$refs.formSend.validate()
        if (form && fo) {
          let param = {}
          param.byUserId = vm.sendData.id
          param.toUserMail = vm.sendDatas.toUserMail
          param.title = vm.sendDatas.title
          param.content = vm.sendDatas.content
          api.post('/mail/send', param).then((response) => {
            vm.modalClose()
            if (response.code === 200) {
              this.$notify({
                type: 'success',
                content: '发送成功'
              })
            } else {
              this.$notify({
                type: 'danger',
                content: response.message
              })
            }
          })
        } else {
          console.log('验证未通过')
          return false
        }
      },
      modalClose () {
        /**
         * 弹窗关闭
         */
        let vm = this
        vm.sendModal = false
        vm.sendDatas.toUserMail = ''
        vm.sendDatas.title = ''
        vm.sendDatas.content = ''
      }
    }
  }
</script>

<style lang="less">
.outer {
  padding:20px;
}
.company-inner {
  position: relative;
  max-width: 640px;
  margin: 0 auto;
  padding: 0;
  border: 1px solid #ddd;
  .company-info {
    overflow: hidden;
    padding:20px;
    .form-group {
      overflow: hidden;
    }
    .control-label {
      /*line-height: 34px;*/
      b {
        display: inline-block;
        width:100px;
      }
    }
    .get-pwd {
      line-height: 34px;
      margin-left: -15px;
    }
  }
}
.send-form {
  .control-label {
    /*line-height: 34px;*/
  }
}
.btn-groups {
  display: block!important;
  text-align: center;
}
</style>
