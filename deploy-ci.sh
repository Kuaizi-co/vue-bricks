#!/usr/bin/env sh

# abort on errors
set -e

git config user.name "kz-fe"

npm run lib

# build
npm run build

git add -A
git commit -m "[build] v$TRAVIS_TAG"
npm version $TRAVIS_TAG --message "[release] v$TRAVIS_TAG"

git push origin master

if [[ $TRAVIS_TAG =~ "beta" ]]
then
  npm publish --tag beta
else
  npm publish
fi

# navigate into the build output directory
cd vue-bricks

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m "[发布了] $TRAVIS_COMMIT_MSG"

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push --force --quiet "https://${GH_TOKEN}@github.com/Kuaizi-co/vue-bricks.git" master:gh-pages

cd -