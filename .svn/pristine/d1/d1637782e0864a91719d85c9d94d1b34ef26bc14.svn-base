<template>
  <modal v-model="open" :title="title" @hide="callback" ref="modal" id="modal-demo" size="lg" :backdrop="false">
    <formData ref="form" class="form-horizontal al-task-finish">
      <div class="form-group">
        <label class="col-sm-2 control-label">总消耗</label>
        <div class="col-sm-10">
          <div class="input-group ">
            <input type="text" class="form-control" v-model="item.useTime" validate="required|number">
            <label class="input-group-addon">小时</label>
          </div>
        </div>
      </div>
      <div class="form-group">
        <label class="col-sm-2 control-label">指派给</label>
        <div class="col-sm-10">
          <selectData  k="memberId" v="memberName" validate="required" fh="zpg_zpg"
            :data="typeList"
            v-model="item.memberId"
            :searchShow="true">
          </selectData>
          <span class="falseHints" id="zpg_zpg"></span>
        </div>
      </div>
      <div class="form-group">
        <label class="col-sm-2 control-label">完成时间</label>
        <div class="col-sm-10">
          <dateTime v-model="item.finishTime" validate="required"></dateTime>
        </div>
      </div>
      <div class="form-group" v-for="(x, t) in attributes">
        <label class="col-sm-2 control-label al-ismust">
            <span v-if="x.emptyStatus === 2">*</span>
            {{x.attributeName}}
        </label>
        <div class="col-sm-10 al-setNew" v-if="x.type == 1">
          <input type="text" class="form-control"
            v-model="x.value"/>
        </div>
        <div class="col-sm-10 al-setNew" v-if="x.type == 2">
          <textarea class="form-control" rows="3" cols="44"
            v-model="x.value">
          </textarea>
        </div>
        <div class="col-sm-10 al-setNew al-radio" v-if="x.type == 3">
          <label v-for="(some, index) in x.showValues" :for="some.value">
            <input type="radio" :name="x.name"
              :id="some.value"
              :value="some.value"
              v-model="x.value"/>
            <span>{{some.text}}</span>
          </label>
        </div>
        <div class="col-sm-10 al-setNew al-radio" v-if="x.type == 4">
          <label v-for="(some, index) in x.showValues" :for="some.value">
            <input type="checkbox"
              :id="some.value"
              :value="some.value"
              v-model="x.value"/>
            <span>{{some.text}}</span>
          </label>
        </div>
        <div class="col-sm-10 al-setNew" v-if="x.type == 5">
          <selectData :searchShow="false" k="value" v="text"
            :data="x.showValues"
            v-model="x.value">
          </selectData>
        </div>
        <div class="col-sm-8 al-setNew al-imgset" v-if="x.type == 6" style="margin: 0">
          <v-imgUp
            :dataSet="x.value"
            :options="options"
            @success="success">
          </v-imgUp>
        </div>
      </div>
      <div class="form-group">
        <label class="col-sm-2 control-label">备注</label>
        <div class="col-sm-10">
          <editor v-model="item.remark"></editor>
        </div>
      </div>
    </formData>
    <div slot="footer">
      <btn size="sm" @click="open=false">取消</btn>
      <btn size="sm" type="primary" @click="submit">
        <template v-if="!loading">确定完成</template>
        <i v-if="loading" class="fa fa-refresh fa-spin"></i>
      </btn>
    </div>
  </modal>
</template>
<script>
  import formData from 'components/form/form.vue'
  import api from 'src/api'
  // import cookies from 'js-cookie'
  import editor from 'components/editor/editor.vue'
  import selectData from 'components/form/select.vue'
  import dateTime from 'components/form/dateTime.vue'
  import vImgUp from 'components/avator/imgUp.vue'
  import taskType from './taskType.vue'

  export default {
    props: {
      value: Boolean,
      typeList: Array,
      data: Object
    },
    data () {
      return {
        open: false,
        item: {},
        attributes: [],
        options: {
          maxNum: 20,
          power: true
        },
        title: '',
        userId: '',
        loading: false
      }
    },
    components: {formData, editor, selectData, dateTime, taskType, vImgUp},
    created () {
      let vm = this
      let giveItem = JSON.stringify(vm.data)
      vm.giveItem = JSON.parse(giveItem)
      console.log('👹任务数据：', vm.giveItem)
      vm.title = vm.giveItem.name + ' > 完成'
      vm.attributes = vm.giveItem.values.map(function (item) {
        let some = {}
        Object.assign(some, item)
        if (some.type === 4 || some.type === 6) {
          some.value = some.value.split(',').map(function (val) {
            return val
          })
        }
        if (some.defaultValues.length > 0) {
          some.showValues = some.defaultValues.split(',').map(function (val) {
            return {text: val, value: val}
          })
        }
        return some
      })
      console.log('👹任务类型：', vm.giveItem)
    },
    mounted () {
      this.open = !!this.value
      // this.userId = cookies.getJSON('user_db').id
    },
    watch: {
      'value' (val, oldValue) {
        this.setNewValue(val)
      }
    },
    methods: {
      setNewValue (val) {
        this.item = {}
        this.title = this.data.name + ' > 完成'
        this.open = val
      },
      callback (hsg) {
        this.$emit('input', false)
      },
      success (arr) {
        console.log('👹图片地址：', arr)
        let vm = this
        vm.attributes.forEach(function (obj) {
          if (obj.type === 6) obj.value = arr.map(i => i)
        })
      },
      submit () {
        let vm = this
        let fo = vm.$refs.form.validate()
        if (!fo) return false
        vm.item.taskId = vm.data.id
        vm.item.name = vm.data.name
        // 设置value
        let str = JSON.stringify(vm.attributes)
        let outArr = JSON.parse(str)
        outArr.forEach(function (obj) {
          if (typeof obj.value === 'object') {
            let someStr = ''
            obj.value.forEach(function (org) {
              if (org.length) someStr = `${someStr}${org},`
            })
            obj.value = someStr.substring(0, someStr.length - 1)
          }
          delete obj.showValues
        })
        // 校验
        let num = 0
        outArr.forEach(function (obj) {
          let val = obj.value
          if (!val.length && obj.emptyStatus === 2 && num === 0) {
            num++
            vm.notify('warning', `${obj.attributeName}不能为空！`)
          }
        })
        if (num) return
        vm.item.values = outArr
        vm.item.id = vm.item.taskId
        vm.loading = true
        console.log('👹类型数组：', outArr)
        console.log('👹完成任务：', vm.item)
        api.post('/task/finish', JSON.stringify(vm.item)).then((response) => {
          vm.loading = false
          if (response.code === 200) {
            vm.$alert({
              title: '提示',
              okText: '确定',
              content: '完成成功'
            }).then(() => {
              vm.open = false
              vm.$emit('input', false)
              vm.$emit('success')
            })
          } else {
            vm.$notify(response.message)
          }
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
.al-task-finish {
  padding: 0px 180px;
  .form-group {
    label.col-sm-2.control-label.al-ismust {
      span {
        color: #F56C6C
      }
    }
  }
  .col-sm-10.al-setNew.al-radio {
    label {
      height: 34px;
      line-height: 34px;
      margin-bottom: 0;
      margin-right: 10px;
      cursor: pointer;
      input {
        cursor: pointer;
      }
    }
  }
}
</style>
