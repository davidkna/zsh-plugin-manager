#!/usr/bin/env node 
"use strict";function t(t){return t&&t.__esModule?t:{default:t}}function e(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var n=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),r=require("crypto"),i=t(r),u=require("path"),a=t(u),s=require("execa"),l=t(s),o=require("glob"),c=t(o),f=require("fs-jetpack"),h=t(f),d=require("listr"),g=t(d),p=require("mkdirp"),m=t(p),z=require("rimraf"),v=t(z),y=require("xdg-basedir"),w=t(y),k=a.default.join(w.default.data,"zsh_plugins");(0,m.default)(k);var b=["Tarrasch/zsh-colors","zsh-users/zsh-syntax-highlighting","zsh-users/zsh-history-substring-search","zsh-users/zsh-completions","mafredri/zsh-async","sindresorhus/pure"],j=function(){function t(n){e(this,t),this.name=n;var r=i.default.createHash("sha1");r.update(n),this.hash=r.digest("hex")}return n(t,[{key:"clonePath",get:function(){return a.default.join(k,this.hash)}}]),t}(),q=[],P=[],x=new g.default([{title:"Getting Paths for Cloning",task:function(){b=b.map(function(t){return new j(t)})}},{title:"Cleaning up",task:function(){var t=b.map(function(t){return t.hash});t.push("plugins.zsh");var e=h.default.list(k);null!==e&&e.filter(function(e){return!t.includes(e)}).forEach(function(t){return(0,v.default)(a.default.join(k,t))})}},{title:"Cloning Plugins",task:function(){return new g.default(b.map(function(t){var e=t.name,n=t.clonePath;return{title:"Cloning "+e+"...",task:function(){switch(h.default.exists(n)){case!1:return(0,l.default)("git",["clone","--recursive","--","https://github.com/"+e+".git",n]);case"dir":return l.default.sync("git",["fetch","--all"],{cwd:n}),(0,l.default)("git",["reset","--hard","origin/master"],{cwd:n});default:throw new Error("Invalid clone target!")}}}}),{concurrent:!0})}},{title:"Getting zsh File ready",task:function(){return new g.default(b.map(function(t){return{title:"Getting "+t.name+" ready...",task:function(){var e=t.name.split("/")[1],n=[e+".plugin.zsh","*.plugin.zsh","init.zsh","*.zsh","*.sh"];P.push(t.clonePath);for(var r=0;r<n.length;r++){var i=c.default.sync(a.default.join(t.clonePath,n[r]));if(0!==i.length){q.push(i[0]);break}}}}}),{concurrent:!0})}},{title:"Writing "+a.default.join(k,"plugins.zsh"),task:function(){return h.default.writeAsync(a.default.join(k,"plugins.zsh"),q.map(function(t){return"source "+t}).join("\n")+"\n"+P.map(function(t){return"fpath+="+t}).join("\n"))}}]);x.run().catch(function(t){console.error(t)});
