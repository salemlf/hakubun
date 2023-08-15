#!/usr/bin/env bash

# fail if any command fails
set -e
# debug log
set -x

# Required nodeJS version
NODE_VERSION=20.5.0

# workaround to override the v8 alias
npm config delete prefix
. ~/.bashrc
nvm install "$NODE_VERSION"
nvm alias node20 "$NODE_VERSION"

# go to root of project
cd ../..

# install dependencies
npm i

# run optimized production build
npm run build

# copy the web assets to the native projects and updates the native plugins and dependencies based in package.json
npx cap sync ios