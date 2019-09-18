const DEFAULT_SETTINGS = {
  id: 'wm_div_id', // 水印总体的id
  text: '测试水印', // 水印的内容
  transparency: 0.15, // 水印透明度
  fontSize: 16, // 水印字体大小，以px为单位
  parentLeft: 0, // 水印整体左边距离
  parentTop: 0, // 水印整体顶边距离
  parentRight: 0, // 水印整体右边距离
  parentBottom: 0, // 水印整体顶边距离
  singleWidth: 200, // 单个水印宽度
  singleHeight: 200, // 单个水印长度
  slope: -15, // 水印倾斜度数
  parentSelector: null, // 水印插件挂载的父元素选取器,不输入则默认挂在body上
}

export { DEFAULT_SETTINGS }
