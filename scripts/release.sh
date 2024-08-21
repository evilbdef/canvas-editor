#!/bin/bash

# set -u -e -o pipefail
readonly thisDir=$(cd $(dirname $0); pwd)
cd $(dirname $0)/..

# node scripts/release.js

# 获取最新版本号
VERSION=$(node -p "require('./package.json').version")
# 备份
cp ./package.json ./package.json_bak
# 删除无用属性
node ./scripts/release_cp_package.json.js

set +e #以下的脚本错误不中止进程
yarn config set username deployment
yarn config set email deployment@matech.com
yarn publish -f --new-version $VERSION --registry http://192.168.1.19:9876/repository/npm-local/ < d:/workspaces/workspace_20200515/npm_password
set -e #以下的脚本错误中止进程

# 使用备份还原
mv -f ./package.json_bak ./package.json
