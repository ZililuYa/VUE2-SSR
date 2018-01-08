<template>
  <fieldset class="fieldset">
    <legend>{{item.typeName}}</legend>
    <div class="al-taskType">
      <formData ref="form" class="form-horizontal">
        <div class="form-group" v-for="(x, t) in attributes">
          <label class="col-sm-2 control-label">{{x.attributeName}}</label>
          <div class="col-sm-5 al-setNew" v-if="x.type == 1">
            <input type="text" class="form-control" validate="required" :disabled="!power"
              v-model="x.value"
              @change="itemOut">
          </div>
          <div class="col-sm-5 al-setNew" v-if="x.type == 2">
            <textarea class="form-control" rows="3" cols="44" validate="required" :disabled="!power"
              v-model="x.value"
              @change="itemOut">
            </textarea>
          </div>
          <div class="col-sm-5 al-setNew al-radio" v-if="x.type == 3">
            <label v-for="(some, index) in x.showValues" :for="some.value">
              <input type="radio" :name="x.name" :disabled="!power"
                :id="some.value"
                :value="some.value"
                v-model="x.value"
                @change="itemOut"/>
              <span>{{some.text}}</span>
            </label>
          </div>
          <div class="col-sm-5 al-setNew al-radio" v-if="x.type == 4">
            <label v-for="(some, index) in x.showValues" :for="some.value">
              <input type="checkbox" :disabled="!power"
                :id="some.value"
                :value="some.value"
                v-model="x.value"
                @change="itemOut"/>
              <span>{{some.text}}</span>
            </label>
          </div>
          <div class="col-sm-5 al-setNew" v-if="x.type == 5">
            <selectData :searchShow="false" k="value" v="text" :disabled="!power"
              :data="x.showValues"
              v-model="x.value"
              @change="itemOut">
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
      </formData>
    </div>
  </fieldset>
</template>
<script>
import { mapGetters } from 'vuex'
import formData from 'components/form/form.vue'
import selectData from 'components/form/select.vue'
import vImgUp from 'components/avator/imgUp.vue'
export default {
  name: 'taskTypeEditCom',
  props: {
    giveItem: {
      type: Object
    },
    hasPower: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      item: {},
      attributes: [],
      options: {       // 图片组件配置
        maxNum: 20,
        power: true
      },
      power: false
    }
  },
  computed: {
    ...mapGetters({
      taskTypeList: 'systemTaskTypeList'
    })
  },
  components: { formData, selectData, vImgUp },
  created() {
    let vm = this
    Object.assign(vm.item, vm.giveItem)
    vm.power = vm.hasPower
    vm.options.power = vm.hasPower
    console.log('👹任务数据：', vm.giveItem)
    vm.getTypeInfo()
  },
  methods: {
    getTypeInfo () {
      let vm = this
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
    },
    itemOut () {
      let vm = this
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
      vm.$emit('changed', outArr)
    },
    success (arr) {
      console.log('👹图片地址：', arr)
      let vm = this
      vm.attributes.forEach(function (obj) {
        if (obj.type === 6) obj.value = arr.map(i => i)
      })
      vm.itemOut()
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
.al-taskType {
  padding-left: 15px;
  .form-group {
    margin-bottom: 12px;
  }
  label.col-sm-2 {
    font-size: 12px;
  }
  .al-setNew.al-radio {
    font-size: 12px;
    padding-top: 7px;
    label {
      margin: 0 10px 0 0;
      cursor: pointer;
      input {
        cursor: pointer;
      }
      span {
        position: relative;
        top: -2px;
      }
    }
  }
  .al-setNew.al-imgset {}
  .col-sm-2.control-label {
    font-size: 12px;
    width: 82px;
    text-align: left;
    word-break: break-all;
  }
  .col-sm-5 {
    padding-left: 0
  }
  .col-sm-8 {
    padding-left: 0
  }
}
</style>
