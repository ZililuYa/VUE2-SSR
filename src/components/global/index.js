export default {
  init (vue) {
    this.Data()
    this.uuid(vue)
    this.publicData(vue)
  },
  Data () {
    /**
     * 全局化时间格式
     * */
    /* eslint-disable no-extend-native */
    Date.prototype.Format = function (fmt) {
      let o = {
        'M+': this.getMonth() + 1,
        'd+': this.getDate(),
        'h+': this.getHours(),
        'm+': this.getMinutes(),
        's+': this.getSeconds(),
        'q+': Math.floor((this.getMonth() + 3) / 3),
        'S': this.getMilliseconds()
      }
      if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
      for (let k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
      }
      return fmt
    }
  },
  uuid (vue) {
    /**
     * 全局化 UUID
     * */
    vue.prototype.$uuid = function () {
      function uu (c) {
        /* eslint-disable one-var */
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16)
      }

      return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, uu)
    }
  },
  publicData (vue) {
    /**
     * 全局化静态公开数据
     * */
    vue.prototype.$projectStatus = [
      {
        value: '',
        text: '所有'
      },
      {
        value: 1,
        text: '未开始'
      },
      {
        value: 2,
        text: '进行中'
      },
      {
        value: 3,
        text: '已挂起'
      },
      {
        value: 4,
        text: '已完成'
      },
      {
        value: 5,
        text: '已延期'
      }
    ]
    vue.prototype.$taskStatus = [
      {
        value: '',
        text: '所有'
      }, {
        value: 1,
        text: '未开始'
      }, {
        value: 2,
        text: '进行中'
      }, {
        value: 3,
        text: '已完成'
      }, {
        value: 4,
        text: '已挂起'
      }, {
        value: 5,
        text: '已取消'
      }, {
        value: 6,
        text: '已关闭'
      }]
  }
}
