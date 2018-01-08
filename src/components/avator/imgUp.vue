<template>
  <div class="al-imgup-box">
    <div :class="item.url.length > 0 ? 'al-imgup al-had' : 'al-imgup'"
      v-show="!(!optiNow.power && !item.url.length)"
      v-for="(item, index) in dataNow">
      <div class="al-ab al-bottom" @click="chose(item)">+</div>
      <div class="al-ab al-img" v-if="item.url.length > 0">
        <img :src="item.url" alt="">
      </div>
      <div class="al-ab al-oper" v-if="item.url.length > 0 && optiNow.power">
        <div class="al-oper-box" @click="chose(item)">
          <i class="fa fa-photo"></i>
        </div>
        <div class="al-oper-box" @click="shiftThis(index)">
          <i class="fa fa-close"></i>
        </div>
      </div>
      <div class="al-ab al-laod" v-if="item.showLoad">
        <i class="fa fa-spinner fa-pulse"></i>
      </div>
    </div>
    <input type="file" style="display:none" v-if="hasInput"
      :ref="inputRef"
      @change="chosed">
  </div>
</template>
<script>
export default {
  name: 'imgUp',
  props: {
    dataSet: {                             // -- 数据
      type: Array,
      default: () => []
    },
    options: {                             // -- 设置
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      dataNow: [{                           // -- 默认数据
        url: '',
        showLoad: false
      }],
      optiNow: {                            // -- 默认设置
        maxNum: 1,                          // -- 最大数量
        size: 50,                           // -- 最大内存 单位 M
        accept: ['png', 'jpg', 'jpeg'],     // -- 类型
        power: true                         // -- 操作权限
      },
      inputRef: 'imgup_input',
      itemNow: {},
      hasInput: true
    }
  },
  created() {
    this.init()
  },
  methods: {
    init () {
      /**
       * 初始化
       */
      let vm = this
      Object.assign(vm.optiNow, vm.options)
      vm.dataSet.forEach(function (url, index) {
        if (url && url.length && index + 1 <= vm.optiNow.maxNum) {
          let some = {url, showLoad: false}
          vm.dataNow.unshift(some)
        }
      })
      if (vm.dataNow.length > vm.optiNow.maxNum) {
        vm.dataNow.splice(vm.dataNow.length - 1, 1)
      }
    },
    success () {
      /**
       * 成功回调
       */
      let vm = this
      let outArr = []
      vm.dataNow.forEach(function (obj) {
        let url = obj.url
        if (url && url.length > 0) outArr.push(url)
      })
      vm.$emit('success', outArr)
    },
    shiftThis (index) {
      /**
       * 删除
       */
      let vm = this
      vm.dataNow.splice(index, 1)
      setTimeout(function () {
        let num = 0
        vm.dataNow.forEach(function (obj) {
          if (!obj.url.length) num++
        })
        if (!num) vm.dataNow.push({ url: '', showLoad: false })
        vm.success()
      }, 10)
    },
    chose (item) {
      /**
       * 选择文件
       */
      let vm = this
      if (vm.itemNow.showLoad) {
        vm.notify('warning', `当前正有图片上传，请稍后.`)
        return
      }
      vm.itemNow = item
      vm.$refs[vm.inputRef].click()
    },
    chosed () {
      /**
       * 确认文件
       */
      let vm = this
      // 检验文件
      let file = vm.$refs[vm.inputRef].files[0]
      if (!file) return
      // 检验大小
      let size = (file.size / 1024 / 1024).toFixed(3)
      console.log('👹图片大小：', size)
      if (size > vm.optiNow.size) {
        vm.notify('warning', `图片大小不得超过${vm.optiNow.size}M`)
        return
      }
      // 检验格式
      let name = file.name
      let type = name.split('.')
      type = type[type.length - 1].toLowerCase()
      console.log('👹文件类型：', type)
      let exit = 0
      vm.optiNow.accept.forEach(function (checkStr) {
        if (checkStr === type) exit++
      })
      if (!exit) {
        vm.notify('warning', `请选择规定文件类型`)
        return
      }
      // 开始上传
      vm.itemNow.showLoad = true
      vm.uploadImg('/api/v1/upload/fileImage', file).then((res) => {
        console.log('👹成功返回：', res)
        // 地址设置
        res = JSON.parse(res)
        vm.itemNow.url = res.url
        // 添加空壳
        let num = 0
        vm.dataNow.forEach(function (obj) {
          if (!obj.url.length) num++
        })
        if (!num && vm.dataNow.length < vm.optiNow.maxNum) {
          vm.dataNow.push({url: '', showLoad: false})
        }
        // 成功回掉
        vm.success()
        // 关闭loading
        vm.hasInput = false
        setTimeout(function () {
          vm.hasInput = true
          vm.itemNow.showLoad = false
        }, 600)
      }).catch((xhr) => {
        console.log('👹报错信息：', xhr)
      })
    },
    uploadImg (url, fileImg) {
      /**
       * 图片上传函数
       */
      return new Promise(function (resolve, reject) {
        let formData = new window.FormData()
        formData.append('imgFile', fileImg)

        var xhr = new window.XMLHttpRequest()
        xhr.open('post', url, true)
        // xhr.setRequestHeader('token', artToken)
        xhr.send(formData)
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) resolve(xhr.responseText)
            else reject(xhr)
          }
        }
      })
    },
    notify(type, content) {
      this.$notify({ type, content, dismissible: false, duration: 1000 })
    }
  }
}
</script>
<style lang="less">
@WIT: 90px;
@COL: #AAA;
@BUL: #337ab7;
.al-imgup-box {
  min-height: 100px;
}
.al-imgup {
  position: relative;
  display: inline-block;
  width: @WIT;
  height: @WIT;
  border-radius: 2px;
  border: 1px dashed @COL;
  margin-right: 10px;
  &.al-had {
    border: 1px dashed #fff;
  }
  .al-ab {
    position: absolute;
    width: 100%;
    height: 100%;
    text-align: center;
    cursor: pointer;
  }
  .al-bottom {
    z-index: 0;
    font-size: 20px;
    color: @COL;
    font-size: 30px;
    padding-top: 22px;
  }
  .al-img {
    z-index: 1;
    img {
      display: inline-block;
      width: 100%;
      height: 100%;
      border-radius: 2px;
    }
  }
  .al-oper {
    z-index: 2;
    font-size: 0px;
    transition: 0.4s;
    &:hover {
      background: rgba(0, 0, 0, 0.6);
      .al-oper-box {
        opacity: 1;
      }
    }
    .al-oper-box {
      opacity: 0;
      display: inline-block;
      width: 50%;
      height: 100%;
      line-height: @WIT;
      color: #fff;
      font-size: 15px;
      transition: 0.2s;
      &:hover {
        color: @BUL;
      }
    }
  }
  .al-laod {
    z-index: 3;
    font-size: 16px;
    color: #fff;
    line-height: @WIT;
    background-color: #fff;
    color: @BUL;
  }
}
</style>
