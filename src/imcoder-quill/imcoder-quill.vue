<template>
  <div>
    <div ref="editor" class="editor"></div>
  </div>
</template>

<script>
import Quill from 'quill'
import hljs from 'highlight.js'
import 'quill/dist/quill.snow.css'
import 'highlight.js/styles/github-gist.css'
import '../assets/css/quill.css'
import { addQuillTitle } from './quill-title.js'

// 字体
var fonts = [
  false,
  'SimSun',
  'SimHei',
  'Microsoft-YaHei',
  'KaiTi',
  'FangSong',
  'Arial',
  'Times-New-Roman',
  'sans-serif'
]
var Font = Quill.import('formats/font')
Font.whitelist = fonts // 将字体加入到白名单
Quill.register(Font, true)

// 字体大小
var size = Quill.import('attributors/style/size')
var sizes = [false, '12px', '13px', '14px', '15px', '16px', '17px', '18px', '20px', '24px', '28px', '32px']
size.whitelist = sizes
Quill.register(size, true)

// 行高
const Parchment = Quill.import('parchment')
class lineHeightAttributor extends Parchment.Attributor.Class {}
const lineHeightStyle = new lineHeightAttributor('lineHeight', 'ql-lineHeight', {
  scope: Parchment.Scope.INLINE,
  whitelist: ['Normal', '100', '150', '200', '300', '400']
})
Quill.register({ 'formats/lineHeight': lineHeightStyle }, true)

export default {
  name: 'ImcoderEditor',
  props: {
    value: String
  },
  data() {
    return {
      quill: null,
      options: {
        theme: 'snow',
        modules: {
          toolbar: {
            container: [
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'code-block'],
              [{ header: 1 }, { header: 2 }],
              [{ list: 'ordered' }, { list: 'bullet' }],
              [{ script: 'sub' }, { script: 'super' }],
              [{ indent: '-1' }, { indent: '+1' }],
              [{ direction: 'rtl' }],
              [{ size: sizes }],
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              [{ color: [] }, { background: [] }],
              [{ font: fonts }],
              [{ align: [] }],
              ['clean'],
              ['link', 'image', 'video'],
              [{ lineHeight: ['Normal', '100', '150', '200', '300', '400'] }],
              ['mark']
            ],
            handlers: {
              shadeBox: null,
              mark: function(value) {}
            }
          },
          syntax: {
            highlight: text => {
              return hljs.highlightAuto(text).value // 这里就是代码高亮需要配置的地方
            }
          }
        },
        placeholder: '请输入内容'
      }
    }
  },
  mounted() {
    this.$nextTick(function() {
      const markBtn = document.querySelector('.ql-mark')
      markBtn.innerHTML = '<i class="el-icon-star-off"></i>'
    })

    hljs.configure({
      // optionally configure hljs
      languages: ['java', 'python', 'bash', 'javascript', 'css', 'html', 'ini', 'json', 'nginx', 'dockerfile', 'properties', 'yaml']
    })

    const dom = this.$el.querySelector('.editor')
    this.quill = new Quill(dom, this.options)
    // this.quill.root.innerHTML = this.value

    var that = this
    this.quill.on('editor-change', () => {
      that.$nextTick(function() {
        that.$emit('input', that.quill.root.innerHTML)
      })
    })
    addQuillTitle()
  }
}
</script>

<style>
.ql-editor {
  height: 700px;
  font-size: 16px;
}
</style>
