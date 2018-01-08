<template>
  <div>
    <textarea :name="'editor'+id" ref="editor" style="width: 100%"></textarea>
  </div>
</template>
<script>
  /**
   * 全局editor
   * */
  export default {
    data () {
      return {
        editor: '',
        fo: false,
        id: parseInt(Math.random() * 9999999),
        bugTools: ['formatblock', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold', 'italic', 'underline', '|',
          'justifyleft', 'justifycenter', 'justifyright', 'insertorderedlist', 'insertunorderedlist', '|',
          'emoticons', 'image', 'code', 'link', '|', 'removeformat', 'undo', 'redo', 'fullscreen', 'source', 'about'],
        simpleTools: ['formatblock', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold', 'italic', 'underline', '|',
          'justifyleft', 'justifycenter', 'justifyright', 'insertorderedlist', 'insertunorderedlist', '|',
          'emoticons', 'image', 'code', 'link', '|', 'removeformat', 'undo', 'redo', 'fullscreen', 'source', 'about'],
        fullTools: ['formatblock', 'fontname', 'fontsize', 'lineheight', '|', 'forecolor', 'hilitecolor', '|', 'bold', 'italic', 'underline', 'strikethrough', '|',
          'justifyleft', 'justifycenter', 'justifyright', 'justifyfull', '|',
          'insertorderedlist', 'insertunorderedlist', '|',
          'emoticons', 'image', 'insertfile', 'hr', '|', 'link', 'unlink', '/',
          'undo', 'redo', '|', 'selectall', 'cut', 'copy', 'paste', '|', 'plainpaste', 'wordpaste', '|', 'removeformat', 'clearhtml', 'quickformat', '|',
          'indent', 'outdent', 'subscript', 'superscript', '|',
          'table', 'code', '|', 'pagebreak', 'anchor', '|',
          'fullscreen', 'source', 'preview', 'about']
      }
    },
    components: {},
    mounted () {
      this.init()
    },
    watch: {
      value: function (newData, oldData) {
        if (newData !== this.editor.html()) this.editor.html(newData)
      }
    },
    props: {
      value: String,
      items: {
        type: String,
        default: 'simpleTools'
      }
    },
    methods: {
      init () {
        let main = this
        main.editor = window.KindEditor.create('textarea[name="editor' + main.id + '"]', {
          themeType: 'simple',
          allowFileManager: true,
          items: this[this.items],
          uploadJson: '/api/v1/upload/fileImage',
          afterChange: function () {
          },
          afterBlur: function () {
            main.$emit('input', this.html())
          }
        })
        if (main.value) main.editor.html(main.value)
      }
    }
  }
</script>
