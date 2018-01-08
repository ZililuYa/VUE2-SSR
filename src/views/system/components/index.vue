<template>
  <div>
    <div class="featurebar">
      <ul class="ul">
        <li class="active"><a href="">未完成</a>
        </li>
        <li><a href="">所有</a>
        </li>
        <li><a href="">未开始</a>
        </li>
        <li><a href="">进行中</a>
        </li>
        <li><a href="">已挂起</a>
        </li>
        <li><a href="">已完成</a>
        </li>
      </ul>
    </div>
    <div class="main">
      <dataTable :tool="tool" :data="state.data" :currentPage="currentPage" @pageChange="tableChange" @change="tableChange" :totalPage="20" :columns="columns"></dataTable>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import dataTable from 'components/table/table.vue'

  export default {
    name: 'system',
    data () {
      return {
        currentPage: 2,
        tool: [{
          text: '删除',
          click: function (data) {
            console.log('要批量删除的数据', data)
          }
        }],
        columns: [{
          text: 'ID',
          type: 'selection',
          align: 'center'
        }, {
          text: '项目名称',
          key: 'name',
          align: 'center',
          width: 300
        }, {
          text: '项目代号',
          render: function (h, row) {
            console.log(row)
            return h('progress-bar', {
              props: {
                value: 20
              },
              style: {
                marginBottom: 0
              }
            })
          }
        }, {
          text: '项目负责人'
        }, {
          text: '结束日期'
        }, {
          text: '项目状态'
        }, {
          text: '总预计'
        }, {
          text: '总耗时'
        }, {
          text: '总剩余'
        }, {
          text: '进度'
        }, {
          text: '燃尽图'
        }]
      }
    },
    computed: {
      ...mapGetters({
        state: 'projectState'
      })
    },
    components: {dataTable},
    asyncData ({store}) {
      store.dispatch('isProjectState')
    },
    methods: {
      tableChange: function (data) {
        console.log(data)
      }
    }
  }
</script>

<style lang="less">
</style>
