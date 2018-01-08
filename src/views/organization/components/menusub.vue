<template>
  <div class="">
    <nav id="nav" class="nav">
      <ul class="pull-left">
        <li><a href="">阿拉丁管控平台 <i class="glyphicon glyphicon-triangle-bottom"></i></a></li>
        <li><a href="/organization/index">用户</a></li>
        <li><a href="/organization/department">部门</a></li>
        <li><a href="/organization/power">权限</a></li>
        <li><a href="/organization/company">公司</a></li>
        <li><a href="/organization/log">动态</a></li>
      </ul>
      <div class="pull-right">
        <ul>
          <li><b><a href="javascript:void(0);" @click="inviteModal=true"> <span class="glyphicon glyphicon-user"></span> 邀请用户</a></b></li>
        </ul>
      </div>
    </nav>
    <modal v-model="inviteModal" title="邀请用户" @hide="" ref="modal" id="invite-modal">
      <invite></invite>
    </modal>
  </div>
</template>

<script>
  import invite from './invite.vue'
  export default {
    name: 'menusub',
    data () {
      return {
        inviteModal: false
      }
    },
    components: {
      invite
    }
  }
</script>

<style lang="less">
  .nav {
    background-color: #e5e5e5;
    margin: 0 -20px;
    padding: 0 20px;
    font-size: 14px;
    position: relative;
    height: 40px;
    padding-left: 0;
    ul {
      padding-left: 20px;
    }
  }

  .nav li {
    line-height: 30px;
    padding: 5px 0 1px;
    display: block;
    float: left;
    color: #808080;
    &.active {
      font-weight: bold;
    }
  }

  .nav a {
    display: block;
    padding: 0 7px;
    color: #1e232f;
    text-decoration: none;
    &:hover {
      background-color: #d1d1d1
    }
  }
</style>
