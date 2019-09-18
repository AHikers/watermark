/*
  判断文本是否超出canvas的宽度，超出则换行
  @param {string} str:要绘制的字符串
  @param {object} canvas:canvas对象
  @param {number} initX:绘制字符串起始x坐标
  @param {number} initY:绘制字符串起始y坐标
  @param {number} lineHeight:字行高
  @param {number} canvasWidth:单个水印的宽度
*/
const canvasTextAutoLine = parameterObj => {
  let { str, ctx, initX, initY, lineHeight, canvasWidth } = parameterObj
  let lineWidth = 0
  let lastSubStrIndex = 0
  for (let i = 0; i < str.length; i++) {
    lineWidth += ctx.measureText(str[i]).width
    if (lineWidth > canvasWidth - 50) { // 考虑边界需加50的buffer
      ctx.fillText(str.slice(lastSubStrIndex, i), initX, initY)
      initY += lineHeight
      lineWidth = 0
      lastSubStrIndex = i
    }
    if (i == str.length - 1) {
      ctx.fillText(str.substring(lastSubStrIndex, i + 1), initX, initY)
    }
  }
}

// 监控水印节点变化
const monitorDom = (parentSelector, callBack) => {
  /* 设置监听的dom节点 */
  let observeNode = null
  if (parentSelector) {
    observeNode = document.querySelector(
      parentSelector
    )
  } else {
    observeNode = document.body
  }
  const options = {
    childList: true,
    attributes: true,
    characterData: true,
    subtree: true,
    attributeOldValue: true,
    characterDataOldValue: true
  }
  const MutationObserver = window.MutationObserver ||
    window.WebKitMutationObserver ||
    window.MozMutationObserver
  if (!!MutationObserver) {
    const watermarkObserver = new MutationObserver(callBack)
    watermarkObserver.observe(observeNode, options)
  } else {
    return false
  }
  return true
}

export { canvasTextAutoLine, monitorDom }
