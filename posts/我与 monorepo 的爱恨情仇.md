---
title: 我与 monorepo 的爱恨情仇
description: monorepo 简直是一个天才的架构体系...
date: 2026-04-10
tags:
  - 折腾日记
  - 踩坑记录
---

随着项目的进展，之前设计的架构似乎没有那么可靠了。于是我~~借鉴~~抄了 element-plus 的源码结构，改造成一个完完全全的 monorepo 项目。

## 起因

这个想法并不是灵感乍现，而是很久之前就这么打算。由于项目的需求，原本的前端项目需要做一个 “定制版”，而这个 “定制版” 呢也不是改个 LOGO、换个主题色那么简单，不仅仅页面内容不同，而且底层的网络请求逻辑由普通的 http 变为 WebSocket + http 混合模式。

因为去年也在搞着项目，就叫它一期吧，一期的整体结构是把整个项目复制了一份，然后网络请求分别适配。这样听起来挺简单对吧，但是随着需求不断地变更，比如页面上要加个功能、删减个表单，需要两套单独维护，而且还会有漏改的情况。

而 monorepo 就不一样，这是经过多个大型项目、框架最终实践的版本答案。我可以将一些共同的页面结构、函数逻辑给抽离出来，主版本和定制版只需要编写对应的业务即可。

于是，等到一期差不多结束之后，我将其完完全全重构了一遍，开始了二期项目的开发。

## 初识

二期从工程化设计上就以 monorepo 的项目目录搭建的，虽然算不上比较标准的结构吧，但是至少能跑起来，能很好的维护。

随着项目的进展，我前端也开发的差不多了，主体版本也和后端调的差不多了。今天，后端 WebSocket 部分开发的差不多了，我也该着手定制版了。

## 着手

起初我并没有直接把整套逻辑复制过去，我是慢慢来，先从 utils 这种工具函数开始迁移。但是随着代码的修改，问题也随之而来...

当时的项目代码结构是这样的

```
monorepo-project
├── ...
├── node_modules
├── packages
│   ├── main
│   │   └── 标准的前端工程结构...
│   ├── shared
│   │   └── package.json # 空壳
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── tsconfig.base.json
└── tsconfig.json
```

迁移 utils 的时候碰到了第一个问题：**如何处理版本冲突**

有些工具函数用到依赖版本已经是几个月之前了，但是随着版本号的更新，而 pnpm 默认安装依赖的时候使用最新版本，所以我参考了 element-plus 的做法：将版本号放在 `pnpm-workspace.yaml` 里面统一维护。

## 打包

现在，`shared` 整体目录结构就变成了这样

```
shared
├── node_modules
├── src
│   ├── index.ts # 统一导出出口
│   ├── utils # 工具函数模块
│   │   └── ...
├── package.json
└── ...
```

在选择构建工具的时候，我为了方便，索性直接使用了 Vite。具体打包逻辑和命令，我让 Claude 帮我搞定了。

审查的时候，我注意到了 `build` 这一命令中有这么一条内容：`tsc --emitDeclarationOnly`。

这个命令我之前没见过，但是通过查阅才知道：**Vite 打包并不会自动生成 `.d.ts`，需要配合 `tsc` 来协助完善。**

随着进度的推进，我总感觉哪里不够“优雅”，`shared` 默认是和页面打包在一起的，能否通过干预打包流程，将 `shared` 拆出来单独打包成一个文件呢？

于是乎，之前的打包构建逻辑就进行了以下修改

```ts
rollupOptions: {
  output: {
    manualChunks(id) {
      // 本地依赖拆包  // [!code ++]
      if (id.includes('packages/shared') || id.includes('packages\\shared')) {  // [!code ++]
        return 'shared'  // [!code ++]
      }  // [!code ++]
      // 第三方依赖拆包
      if (id.includes('node_modules') && (id.endsWith('.js') || id.endsWith('.ts'))) {
        return 'vendor'
      }
    },
    chunkFileNames: 'static/js/[name]-[hash].js',
    entryFileNames: 'static/js/[name]-[hash].js',
    assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
  },
},

```

但是打包的结果并不是很理想，虽然 shared 是拆出来了，但是大小似乎有些不对劲？

