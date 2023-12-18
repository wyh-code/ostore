#!/bin/bash

# 默认包所在文件夹
packages="packages/"
# git commit 默认信息
m="版本更新"

# 处理命令行参数
for arg in "$@"; do
  case $arg in
    -p=*) # 指定package
      package="${arg#*=}"
      ;;
    -u=*) # 指定版本更新信息
      update="${arg#*=}"
      ;;
    -m=*) # 指定commit信息
      m="${arg#*=}"
      ;;
    *)
      # 处理其他参数或报告无效参数
      echo "无效参数 $arg"
      ;;
  esac
done

# 获取当前项目根目录
root_dir=$(pwd) 

# 进入更新项目
cd "$packages/$package"

# 执行具体包构建发布
sh ./deploy.sh --update=$update

# 回退到项目根路径
cd $root_dir

pwd

# 代码 提交
git add .
git status
git commit -m $m
# git pull
# git push