#!/usr/bin/env sh

# abort on errors
set -e

git config user.name "kz-fe"

echo $TRAVIS_BRANCH

echo $TRAVIS_COMMIT_MSG

if [ "$TRAVIS_COMMIT_MSG" ]; then

  # build
  npm run build

  # navigate into the build output directory
  cd vue-bricks

  # if you are deploying to a custom domain
  # echo 'www.example.com' > CNAME

  git init
  git add -A
  git commit -m "$TRAVIS_COMMIT_MSG"

  # if you are deploying to https://<USERNAME>.github.io
  # git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

  # if you are deploying to https://<USERNAME>.github.io/<REPO>
  git push --force --quiet "https://${GH_TOKEN}@github.com/Kuaizi-co/vue-bricks.git" master:gh-pages

  cd -
fi
