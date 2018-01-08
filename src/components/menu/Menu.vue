<template>
  <nav id="menu" class="menu">
    <ul>
      <li v-for="item in menus">
        <a @click="toPath(item)" :class="styleClass(item)">{{item.name}}</a>
      </li>
    </ul>
  </nav>
</template>
<script>
export default {
  name: 'Menu',
  data() {
    return {}
  },
  props: {
    menus: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    toPath(item) {
      // console.log(item)
      let url = this.isPower(item).url
      url = url === '/project/survey' ? '/project/index' : url
      this.$router.replace({ path: url })
      // if (item.url.includes('/project')) {
      //   this.$router.replace({ path: item.url })
      // } else {
      //   this.$router.replace({ path: this.isPower(item).url })
      // }
    },
    isPower(item) {
      let obj
      if (item.child.length) {
        for (let k of item.child) {
          if (k.url === item.url) {
            obj = k
          } else {
            obj = item.child[0]
          }
        }
      } else {
        this.$alert({
          title: '提示',
          okText: '确定',
          content: '您没有权限进入该选项'
        }).then(() => {})
        return false
      }
      return obj
    },
    styleClass(param) {
      const path = this.$route.path
      return {
        on: path.includes(param.path)
      }
    }
  }
}

</script>

<style lang="stylus">
.menu
  margin-top: 12px;
  position: relative;
  widht: 100%;
  overflow: hidden
.menu li
  float: left;
  padding: 0;
  margin: 0;
  position: relative;
  display: block;
.menu a
  display: block;
  cursor: pointer;
  margin-right: 3px;
  white-space: nowrap;
  padding: 7px 15px;
  color: #e5e5e5;
  font-size: 14px;
  background: #323b4e;
  -webkit-box-shadow: 0 -3px 3px rgba(0,0,0,0.10);
  box-shadow: 0 -3px 3px rgba(0,0,0,0.10);
  text-decoration: none
.menu a:hover
  background: #3b465e
.menu a.active, .menu a.on
  background-color: #e5e5e5;
  color: #444
</style>
