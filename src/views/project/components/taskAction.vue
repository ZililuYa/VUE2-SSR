<template>
  <modal v-model="open" :title="title" @hide="callback" ref="modal" id="modal-demo" size="lg" :backdrop="false">
    <formData ref="form" class="form-horizontal">
      <div class="form-group">
        <label class="col-sm-2 control-label">实际开始</label>
        <div class="col-sm-10">
          <dateTime v-model="item.startTime"></dateTime>
        </div>
      </div>
      <div class="form-group">
        <label class="col-sm-2 control-label">预计用时</label>
        <div class="col-sm-10">
          <div class="input-group ">
            <input type="text" class="form-control" v-model="item.planTime" validate="required|number">
            <label class="input-group-addon">小时</label>
          </div>
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
        <template v-if="!loading">确定开始</template>
        <i v-if="loading" class="fa fa-refresh fa-spin"></i>
      </btn>
    </div>
  </modal>
</template>
<script>
  import formData from 'components/form/form.vue'
  import editor from 'components/editor/editor.vue'
  import dateTime from 'components/form/dateTime.vue'
  import api from 'src/api'

  export default {
    data () {
      return {
        open: false,
        item: {},
        title: '',
        loading: false
      }
    },
    components: {formData, editor, dateTime},
    mounted () {
      this.open = !!this.value
    },
    watch: {
      'value' (val, oldValue) {
        this.setNewValue(val)
      }
    },
    props: {
      value: Boolean,
      data: Object
    },
    methods: {
      setNewValue (val) {
        this.item = {}
        this.title = this.data.name + ' > 开始'
        this.open = val
      },
      callback (hsg) {
        this.$emit('input', false)
      },
      submit () {
        let fo = this.$refs.form.validate()
        if (!fo) return false
        this.item.taskId = this.data.id
        this.loading = true
        this.item.name = this.data.name
        api.post('/task/start', this.item).then((response) => {
          this.loading = false
          if (response.code === 200) {
            this.$alert({
              title: '提示',
              okText: '确定',
              content: '开始成功'
            }).then(() => {
              this.open = false
              this.$emit('input', false)
              this.$emit('success')
            })
          } else {
            this.$notify(response.message)
          }
        })
      }
    }
  }
</script>
