<template>
  <modal :title="giveForm.name.length > 0 ? '编辑任务' : '添加任务'" v-model="show" @hide="$emit('close-model')" :footer="false">
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
        <label class="col-xs-2" align="right"></label>
        <div class="col-xs-2">
          <select class="form-control" placeholder="请选择任务类型" validate="required"
            v-model="item.type">
            <option v-for="obj in item.typeList" :value="obj.value">{{obj.text}}</option>
          </select>
        </div>
        <div class="col-xs-7">
          <input type="text" v-model="item.name" class="form-control" disabled>
        </div>
        <div class="col-xs-1 al-addbox">
          <a href="javascript:void(0)" @click="delOne(index)">
            <span class="glyphicon glyphicon-remove"></span>
          </a>
          <a href="javascript:void(0)" v-if="item.type > 2">
            <span class="glyphicon glyphicon-pencil"></span>
          </a>
        </div>
        <div class="col-xs-12 al-type-vlue" v-if="item.values.length > 0">
          <div class="">2222222222222</div>
        </div>
      </div>
      <div class="form-group">
        <label class="col-xs-2"></label>
        <div class="col-xs-10">
          <btn type="primary" @click="validate">提 交</btn>
        </div>
      </div>
    </formData>
  </modal>
</template>
<script>
  import api from 'src/api'
  import formData from 'components/form/form.vue'
  export default {
    name: 'addTask',
    props: {
      giveForm: {
        type: Object
      }
    },
    data () {
      return {
        show: true,
        form: {
          name: '',              // -- 任务名称
          attr: '',
          attributes: []         // -- 任务属性
        },
        typeList: [{
          value: 1,
          text: '文 本'
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
    components: {formData},
    created() {
      let vm = this
      if (vm.giveForm.name.length) Object.assign(vm.form, vm.giveForm)
    },
    methods: {
      addOne () {
        /**
         * 属性添加
         */
        let vm = this
        let name = vm.form.attr
        if (!name.length) {
          vm.notify('danger', '请填写属性名称')
          return
        }
        let num = 0
        vm.form.attributes.forEach(function (item) {
          if (item.name === name) num++
        })
        if (num) {
          vm.notify('danger', '此属性名称已存在')
          return
        }
        let typeList = vm.typeList.map(function (item) {
          return item
        })
        let some = {name, type: 1, typeList, values: ''}
        vm.form.attributes.unshift(some)
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
          vm.notify('danger', '请添加至少一个属性名称')
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
        if (vm.giveForm.name.length) {
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
            vm.notify('danger', res.message)
            return
          }
          vm.$emit('close-model', 1)
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
.paddingRight {
  padding-right: 50px !important
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
      padding-left: 182px;
      height: 34px;
      line-height: 34px;
      color: #337ab7;
    }
  }
  .col-xs-2 {
    padding-left: 0
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
