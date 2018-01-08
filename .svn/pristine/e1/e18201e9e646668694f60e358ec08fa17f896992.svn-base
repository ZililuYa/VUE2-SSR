<template>
  <div class="">
    <div class="featurebar">
      <ul class="ul">
        <li>
          <span class="badge">{{data.code}}</span>
          <b>{{data.name}}</b>
        </li>
        <li class="fr">
          <router-link to="/project/index"><i class="glyphicon glyphicon-arrow-left"></i></router-link>
        </li>
      </ul>
    </div>
    <div class="main">
      <div class="row">
        <div class="col-sm-9">
          <fieldset class="fieldset">
            <legend>项目描述</legend>
            <div class="content" v-html="data.content"></div>
          </fieldset>
          <fieldset class="fieldset">
            <legend>历史记录</legend>
            <logData :data="data.logList"></logData>
          </fieldset>
          <div class="text-center tool-a">
            <a :class="data.status === 2 || data.status === 4 ? 'disabled' : ''" v-if="btnPower.includes('sys.project.start')" @click="startEvent">
              <i class="glyphicon glyphicon-play"></i> 开始
            </a>
            <a :class="data.status === 4 ? 'disabled' : ''" v-if="btnPower.includes('sys.project.finish')" @click="finishEvent">
              <i class="glyphicon glyphicon-ok-circle"></i> 完成
            </a>
            <a :class="data.status === 6 || data.status === 4 ? 'disabled' : ''" v-if="btnPower.includes('sys.project.stop')" @click="stopEvent">
              <i class="fa fa-anchor"></i> 挂起
            </a>
            <a v-if="btnPower.includes('sys.project.edit')" @click="toPath('/project/edit/'+$route.params.id)">
              <i class="glyphicon glyphicon-pencil"></i> 编辑
            </a>
            <a v-if="btnPower.includes('sys.project.del')" @click="delEvent">
              <i class="glyphicon glyphicon-remove"></i> 删除
            </a>
            <a @click="toPath('/project/index')">
              <i class="glyphicon glyphicon-arrow-left"></i> 返回
            </a>
          </div>
        </div>
        <div class="col-sm-3">
          <fieldset class="fieldset">
            <legend>基本信息</legend>
            <div class="content">
              <table class="table-content">
                <tbody>
                <tr>
                  <th>项目名称</th>
                  <td>{{data.name}}</td>
                </tr>
                <tr>
                  <th>项目代号</th>
                  <td>{{data.code}}</td>
                </tr>
                <tr>
                  <th>起止时间</th>
                  <td>{{new Date(data.startTime).Format('yyyy-MM-dd')}} ~ {{new Date(data.endTime).Format('yyyy-MM-dd')}}</td>
                </tr>
                <tr>
                  <th>可用工作日</th>
                  <td>{{data.workDay}}</td>
                </tr>
                <tr>
                  <th>项目类型</th>
                  <td>{{data.type}}</td>
                </tr>
                <tr>
                  <th>项目状态</th>
                  <td>
                    {{statusName}}
                  </td>
                </tr>
                <tr>
                  <th>项目负责人</th>
                  <td>{{data.chargeName}}</td>
                </tr>
                <!--<tr>-->
                <!--<th>访问控制</th>-->
                <!--<td>默认设置(有项目视图权限，即可访问)</td>-->
                <!--</tr>-->
                <!--<tr>-->
                <!--<th>分组白名单</th>-->
                <!--<td>-->
                <!--</td>-->
                <!--</tr>-->
                </tbody>
              </table>
            </div>
          </fieldset>
          <fieldset class="fieldset">
            <legend>其他信息</legend>
            <div class="content">
              <table class="table-content">
                <tbody>
                <tr>
                  <th class="w-80px">工时统计</th>
                  <td>
                    <!--可用工时<strong>1176.0</strong>工时<br>-->
                    总共预计<strong>{{data.totalPlan}}</strong>工时
                    <br> 已经消耗
                    <strong>{{data.totalUse}}</strong>工时
                    <br> 预计剩余
                    <strong>{{data.totalLeft}}</strong>工时
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import logData from 'components/history/logs.vue'
  import api from 'src/api'
  import { getUserPowerMenu, getPermission } from 'util/util'

  export default {
    components: {logData},
    data () {
      return {
        statusName: '',
        btnPower: []
      }
    },
    computed: {
      ...mapGetters({
        data: 'projectSurvey',
        userStatus: 'getUserStatus'
      })
    },
    mounted () {
      console.log(this.btnPower)
      for (let i of this.$projectStatus) {
        if (this.data.status === i.value) {
          this.statusName = i.text
          return
        }
      }
    },
    asyncData ({store, route}) {
      return store.dispatch('isProjectSurvey', route.params.id)
    },
    created () {
      // 获取用户权限菜单、按钮
      const status = this.userStatus
      const menus = getUserPowerMenu(status, this.$route.path, '/project/survey')
      this.btnPower = menus
      this.btnPower = getPermission(this.btnPower)
    },
    methods: {
      startEvent () {
        if (this.data.status === 2 || this.data.status === 4) return
        this.$confirm({
          title: '系统提示',
          content: '确定开始吗？'
        }).then(() => {
          api.post('/project/start', {id: this.data.id, name: this.data.name}).then((response) => {
            this.$notify(response.message)
          })
        }).catch(() => {
        })
      },
      finishEvent () {
        let row = this.data
        if (row.status === 4) return
        this.$confirm({
          title: '系统提示',
          content: '确定完成吗？'
        }).then(() => {
          api.post('/project/finish', {id: row.id, name: row.name}).then((response) => {
            this.$notify(response.message)
          })
        }).catch(() => {
        })
      },
      stopEvent () {
        let row = this.data
        if (row.status === 6 || row.status === 4) return
        this.$confirm({
          title: '系统提示',
          content: '确定挂起吗？'
        }).then(() => {
          api.post('/project/stop', {id: row.id, name: row.name}).then((response) => {
            this.$notify(response.message)
          })
        }).catch(() => {
        })
      },
      delEvent () {
        let row = this.data
        this.$confirm({
          title: '系统提示',
          content: '确定删除吗？'
        }).then(() => {
          api.post('/project/delete', {ids: row.id, name: row.name}).then((response) => {
            this.$notify(response.message)
            window.sessionStorage.removeItem('pid')
            window.sessionStorage.removeItem('pname')
            window.location.href = '/project/index'
          })
        }).catch(() => {
        })
      },
      toPath (url) {
        this.$router.push(url)
      },
      deletePro () {
        this.$confirm({
          title: '消息提示',
          okText: '确定',
          cancelText: '返回',
          content: '您确定要删除此项目吗'
        }).then(() => {
          api.post('/project/delete', {ids: this.data.id, name: this.data.name}).then((res) => {
            if (res.code !== 200) {
              this.notify('danger', res.message)
              return
            }
            console.log('👹项目删除返回数据：', res)
            this.$router.push(`/project/index`)
          }).catch((error) => {
            console.log(error)
          })
        }).catch(_ => {
        })
      },
      notify (type, content) {
        /**
         * 封装一个弹出消息
         * param {String} type 类型
         * param {String} content 内容
         */
        this.$notify({type, content, dismissible: false, duration: 1000})
      }
    }
  }

