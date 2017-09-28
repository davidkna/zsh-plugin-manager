"use strict";function t(t){return t&&t.__esModule?t:{default:t}}function e(t){return function(){var e=t.apply(this,arguments);return new Promise(function(t,n){function i(o,r){try{var a=e[o](r),s=a.value}catch(t){return void n(t)}if(!a.done)return Promise.resolve(s).then(function(t){i("next",t)},function(t){i("throw",t)});t(s)}return i("next")})}}exports.__esModule=!0,exports.Plugin=exports.paths=void 0;var n=t(require("path")),i=t(require("findup-sync")),o=t(require("fs-extra")),r=t(require("lodash/isString")),a=t(require("lodash/isFunction")),s=t(require("nodegit")),u=t(require("xdg-basedir"));const d=exports.paths={downloadDir:n.default.join(u.default.data,"zsh-goggles"),configFile:n.default.join(u.default.config,"zsh-goggles","config.toml"),sourceFile:n.default.join(u.default.data,"zsh-goggles","plugins.zsh")},l={standalone:!0,source:!0,fpath:!0};class h{constructor([t,e]){this.name=t,this.downloadPath=n.default.join(d.downloadDir,t),this.config={},Object.assign(this.config,l),(0,r.default)(e)?this.config.github=e:Object.assign(this.config,e)}get fpath(){const t=this.config.fpath;if(!1!==t)return(0,r.default)(t)?n.default.join(this.downloadPath,t):(0,a.default)(t)?t(this.downloadPath):this.downloadPath}get sourceFile(){const t=this.config.source;if(!1===t)return;if((0,r.default)(t))return n.default.join(this.downloadPath,t);if((0,a.default)(t))return t(this.downloadPath);const e=[`${this.name}?(.plugin).?(z)sh`,"*.plugin.zsh","init.zsh","*.zsh","*.sh"];return(0,i.default)(e,{cwd:this.downloadPath,nocase:!0,maxdepth:0})}entry(){var t=this;return e(function*(){let e="";return t.sourceFile&&(t.config.standalone?e+=(yield o.default.readFile(t.sourceFile)):e+=`source ${t.sourceFile}`),t.fpath&&(e+=`\nfpath+=${t.fpath}`),e})()}download(){var t=this;return e(function*(){yield s.default.Clone(`https://github.com/${t.config.github}.git`,t.downloadPath)})()}update(){var t=this;return e(function*(){const e=yield s.default.Repository.open(t.downloadPath);yield e.fetchAll(),yield e.mergeBranches("master","origin/master")})()}}exports.Plugin=h;