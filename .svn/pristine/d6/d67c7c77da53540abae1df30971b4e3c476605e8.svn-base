<template>
  <div>
    <div class="featurebar">
      <ul class="ul">
        <li class="active"><a>{{giveForm.id ? '任务类型编辑' : '任务类型添加'}}</a></li>
      </ul>
      <div class="al-typeAdd al-oper">
        <a href="javascript:void(0)" @click="$router.push('/system/taskType')">返回列表</a>
      </div>
    </div>
    <div class="main">
      <div class="al-formbox">
        <formData ref="form" class="form-horizontal paddingRight al-addTask">
          <div class="form-group">
            <label class="col-xs-2" align="right">名 称</label>
            <div class="col-xs-10">
              <input type="text" v-model="form.name" class="form-control" placeholder="请输入任务名称" validate="required" fh="addtask_name">
            </div>
            <span class="falseHints" id="addtask_name"></span>
          </div>
          <div class="form-group">
            <label class="col-xs-2" align="right">属 性</label>
            <div class="col-xs-9">
              <input type="text" class="form-control" placeholder="请输入属性名称"
                v-model="form.attr"
                @keyup.enter="addOne">
            </div>
            <div class="col-xs-1 al-addbox">
              <btn type="primary" @click="addOne">+</btn>
            </div>
          </div>
          <div class="form-group" v-for="(item, index) in form.attributes">
            <label class="col-xs-2 al-ismust" align="right">
              {{item.emptyStatus == 1 ? '' : '*'}}
            </label>
            <div class="col-xs-7">
              <input type="text" v-model="item.name" class="form-control" disabled>
            </div>
            <div class="col-xs-2">
              <select class="form-control" placeholder="请选择任务类型" disabled
                v-model="item.type">
                <option v-for="obj in item.typeList" :value="obj.value">{{obj.text}}</option>
              </select>
            </div>
            <div class="col-xs-1 al-addbox">
              <a href="javascript:void(0)" @click="delOne(index)">
                <span class="glyphicon glyphicon-remove"></span>
              </a>
              <a href="javascript:void(0)" @click="editOne(item, index)">
                <span class="glyphicon glyphicon-pencil"></span>
              </a>
            </div>
            <div class="col-xs-12 al-type-vlue" v-if="item.defaultValues.length > 0">
              <div class="">{{item.defaultValues}}</div>
            </div>
          </div>
          <div class="form-group">
            <label class="col-xs-2"></label>
            <div class="col-xs-10">
              <btn @click="$router.push('/system/taskType')">取 消</btn>
              <btn type="primary" @click="validate">提 交</btn>
            </div>
          </div>
        </formData>
      </div>
    </div>
    <addAttrVal v-if="addModal" :giveAttr="giveAttr" @close-model="closeModel"></addAttrVal>
  </div>
