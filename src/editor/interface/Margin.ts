
/** pt=磅，in=英寸，cm=厘米，mm=毫米，pc=派卡，em=根字体倍数大小*/
export type IMarginUnit = 'pt' | 'in' | 'cm' | 'mm' | 'pc' | 'em';
export interface IMargin {
  top: number
  topUnit?: IMarginUnit
  right: number
  rightUnit?: IMarginUnit
  bottom: number
  bottomUnit?: IMarginUnit
  left: number
  leftUnit?: IMarginUnit
}
