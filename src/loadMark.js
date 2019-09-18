import { canvasTextAutoLine } from './util'
import { DEFAULT_SETTINGS } from './constants'

/* 加载水印 */
export default function loadMark (settings) {

  // 采用配置项替换默认值(浅拷贝)
  const newSettings = { ...DEFAULT_SETTINGS, ...settings }

  /* 设置水印的容器 */
  let watermarkParentNode = null
  if (newSettings.parentSelector) {
    watermarkParentNode = document.querySelector(
      newSettings.parentSelector
    )
    // 水印容器需要相对于父容器定位
    watermarkParentNode.style.position = 'relative'
  } else {
    watermarkParentNode = document.body
  }

  const wmDom = document.getElementById(newSettings.id)
  // 已经有全局水印则不需要重新生成
  if (wmDom) return

  const canvas = document.createElement('canvas')
  const maskDiv = document.createElement('div')
  const ctx = canvas.getContext('2d')
  const angle = (newSettings.slope * Math.PI) / 180
  canvas.id = 'watermarkCanvasId'
  canvas.width = newSettings.singleWidth // 单个水印的宽度
  canvas.height = newSettings.singleHeight // 单个水印的高度
  ctx.font = `normal ${newSettings.fontSize}px 'Microsoft Yahei','serif','sans-serif'` // 设置字体样式，'serif','sans-serif'为通用字体
  ctx.fillStyle = `rgba(112, 113, 114, ${newSettings.transparency})` // 水印字体颜色
  ctx.translate(canvas.width / 2, canvas.height / 2)
  ctx.rotate(angle) // 水印偏转角度
  ctx.translate(-canvas.width / 2, -canvas.height / 2)
  ctx.textAlign = 'center'

  // 水印换行的情况下计算行高（考虑间隙加上5）
  const lineHeight = newSettings.fontSize + 5
  // 计算水印在y轴上的初始位置(考虑间隙加上5)
  const initY = Math.ceil(Math.abs(Math.sin(angle) * newSettings.singleHeight)) + 5
  // 水印文字太长则换行显示(第三个参数必须为canvas宽度的一半，要不然无法居中)
  const parameterObj = {
    str: newSettings.text,
    ctx,
    initX: newSettings.singleWidth / 2,
    initY,
    lineHeight,
    canvasWidth: newSettings.singleWidth,
  }
  canvasTextAutoLine(parameterObj)
  const imgSrc = canvas.toDataURL('image/png')

  maskDiv.id = newSettings.id
  maskDiv.style.position = 'absolute'
  maskDiv.style.zIndex = '9999'
  maskDiv.style.top = `${newSettings.parentTop}px`
  maskDiv.style.right = `${newSettings.parentRight}px`
  maskDiv.style.bottom = `${newSettings.parentBottom}px`
  maskDiv.style.left = `${newSettings.parentLeft}px`
  maskDiv.style.pointerEvents = 'none'

  maskDiv.style.backgroundImage = 'URL(' + imgSrc + ')'
  // 水印节点挂载
  watermarkParentNode.appendChild(maskDiv)
}
