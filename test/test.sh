#!/usr/bin/env bash

set -e

npm run test

echo "Config file is at ${XDG_CONFIG_HOME:-$HOME/.config}/zsh-goggles/config.toml"

mkdir -p "${XDG_CONFIG_HOME:-$HOME/.config}/zsh-goggles"
cp test/zsh-goggles.config.toml "${XDG_CONFIG_HOME:-$HOME/.config}/zsh-goggles/config.toml"

echo "Test if it works with no uglify"
npm run devBuild
node dist/cli.js

echo "Source file:"
cat ~/.local/share/zsh-goggles/plugins.zsh

echo "Test if it works with uglify"
rm -rf dist
npm run build
node dist/cli.js

echo "Source file:"
cat ~/.local/share/zsh-goggles/plugins.zsh

echo "Plugin folder contents:"
ls -Al ~/.local/share/zsh-goggles/*