</template>
<script>
  import api from 'src/api'
  import { mapGetters } from 'vuex'
  import formData from 'components/form/form.vue'
  import addAttrVal from '../components/addAttrVal.vue'
  export default {
    name: 'typeAdd',
    asyncData({ store, route }) {
      return store.dispatch('isSystemTaskTypeEdit', route)
    },
    computed: {
      ...mapGetters({
        giveForm: 'systemTaskTypeEdit'
      })
    },
    data () {
      return {
        addModal: false,         // -- 显示属性编辑
        giveIndex: 1,
        giveAttr: {},            // -- 编辑属性对象
        form: {
          id: '',
          name: '',              // -- 任务名称
          attr: '',
          attributes: []         // -- 任务属性
        },
        typeList: [{
          value: 1,
          text: '文 本'
        }, {
          value: 6,
          text: '图 片'
        }, {
          value: 3,
          text: '单 选'
        }, {
          value: 4,
          text: '多 选'
        }, {
          value: 5,
          text: '下拉选'
        }, {
          value: 2,
          text: '文本域'
        }]
      }
    },
    components: {formData, addAttrVal},
    created() {
      let vm = this
      if (vm.giveForm.id) {
        Object.assign(vm.form, vm.giveForm)
        vm.form.attributes = []
        setTimeout(function () {
          vm.form.attributes = vm.giveForm.attributes.map(function (org) {
            let some = {}
            Object.assign(some, org)
            return some
          })
          vm.form.attributes.forEach(function (obj) {
            obj.typeList = vm.typeList.map(function (item) {
              return item
            })
          })
        })
      }
      console.log(vm.form)
    },
    methods: {
      editOne (item, index) {
        /**
         * 属性编辑
         */
        let vm = this
        vm.giveAttr = item
        vm.giveIndex = index
        vm.addModal = true
      },
      closeModel (item) {
        /**
         * 属性编辑关闭
         */
        let vm = this
        vm.addModal = false
        if (item) {
          vm.form.attributes.forEach(function (some, index) {
            if (vm.giveIndex === index) Object.assign(some, item)
          })
        }
      },
      addOne () {
        /**
         * 属性添加
         */
        let vm = this
        let name = vm.form.attr.trim()
        if (!name.length) {
          vm.notify('warning', '请填写属性名称')
          return
        }
        let num = 0
        vm.form.attributes.forEach(function (item) {
          if (item.name === name) num++
        })
        if (num) {
          vm.notify('warning', '此属性名称已存在')
          return
        }
        let typeList = vm.typeList.map(function (item) {
          return item
        })
        let some = {name, type: 1, typeList, emptyStatus: 2, defaultValues: ''}
        vm.form.attributes.push(some)
        vm.form.attr = ''
      },
      delOne (index) {
        /**
         * 属性删除
         */
        this.form.attributes.splice(index, 1)
      },
      validate () {
        /**
         * 表单验证
         */
        let vm = this
        let fo = this.$refs.form.validate()
        if (!fo) return false
        if (!vm.form.attributes.length) {
          vm.notify('warning', '请添加至少一个属性')
          return
        }
        vm.doSubmit()
      },
      doSubmit () {
        /**
         * 提交添加
         */
        let vm = this
        let url = '/taskType/insert'
        let params = JSON.stringify(vm.form)
        let text = '添加'
        if (vm.giveForm.id) {
          text = '编辑'
          url = '/taskType/update'
          let some = {id: vm.giveForm.id}
          Object.assign(some, vm.form)
          params = JSON.stringify(some)
        }
        console.log(`👹任务${text}发送数据：`, JSON.parse(params))
        api.post(url, params).then((res) => {
          console.log(`👹任务${text}接收数据：`, res)
          if (res.code !== 200) {
            vm.notify('warning', res.message)
            return
          }
          this.$router.push('/system/taskType')
        }).catch((error) => {
          console.log(error)
        })
      },
      notify(type, content) {
        /**
         * 封装一个弹出消息
         * param {String} type 类型
         * param {String} content 内容
         */
        this.$notify({ type, content, dismissible: false, duration: 1000 })
      }
    }
  }
</script>
<style lang="less">
.al-typeAdd.al-oper {
  position: absolute;
  right: 15px;
  top: 0;
  height: 46px;
  line-height: 46px;
  a {
    display: inline-block;
  }
}
.al-formbox {
  width: 600px;
  margin: 0 auto;
}
.al-addTask {
  label {
    line-height: 34px
  }
  .form-group {
    .al-addbox {
      padding: 0;
      a {
        display: inline-block;
        height: 34px;
        line-height: 34px;
        margin-left: 2px;
      }
    }
    .al-type-vlue {
      padding-left: 100px;
      height: 34px;
      line-height: 34px;
      color: #337ab7;
    }
  }
  .col-xs-2 {
    padding-left: 0;
    &.al-ismust {
      margin: 0;
      color: #F56C6C
    }
  }
  .col-xs-6 {
    padding-left: 0
  }
  .col-xs-7 {
    padding-left: 0
  }
  .col-xs-9 {
    padding-left: 0
  }
  .col-xs-10 {
    padding-left: 0
  }
}
</style>
