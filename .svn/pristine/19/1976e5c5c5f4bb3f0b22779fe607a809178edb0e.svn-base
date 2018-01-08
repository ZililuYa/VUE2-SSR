<template>
  <div>
    <div class="featurebar">
      <ul class="ul">
        <li class="active"><a href="">任务配置</a>
        </li>
      </ul>
    </div>
    <div class="custon-main">
      <div class="col-lg-2">
        <left-side :active="status"></left-side>
      </div>
      <div class="col-lg-10">
        <div class="panel panel-default">
          <div class="panel-heading">任务 >> 状态</div>
          <div class="panel-body">
            <table class="table table-borderless active-disabled table-condensed table-600">
              <tbody>
                <tr class="table-center">
                  <th class="th-key">键</th>
                  <th class="th-value">值</th>
                  <th class="th-actions"></th>
                </tr>
                <tr class="text-center">
                  <td>
                    <span>NULL</span><input type="hidden" name="keys[]" id="keys" value="0">
                  </td>
                  <td>
                    <input type="text" name="values" id="values" value="" class="form-control">
                  </td>
                </tr>
                <tr class="text-center">
                  <td>
                    <span>done</span><input type="hidden" name="keys[]" id="keys" value="0">
                  </td>
                  <td>
                    <input type="text" name="values" id="values" value="" class="form-control">
                  </td>
                </tr>
                <tr class="text-center">
                  <td>
                    <span>cancel</span><input type="hidden" name="keys[]" id="keys" value="0">
                  </td>
                  <td>
                    <input type="text" name="values" id="values" value="" class="form-control">
                  </td>
                </tr>
                <tr>
                  <td colspan="2" class="text-center">
                    <!-- <label class="radio-inline">
                      <input type="radio" name="lang" value="zh-cn" checked="checked" id="langzh-cn"> 适用当前语言
                    </label>
                    <label class="radio-inline">
                      <input type="radio" name="lang" value="all" id="langall"> 适用所有语言
                    </label> -->
                    <button type="submit" id="submit" class="btn btn-primary">保存</button>
                    <button type="button" class="btn btn-default" onclick="">恢复默认</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import leftSide from '../components/leftSide.vue'
  import customMain from '../components/customMain.vue'
  export default {
    name: 'system',
    data () {
      return {
        status: 'status'
      }
    },
    computed: {
      ...mapGetters({
        state: 'projectState'
      })
    },
    components: {leftSide, customMain},
    asyncData ({store}) {
      store.dispatch('isProjectState')
    },
    methods: {
    }
  }
</script>

<style lang="less">
</style>
