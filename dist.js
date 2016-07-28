#!/usr/bin/env node 
"use strict";function t(t){return t&&t.__esModule?t:{default:t}}var e=require("crypto"),n=t(e),i=require("path"),r=t(i),u=require("execa"),s=t(u),a=require("glob"),c=t(a),o=require("fs-jetpack"),l=t(o),h=require("listr"),f=t(h),d=require("mkdirp"),g=t(d),p=require("rimraf"),z=t(p),m=require("xdg-basedir"),j=t(m);const w=r.default.join(j.default.data,"zsh_plugins");(0,g.default)(w);let q=["Tarrasch/zsh-colors","zsh-users/zsh-syntax-highlighting","zsh-users/zsh-history-substring-search","zsh-users/zsh-completions","mafredri/zsh-async","sindresorhus/pure"];class y{constructor(t){this.name=t;const e=n.default.createHash("sha1");e.update(t),this.hash=e.digest("hex")}get clonePath(){return r.default.join(w,this.hash)}}const b=[],x=[],P=new f.default([{title:"Getting Paths for Cloning",task(){q=q.map((t=>new y(t)))}},{title:"Cleaning up",task(){const t=q.map((t=>t.hash));t.push("plugins.zsh");const e=l.default.list(w);null!==e&&e.filter((e=>!t.includes(e))).forEach((t=>(0,z.default)(r.default.join(w,t))))}},{title:"Cloning Plugins",task(){return new f.default(q.map((t=>{const{name,clonePath}=t;return{title:`Cloning ${name}...`,task(){switch(l.default.exists(clonePath)){case!1:return(0,s.default)("git",["clone","--recursive","--",`https://github.com/${name}.git`,clonePath]);case"dir":return s.default.sync("git",["fetch","--all"],{cwd:clonePath}),(0,s.default)("git",["reset","--hard","origin/master"],{cwd:clonePath});default:throw new Error("Invalid clone target!")}}}})),{concurrent:!0})}},{title:"Getting zsh File ready",task(){return new f.default(q.map((t=>{return{title:`Getting ${t.name} ready...`,task(){const e=t.name.split("/")[1],n=[`${e}.plugin.zsh`,"*.plugin.zsh","init.zsh","*.zsh","*.sh"];x.push(t.clonePath);for(let i=0;i<n.length;i++){const e=c.default.sync(r.default.join(t.clonePath,n[i]));if(0!==e.length){b.push(e[0]);break}}}}})),{concurrent:!0})}},{title:`Writing ${r.default.join(w,"plugins.zsh")}`,task(){return l.default.writeAsync(r.default.join(w,"plugins.zsh"),b.map((t=>`source ${t}`)).join("\n")+"\n"+x.map((t=>`fpath+=${t}`)).join("\n"))}}]);P.run().catch((t=>{console.error(t)}));
