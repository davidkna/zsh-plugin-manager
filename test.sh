#!/usr/bin/env sh

npm run test

echo "Test with no uglify"
npm run build:nouglify
chmod +x dist.js
./dist.js

echo "Test with uglify"
npm run build
./dist.js

echo "Source file:"
cat ~/.local/share/zsh_plugins/plugins.zsh

echo "Plugin folder contents:"
ls -Al ~/.local/share/zsh_plugins/*