#!/bin/bash

# 脚本只要发生错误，就终止执行。
set -e

echo "开始执行 utils 打包发布"
# 更新版本 --update=major|minor|patch
node changeVersion.js $1

# rollup打包
npm run build

# 生成新的 README，剔除 dumi 干扰
mv README.md cp_readme.md
echo "沉淀一些工具函数 \n" > ./README.md 
cat ./docs/version.md >>  ./README.md    

# npm 发布
npm publish

echo 'utils 发布完成'

# 恢复 README 
mv cp_readme.md README.md