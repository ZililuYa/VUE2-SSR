<template>
  <div>
    <!-- <div class="featurebar">
      <ul class="ul">
        <li class="active"><a href="javascript:;">所有</a></li>
      </ul>
    </div> -->
    <div class="search-main">
      <form class="form-inline">
        <date-time-picker v-model="param.beginTime" placeholder="开始时间"></date-time-picker>
        <date-time-picker v-model="param.endTime" placeholder="结束时间"></date-time-picker>
        <btn type="primary" @click="isLog(param)">搜索</btn>
      </form>
    </div>
    <div class="main">
      <dataTable ref="table" :tool="tool" :data="logList.data" :page="logList.page" @pageChange="tableChange" :columns="columns"></dataTable>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import dataTable from 'components/table/table.vue'
import dateTimePicker from 'components/form/dateTime.vue'

export default {
  name: 'log',
  title() {
    return '动态'
  },
  data() {
    return {
      param: {
        beginTime: '',
        endTime: '',
        pageSize: 20,
        pageIndex: 1
      },
      tool: [],
      columns: [{
        text: '日期',
        key: 'createTime',
        align: 'center',
        width: 150,
        render: (h, params) => {
          return h('span', {}, new Date(params.createTime).Format('yyyy-MM-dd hh:mm:ss'))
        }
      }, {
        text: '操作者',
        key: 'memberName'
      }, {
        text: '动作',
        key: 'action'
      }, {
        text: '对象类型',
        key: 'type',
        render: (h, row) => {
          if (row.type === 1) {
            return '项目'
          } else if (row.type === 2) {
            return '任务'
          } else {
            return '用户'
          }
        }
      }, {
        text: 'ID',
        key: 'id',
        width: 100
      }, {
        text: '对象名称',
        render: (h, row) => {
          if (row.type === 1 && row.targetId) {
            return h('router-link', {
              attrs: {
                to: '/project/survey/' + row.targetId
              }
            }, row.targetName)
          } else if (row.type === 2 && row.targetId) {
            return h('router-link', {
              attrs: {
                to: '/project/taskDetails/' + row.taskProjectId + '-' + row.targetId
              }
            }, row.targetName)
          } else {
            return row.action + '系统'
          }
        }
      }]
    }
  },
  computed: {
    ...mapGetters({
      logList: 'logList'
    })
  },
  components: { dataTable, dateTimePicker },
  asyncData({ store }) {
    return store.dispatch('isLog', {pageSize: 20})
  },
  mounted() {
    console.log('isLog', this.logList)
  },
  methods: {
    ...mapActions([
      'isLog'
    ]),
    tableChange: function(data) {
      this.$refs.table.loading = true
      if (data) this.param.pageIndex = data
      this.isLog(this.param)
    }
  }
}

</script>
<style lang="less">


</style>
