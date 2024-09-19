export enum ListType {
  UL = 'ul',
  OL = 'ol'
}

export enum UlStyle {
  DISC = 'disc', // 实心圆点
  CIRCLE = 'circle', // 空心圆点
  SQUARE = 'square', // 实心方块
  CHECKBOX = 'checkbox' // 复选框
}

export enum OlStyle {
  DECIMAL = 'decimal', // 阿拉伯数字1
  DECIMAL2 = 'decimal2', // 阿拉伯数字2
  DECIMAL3 = 'decimal3', // 阿拉伯数字3
  DECIMAL_CN = 'decimal_cn', // 中文数字1
  DECIMAL_CN2 = 'decimal_cn2', // 中文数字2
  DECIMAL_CN3 = 'decimal_cn3', // 中文数字3
  DECIMAL_CN4 = 'decimal_cn4', // 中文数字4
}

export enum ListStyle {
  DISC = UlStyle.DISC,
  CIRCLE = UlStyle.CIRCLE,
  SQUARE = UlStyle.SQUARE,
  DECIMAL = OlStyle.DECIMAL,
  DECIMAL2 = OlStyle.DECIMAL2,
  DECIMAL3 = OlStyle.DECIMAL3,
  DECIMAL_CN = OlStyle.DECIMAL_CN,
  DECIMAL_CN2 = OlStyle.DECIMAL_CN2,
  DECIMAL_CN3 = OlStyle.DECIMAL_CN3,
  DECIMAL_CN4 = OlStyle.DECIMAL_CN4,
  CHECKBOX = UlStyle.CHECKBOX
}
