<template>
  <div class="">
    <div class="featurebar">
      <ul class="ul">
        <li class="active">
          <a>团队成员</a>
        </li>
        <li class="pull-right">
          <a href="javascript:void(0)" @click="addModal=true"><i class="fa fa-plus"></i> 添加团队成员</a>
        </li>
      </ul>
    </div>
    <div class="main">
      <dataTable :data="state.data" :page="state.page" @pageChange="tableChange" :columns="columns"></dataTable>
    </div>
    <modal v-model="addModal" title="添加团队成员" @hide="modalClose" ref="modal" id="add_modal" :footer="false">
      <formData ref="form" class="form-horizontal">
        <div class="form-group">
          <label class="col-sm-2 control-label">成员列表</label>
          <div class="col-sm-10">
            <selectData v-model="item.memberId" :data="memberList" k="userId" v="name" :searchShow="true"></selectData>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label"></label>
          <div class="col-sm-5">
            <button type="button" class="btn btn-primary btn-sm" @click="submit">
              <template v-if="!loading">保存</template>
              <i v-if="loading" class="fa fa-refresh fa-spin"></i>
            </button>
          </div>
        </div>
      </formData>
    </modal>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import dataTable from 'components/table/table.vue'
  import formData from 'components/form/form.vue'
  import api from 'src/api'
  import { getUserPowerMenu, getPermission } from 'util/util'
  import selectData from 'components/form/select.vue'

  export default {
    components: {dataTable, formData, selectData},
    data () {
      return {
        search: false,
        loading: false,
        addModal: false,
        departData: {},
        depart: {},
        myId: '',
        item: {
          memberId: '',
          projectId: this.$route.params.id
        },
        addForm: {
          data: {},
          departName: '/',
          id: '',
          projectId: this.$route.params.id,
          roleName: '',
          hasTime: ''
        },
        tool: [],
        columns: [{
          type: 'selection'
        }, {
          text: '团队成员',
          key: 'memberName'
        }, {
          text: '职位',
          key: 'roleName'
        }, {
          text: '部门',
          key: 'departmentName'
        }, {
          text: '加盟日',
          key: 'createTime',
          render: function (h, row) {
            return h('span', {}, new Date(row.createTime).Format('yyyy-MM-dd'))
          }
        }, {
          text: '操作',
          width: 144,
          align: 'center',
          render: (h, row) => {
            console.log('id', this.myId, row.memberId)
            if (this.myId === row.memberId) return
            const arr = this.renderHtml(h, row)
            return h('div', arr)
//            return h('btn', {
//              attrs: {
//                size: 'xs',
//                type: 'danger'
//              },
//              on: {
//                click: () => {
//                  this.del(row.id)
//                }
//              }
//            }, '删除')
          }
        }],
        param: {
          pageSize: 20,
          pageIndex: 1,
          projectId: this.$route.params.id
        }
      }
    },
    computed: {
      ...mapGetters({
        state: 'projectTeamList',
        memberList: 'projectMember',
        userStatus: 'getUserStatus'
      })
    },
    created () {
      // 获取用户权限菜单、按钮
      const status = this.userStatus
      const menus = getUserPowerMenu(status, this.$route.path, '/project/team')
      this.menuPower = menus
      this.myId = this.userStatus.data.user.userId
      this.toolEvent()
    },
    mounted () {
      console.log('服务端接收到的数据：', this.userStatus)
//      this.myId = this.userStatus.data.user.userId
    },
    asyncData ({store, route}) {
      return Promise.all([store.dispatch('isProjectTeam', {projectId: route.params.id}), store.dispatch('isProjectMember')])
    },
    methods: {
      ...mapActions([
        'isProjectTeam',
        'doMember'
      ]),
      toolEvent () {
        let permission = getPermission(this.menuPower)
        console.log('当前权限组：', permission, this.menuPower)
        if (permission.includes('sys.team.del')) {
          this.tool.push({
            text: '删除',
            click: (data) => {
              console.log('要批量删除的数据', data)
            }
          })
        }
      },
      renderHtml (h, row) {
        console.log(' this.menuPower', this.menuPower)
        let arr = []
        let permission = getPermission(this.menuPower)
        if (permission.includes('sys.team.del')) {
          arr.push(h('tooltip', {
            attrs: {
              text: '删除'
            }
          }, [h('btn', {
            attrs: {
              size: 'xs'
            },
            on: {
              click: () => {
                this.deleteItem(row.id)
              }
            }
          }, '删除')]))
        }
        return arr
      },
      deleteItem (ids) {
        this.$confirm({
          title: '系统提示',
          content: '确定删除吗？'
        }).then(() => {
          api.post('/projectTeam/delete', {ids}).then((response) => {
            this.$notify(response.message)
            this.tableChange()
          })
        }).catch(() => {
        })
      },
      tableChange (data) {
        this.param.pageIndex = data
        this.isProjectTeam(this.param)
      },
      del (id) {
        console.log(id)
        this.$confirm({
          title: '提示',
          okText: '确定',
          cancelText: '取消',
          content: '确定要删除吗？'
        }).then(() => {
          api.post('/team/delete', {id}).then((response) => {
            if (response.code === 200) {
              this.isProjectTeam(this.param)
            } else {
              this.$notify(response.message)
            }
          })
        }).catch(() => {
        })
      },
      submit () {
        /**
         * 验证
         */
        if (!this.item.memberId) {
          console.log('验证未通过')
          return false
        } else {
          this.doSubmit()
        }
      },
      doSubmit () {
        /**
         * 编辑提交
         */
        console.log('添加成员')
        let vm = this
        api.post('/projectTeam/insert', this.item).then((response) => {
          if (response.code === 200) {
            vm.addModal = false
            vm.isProjectTeam({projectId: vm.$route.params.id})
            vm.cleanForm()
            this.$notify(response.message)
          } else {
            this.$notify(response.message)
          }
        })
      },
      cleanForm () {
        /**
         * 清空数据
         */
        this.addForm.data = {}
      },
      modalClose () {
        //
      }
    }
  }
</script>
<style lang="less">
  .li-search {
    padding-left: 15px;
  }

  .code-img {
    text-align: center;
  }
</style>
