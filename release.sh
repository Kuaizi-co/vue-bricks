git checkout master
git merge dev

#!/usr/bin/env sh
set -e
echo "Enter release version: "
read VERSION

read -p "Releasing $VERSION - are you sure? (y/n)" -n 1 -r
echo    # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then
  echo "Releasing $VERSION ..."

  npm version $VERSION --message "[release] $VERSION" --allow-same-version

  # lib
  VERSION = $VERSION npm run lib

  git add -A
  git commit -m "[release] $VERSION"
  git push origin master
  git push origin refs/tags/v$VERSION

  if [[ $VERSION =~ "beta" ]]
  then
    npm publish --tag beta
  else
    npm publish
  fi

  git checkout dev
  git rebase master
  git push origin dev

  echo "completed!!!!"
fi