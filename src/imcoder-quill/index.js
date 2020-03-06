// 首先将我们的自己编写的组件import进来
import ImcoderQuill from './imcoder-quill.vue'

// 这段代码可以说是本文的重中之重，为什么这么说呢 
// 我们要使用自己的组件就要导出这个组件 
// 而这段代码就是导出自己组件的相应配置
const imcoderQuill = {
  install: function(Vue) {
    Vue.component("ImcoderQuill", ImcoderQuill)
  }
}
// global 情况下 自动安装
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(imcoderQuill)
}
// 导出模块
export default imcoderQuill