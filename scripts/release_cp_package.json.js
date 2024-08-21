import fs from 'fs'
import path from 'path'

const pkgPath = path.resolve('package.json')

// 校验包合法性
fs.accessSync(path.resolve('dist'), fs.constants.F_OK)
fs.accessSync(path.resolve('dist/canvas-editor.es.js'), fs.constants.F_OK)
fs.accessSync(path.resolve('dist/canvas-editor.umd.js'), fs.constants.F_OK)

// 缓存项目package.json
const sourcePkg = fs.readFileSync(pkgPath, 'utf-8')

// 删除无用属性
const targetPkg = JSON.parse(sourcePkg)
Reflect.deleteProperty(targetPkg, 'dependencies')
Reflect.deleteProperty(targetPkg.scripts, 'postinstall')
fs.writeFileSync(pkgPath, JSON.stringify(targetPkg, null, 2))