</script>
<style lang="less">
  .row-table {
    display: table;
    width: 100%;
  }

  .col-main,
  .col-side {
    display: table-cell;
  }

  .col-side {
    width: 350px;
    padding-left: 10px;
  }

  .col-main {
    padding-right: 10px;
  }

  .fieldset {
    margin-bottom: 15px;
    border: 1px solid #e5e5e5;
    padding: 10px 15px 15px;
    legend {
      width: auto;
      margin: 0 0 0 -5px;
      font-size: 13px;
      font-weight: bold;
      border-bottom: 0;
      padding: 0 5px;
    }
    .content {
      /*overflow: hidden;*/
      img {
        max-width: 100%;
      }
    }
  }

  .badge {
    border-radius: 0;
    margin-right: 5px;
    font-weight: normal;
    border: 1px solid #aaa;
    padding: 3px 8px;
    background: #fff;
    text-align: center;
    min-width: 20px;
    color: #666;
    font-size: 12px;
  }

  .table-content {
    td,
    th {
      padding: 3px 8px;
      font-size: 12px;
    }
    th {
      width: 80px;
      text-align: right;
    }
  }

  a:hover {
    text-decoration: none;
  }

  .tool-a a {
    cursor: pointer;
    margin: 0 5px;
    color: #333;
    &:hover {
      color: #1b6d85;
    }
    &.disabled {
      color: #ccc;
      cursor: not-allowed !important;
    }
  }

</style>
