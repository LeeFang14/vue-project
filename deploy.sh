npm run build # 打包檔案，產生 dist

cd dist

# echo > .nojekyll

# git init # 對 dist git 初始化

# git checkout main  沒有main分支，所以沒有做這個切換分支的動作。

git add -A # 對 dist 內所有檔案 add

git commit -m 'deploy' # 提交

git push -f git@github.com:LeeFang14/vue-project.git master:gh-pages