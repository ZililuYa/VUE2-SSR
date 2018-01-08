<template>
  <div class="content" ref="form">
    <template v-for="(i, x) in data">
      <div>
        <p>{{x + 1}}、 {{i.content}} <a href="javascript:;" v-if="i.children.length"><i @click="open" :data-id="'log'+x" class="fa fa-plus-square"></i></a></p>
        <div class="children-log" v-if="i.children.length" :id="'log'+x">
          <p v-for="(t, y) in i.children">{{y + 1}}、 {{t.content}}</p>
        </div>
        <div v-if="i.remark" class="children-rem" v-html="i.remark"></div>
      </div>
    </template>
  </div>
</template>
<script>
  /**
   * 全局历史记录
   * */
  export default {
    data () {
      return {}
    },
    components: {},
    mounted () {
    },
    props: {
      data: Array
    },
    methods: {
      open (e) {
        let id = e.target.getAttribute('data-id')
        var className = document.getElementById(id).className
        if (className === 'children-log') {
          e.target.className = 'fa fa-minus-square'
          document.getElementById(id).className = 'children-log active'
        } else {
          e.target.className = 'fa fa-plus-square'
          document.getElementById(id).className = 'children-log'
        }
      }
    }
  }
</script>

<style>
  .children-log {
    display: none;
    color: #070707;
    background-color: #f1f1f1;
    padding: 10px 10px 1px 25px;
    margin-bottom: 10px;
  }

  .children-rem {
    color: #070707;
    background-color: #f1f1f1;
    padding: 10px 10px 10px 25px;
    margin-bottom: 10px;
  }

  .children-log.active {
    display: block !important;
  }
</style>
