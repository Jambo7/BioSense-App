const { readFileSync, writeFileSync } = require('fs')
const { resolve } = require('path')

const file = resolve(__dirname, '../ios/App/App/capacitor.config.json')
const config = JSON.parse(readFileSync(file, 'utf8'))
const list = new Set(config.packageClassList || [])
list.add('BiosenseHealthPlugin')
config.packageClassList = [...list]
if (!config.server) config.server = {}
config.server.allowNavigation = ['bio-sense-app-navy.vercel.app']
writeFileSync(file, `${JSON.stringify(config, null, '\t')}\n`)
console.log('Patched iOS capacitor.config.json with BiosenseHealthPlugin')
