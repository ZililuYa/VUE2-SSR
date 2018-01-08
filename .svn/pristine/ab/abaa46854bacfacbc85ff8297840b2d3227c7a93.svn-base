<template>
  <div class="">
    <div class="featurebar">
      <ul class="ul">
        <li>
          <b>{{data.name}}</b>
        </li>
      </ul>
    </div>
    <div class="main al-taskEdit">
      <div class="row">
        <div class="col-sm-8">
          <fieldset class="fieldset">
            <legend>任务描述</legend>
            <editor v-model="item.content" class="content"></editor>
          </fieldset>
          <taskType :giveItem="item" @changed="changed"></taskType>
          <fieldset class="fieldset">
            <legend>历史记录</legend>
            <logData :data=" data.logList"></logData>
          </fieldset>
          <div class="text-center tool-a">
            <btn type="primary" size="sm" @click="submit">
              <template v-if="!loading">保存</template>
              <i v-if="loading" class="fa fa-refresh fa-spin"></i>
            </btn>
            <btn size="sm" @click="cancel">取消</btn>
          </div>
        </div>
        <div class="col-sm-4">
          <formData ref="form">
            <fieldset class="fieldset">
              <legend>基本信息</legend>
              <div class="content">
                <table class="table-content">
                  <tbody>
                    <tr>
                      <th>所属项目</th>
                      <td>{{data.projectName}}</td>
                    </tr>
                    <tr>
                      <th>任务名称</th>
                      <td class="input-group-sm">
                        <input v-model="item.name" class="form-control"></input>
                      </td>
                    </tr>
                    <tr>
                      <th>任务编号</th>
                      <td class="input-group-sm">
                        <input v-model="item.code" class="form-control" disabled></input>
                      </td>
                    </tr>
                    <tr>
                      <th>指派给</th>
                      <td>
                        <selectData :data="typeList" k="memberId" v="memberName" v-model="item.memberId" :searchShow="true"></selectData>
                      </td>
                    </tr>
                    <tr>
                      <th class="al-head">任务类型</th>
                      <td>{{data.typeName}}</td>
                    </tr>
                    <tr>
                      <th>任务状态</th>
                      <td>{{statusName}}</td>
                    </tr>
                    <tr>
                      <th>优先级</th>
                      <!--<td>{{data.priorityId}}</td>-->
                      <td class="input-group-sm">
                        <select v-model="item.priority" class="form-control">
                          <option v-for="i in [1,2,3]" :value="i">{{i}}</option>
                        </select>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </fieldset>
            <fieldset class="fieldset">
              <legend>工时信息</legend>
              <div class="content">
                <table class="table-content">
                  <tbody>
                    <tr>
                      <th>预计开始</th>
                      <td>
                        <dateTime size="sm" v-model="item.createTime"></dateTime>
                      </td>
                    </tr>
                    <tr>
                      <th>实际开始</th>
                      <td>
                        <dateTime size="sm" v-model="item.startTime"></dateTime>
                      </td>
                    </tr>
                    <tr>
                      <th>截止日期</th>
                      <td>
                        <dateTime size="sm" v-model="item.endTime"></dateTime>
                      </td>
                    </tr>
                    <tr>
                      <th>最初预计</th>
                      <td>
                        <div class="input-group input-group-sm input-group-up">
                          <input type="text" class="form-control" v-model="item.planTime" validate="required|number" fh="workDay">
                          <label class="input-group-addon">小时</label>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th>总消耗</th>
                      <td>
                        <div class="input-group input-group-sm input-group-up">
                          <input type="text" class="form-control" v-model="item.useTime" validate="required|number" fh="workDay">
                          <label class="input-group-addon">小时</label>
                        </div>
                      </td>
                    </tr>
                    <!--<tr>-->
                    <!--<th>预计剩余</th>-->
                    <!--<td>-->
                    <!--<div class="input-group input-group-sm input-group-up">-->
                    <!--<input type="text" class="form-control" v-model="item.leftTime" validate="required|number" fh="workDay">-->
                    <!--<label class="input-group-addon">小时</label>-->
                    <!--</div>-->
                    <!--</td>-->
                    <!--</tr>-->
                  </tbody>
                </table>
              </div>
            </fieldset>
            <fieldset class="fieldset">
              <legend>任务的一生</legend>
              <div class="content">
                <table class="table-content">
                  <tbody>
                    <tr>
                      <th>由谁创建</th>
                      <td>{{data.createMemberName}}</td>
                    </tr>
                    <tr>
                      <th>由谁完成</th>
                      <td>{{data.finishName}}</td>
                    </tr>
                    <tr>
                      <th>最后编辑</th>
                      <td>{{new Date(data.updateTime).Format('yyyy-MM-dd')}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </fieldset>
          </formData>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import logData from 'components/history/logs.vue'
import selectData from 'components/form/select.vue'
import formData from 'components/form/form.vue'
import dateTime from 'components/form/dateTime.vue'
import taskType from './taskType.vue'
import api from 'src/api'
import editor from 'components/editor/editor.vue'
export default {
  asyncData({ store, route }) {
    let arr = route.params.id.split('-')
    return Promise.all([store.dispatch('isProjectTaskDetails', arr[1]), store.dispatch('isProjectTaskMan', { projectId: arr[0] })])
  },
  data() {
    return {
      statusName: '',
      loading: false,
      item: {}
    }
  },
  computed: {
    ...mapGetters({
      data: 'projectTaskDetail',
      typeList: 'projectTaskMan'
    })
  },
  components: { logData, editor, selectData, formData, dateTime, taskType },
  created() {
    console.log('👹任务编辑页面数据：', this.typeList)
    console.log('👹任务编辑页面数据：', this.data)
    let item = JSON.stringify(this.data)
    this.item = JSON.parse(item)
    for (let i of this.$taskStatus) {
      if (i.value === this.data.status) {
        this.statusName = i.text
      }
    }
  },
  methods: {
    submit() {
      let fo = this.$refs.form.validate()
      if (!fo) return false
      delete this.item.logList
      this.loading = true
      api.post('/task/update', JSON.stringify(this.item)).then((response) => {
        this.loading = false
        if (response.code === 200) {
          this.$alert({
            title: '提示',
            okText: '确定',
            content: '修改成功'
          }).then(() => {
            this.cancel()
          })
        } else {
          this.$notify(response.message)
        }
      })
    },
    cancel () {
      this.$router.go(-1)
    },
    changed (values) {
      this.item.values = values.map(i => i)
      console.log(this.item)
    }
  }
}
</script>

<style lang="less">
</style>
