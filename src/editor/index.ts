import './assets/css/index.css'
import { Command } from './core/command/Command'
import { CommandAdapt } from './core/command/CommandAdapt'
import { ContextMenu } from './core/contextmenu/ContextMenu'
import { Draw } from './core/draw/Draw'
import { INavigateInfo } from './core/draw/interactive/Search'
import { EventBus } from './core/event/eventbus/EventBus'
import { Listener } from './core/listener/Listener'
import { Override } from './core/override/Override'
import { Plugin } from './core/plugin/Plugin'
import { Register } from './core/register/Register'
import { Shortcut } from './core/shortcut/Shortcut'
import { LETTER_CLASS } from './dataset/constant/Common'
import { INTERNAL_CONTEXT_MENU_KEY } from './dataset/constant/ContextMenu'
import { EDITOR_COMPONENT } from './dataset/constant/Editor'
import { BackgroundRepeat, BackgroundSize } from './dataset/enum/Background'
import { BlockType } from './dataset/enum/Block'
import { ImageDisplay, LocationPosition, MaxHeightRatio, NumberType } from './dataset/enum/Common'
import { ControlIndentation, ControlType } from './dataset/enum/Control'
import {
  EditorComponent, EditorMode, EditorZone, PageMode,
  PaperDirection, RenderMode, WordBreak
} from './dataset/enum/Editor'
import { ElementType } from './dataset/enum/Element'
import { KeyMap } from './dataset/enum/KeyMap'
import { LineNumberType } from './dataset/enum/LineNumber'
import { ListStyle, ListType, OlStyle } from './dataset/enum/List'
import { RowFlex } from './dataset/enum/Row'
import { TableBorder, TdBorder, TdSlash } from './dataset/enum/table/Table'
import { TextDecorationStyle } from './dataset/enum/Text'
import { TitleLevel } from './dataset/enum/Title'
import { VerticalAlign } from './dataset/enum/VerticalAlign'
import { IBlock } from './interface/Block'
import { ICatalog, ICatalogItem } from './interface/Catalog'
import {
  IContextMenuContext,
  IRegisterContextMenu
} from './interface/contextmenu/ContextMenu'
import { IEditorData, IEditorOption, IEditorResult } from './interface/Editor'
import { IElement } from './interface/Element'
import { EventBusMap } from './interface/EventBus'
import { ILang } from './interface/i18n/I18n'
import { IRangeStyle } from './interface/Listener'
import { IMarginUnit } from './interface/Margin'
import { UsePlugin } from './interface/Plugin'
import { IRange } from './interface/Range'
import { IWatermark } from './interface/Watermark'
import { deepClone, getListText, splitText } from './utils'
import { formatElementList, getElementListByHTML } from './utils/element'
import { mergeOption, parseMargin } from './utils/option'

export default class Editor {
  public command: Command
  public listener: Listener
  public eventBus: EventBus<EventBusMap>
  public override: Override
  public draw: Draw
  public register: Register
  public destroy: () => void
  public use: UsePlugin

  constructor(
    container: HTMLDivElement,
    data: IEditorData | IElement[],
    options: IEditorOption = {}
  ) {
    // 合并配置
    const editorOptions = mergeOption(options)
    // 数据处理
    data = deepClone(data)
    let headerElementList: IElement[] = []
    let mainElementList: IElement[] = []
    let footerElementList: IElement[] = []
    if (Array.isArray(data)) {
      mainElementList = data
    } else {
      headerElementList = data.header || []
      mainElementList = data.main
      footerElementList = data.footer || []
    }
    const pageComponentData = [
      headerElementList,
      mainElementList,
      footerElementList
    ]
    pageComponentData.forEach(elementList => {
      formatElementList(elementList, {
        editorOptions,
        isForceCompensation: true
      })
    })
    // 监听
    this.listener = new Listener()
    // 事件
    this.eventBus = new EventBus<EventBusMap>()
    // 重写
    this.override = new Override()
    // 启动
    this.draw = new Draw(
      container,
      editorOptions,
      {
        header: headerElementList,
        main: mainElementList,
        footer: footerElementList
      },
      this.listener,
      this.eventBus,
      this.override
    )
    // 命令
    this.command = new Command(new CommandAdapt(this.draw))
    // 菜单
    const contextMenu = new ContextMenu(this.draw, this.command)
    // 快捷键
    const shortcut = new Shortcut(this.draw, this.command)
    // 注册
    this.register = new Register({
      contextMenu,
      shortcut,
      i18n: this.draw.getI18n()
    })
    // 注册销毁方法
    this.destroy = () => {
      this.draw.destroy()
      shortcut.removeEvent()
      contextMenu.removeEvent()
    }
    // 插件
    const plugin = new Plugin(this)
    this.use = plugin.use.bind(plugin)
  }
}

// 对外方法
export { splitText, getElementListByHTML, parseMargin, getListText }
// 对外常量
export { EDITOR_COMPONENT, LETTER_CLASS, INTERNAL_CONTEXT_MENU_KEY }
// 对外枚举
export {
  Editor,
  RowFlex,
  VerticalAlign,
  EditorZone,
  EditorMode,
  ElementType,
  ControlType,
  EditorComponent,
  PageMode,
  RenderMode,
  ImageDisplay,
  Command,
  KeyMap,
  BlockType,
  PaperDirection,
  TableBorder,
  TdBorder,
  TdSlash,
  MaxHeightRatio,
  NumberType,
  TitleLevel,
  ListType,
  ListStyle,
  OlStyle,
  WordBreak,
  ControlIndentation,
  BackgroundRepeat,
  BackgroundSize,
  TextDecorationStyle,
  LineNumberType,
  LocationPosition
}
// 对外类型
export type {
  IElement,
  IEditorData,
  IEditorOption,
  IEditorResult,
  IContextMenuContext,
  IRegisterContextMenu,
  IWatermark,
  INavigateInfo,
  IBlock,
  ILang,
  ICatalog,
  ICatalogItem,
  IRange,
  IRangeStyle,
  IMarginUnit,
}




