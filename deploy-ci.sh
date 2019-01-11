#!/usr/bin/env sh

# abort on errors
set -e

git config user.name "kz-fe"

if [ "$TRAVIS_TAG" ]; then

  # build
  npm run build

  # navigate into the build output directory
  cd vue-bricks

  # if you are deploying to a custom domain
  # echo 'www.example.com' > CNAME

  git init
  git add -A
  git commit -m "[发布了] v$TRAVIS_TAG"

  # if you are deploying to https://<USERNAME>.github.io
  # git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

  # if you are deploying to https://<USERNAME>.github.io/<REPO>
  git push --force --quiet "https://${GH_TOKEN}@github.com/Kuaizi-co/vue-bricks.git" master:gh-pages

  cd -
fi
