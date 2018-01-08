<template>
  <nav id="nav" class="nav">
    <ul class="fl" id="submenu">
      <li v-for="(item, index) in menu" :class="styleClass(item, index)">
        <a href="javascript:;" @click="push(item, index)">
          <i v-if="item.align !== 'right' && item.icon" :class="'fa fa-'+item.icon"></i>
          {{item.name || item.text}}
          <i v-if="item.align === 'right' && item.icon" :class="'fa fa-'+item.icon"></i>
        </a>
      </li>
    </ul>
    <div class="fr" v-show="index == 0">
      <ul>
        <li v-for="item in menuRight">
          <strong>
            <a href="javascript:;" @click="push(item)">
              <i v-if="item.align !== 'right' && item.icon" :class="'fa fa-'+item.icon"></i>
              {{item.name || item.text}}
              <i v-if="item.align === 'right' && item.icon" :class="'fa fa-'+item.icon"></i>
            </a>
          </strong>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
export default {
  data() {
    return {
      index: 0
    }
  },
  props: {
    menu: {
      type: Array
    },
    menuRight: {
      type: Array
    }
  },
  methods: {
    styleClass(param, index) {
      const path = this.$route.path
      // if (path.includes(param.url)) this.index = index
      return {
        active: path.includes(param.url)
      }
    },
    push(item, index) {
      if (this.$route.path === item.url) return
      // this.index = index
      this.$router.push(item.url)
    }
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