```bash{8,19}
Scope: 2 of 3 workspace projects
packages/shared build$ rimraf dist && vite build && tsc --emitDeclarationOnly
│ vite v7.3.0 building client environment for production...
│ transforming...
│ ✓ 14 modules transformed.
│ rendering chunks...
│ computing gzip size...
│ dist/index.es.js  156.22 kB │ gzip: 35.85 kB
│ dist/index.cjs.js  156.83 kB │ gzip: 35.96 kB
│ dist/index.iife.js  161.97 kB │ gzip: 36.19 kB
│ ✓ built in 450ms
└─ Done in 2.6s
packages/main build$ rimraf dist && NODE_OPTIONS=--max-old-space-size=8192 vite build
[72 lines collapsed]
│ dist/static/js/index-CzJqTmOG.js          35.60 kB │ gzip:   7.89 kB
│ dist/static/js/index-P4j2Jlap.js         123.06 kB │ gzip:  46.76 kB
│ dist/static/js/vendor-BWuj3rtH.js        303.31 kB │ gzip: 107.24 kB
│ dist/static/js/index-D9qBO5Vs.js         543.19 kB │ gzip: 169.10 kB
│ dist/static/js/shared-3tYjLt9q.js        918.80 kB │ gzip: 289.60 kB
│ ✓ built in 9.41s
└─ Done in 13s
```

这对吗？我 shared 总大小才 156.22 KB，打包后成了 918.80 KB？

紧接着我开始排查。我首先想到的是，肯定有第三方库被打包进 `shared` 里面了。通过打包分析工具，结果不出所料，element-plus 被打包进去了。但是我转念一想，`shared` 用到了 element-plus，但是我已经在 `external` 中给排除掉了呀，为什么还会被打包进去呢？此时已经下班了，秉着到点就走的原则，我也不再多做停留（更何况今天还是周五）。

坐在回家的地铁上，这个问题一直在困扰着我，想来想去也想不出什么头绪来。于是，我将问题大致描述给了群友，经过群友的不断排查，最终找到了问题所在（群友果然是万能的）。

由于在打包 element-plus 的时候，其文件扩展名是 `mjs`，而我在处理第三方依赖拆包的时候使用的判断条件是 `js` 和 `ts`，所以构建工具匹配不到只能打包进 `shared`（这个细节我吃一辈子）。

最终通过简单的调整，把判断条件正则了一下，~~管你 `mjs` 还是 `cjs`，全部给我老老实实地进去，~~下面即是完整的项目打包配置

```ts
rollupOptions: {
  output: {
    manualChunks(id) {
      // 本地依赖拆包
      if (id.includes('packages/shared') || id.includes('packages\\shared')) {
        return 'shared'
      }
      // 第三方依赖拆包
      if (id.includes('node_modules') && (id.endsWith('.js') || id.endsWith('.ts'))) { // [!code --]
      if (id.includes('node_modules') && (id.match(/\.[cm]?[jt]s(?=$|[?#])/i))) { // [!code ++]
        return 'vendor'
      }
    },
    chunkFileNames: 'static/js/[name]-[hash].js',
    entryFileNames: 'static/js/[name]-[hash].js',
    assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
  },
},

```

相对应的，打包结果也显得非常“优雅”

```bash{8,18}
Scope: 2 of 3 workspace projects
packages/shared build$ rimraf dist && vite build && tsc --emitDeclarationOnly
│ vite v7.3.0 building client environment for production...
│ transforming...
│ ✓ 14 modules transformed.
│ rendering chunks...
│ computing gzip size...
│ dist/index.es.js  156.22 kB │ gzip: 35.85 kB
│ dist/index.cjs.js  156.83 kB │ gzip: 35.96 kB
│ dist/index.iife.js  161.97 kB │ gzip: 36.19 kB
│ ✓ built in 415ms
└─ Done in 2.4s
packages/main build$ rimraf dist && NODE_OPTIONS=--max-old-space-size=8192 vite build
[72 lines collapsed]
│ dist/static/js/index-CaWWAgam.js            33.23 kB │ gzip:   7.34 kB
│ dist/static/js/index-BpTQvffx.js            35.32 kB │ gzip:  12.89 kB
│ dist/static/js/index-BllEOtdh.js            35.57 kB │ gzip:   7.88 kB
│ dist/static/js/shared-DIQJfeRg.js          100.65 kB │ gzip:  31.50 kB
│ dist/static/js/vendor-DUZU4TYC.js        1,734.41 kB │ gzip: 562.39 kB
│ ✓ built in 8.92s
└─ Done in 12.5s
```

## 结

monorepo 固然优秀，它使项目变得更加灵活，更加容易维护，但是同样的，细节也变得更多。

通过简单的复盘，工程化里面到处都是细节，就好比之前做打包优化就没排查出来，为什么 element-plus 没有处理好呢？说白了还是缺乏自测的能力，**一些很细节的东西不深入测试是很难发现的，而且这些细节往往是跨越能力阶级的一个个重要的里程碑。**

写到最后，还是要感谢 [Mitsuki](https://github.com/MomoseMitsuki) 协助我排查出了这个细节所在，ありがとうございました！
