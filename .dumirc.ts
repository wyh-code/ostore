import path from 'path';
import { defineConfig } from 'dumi';

export default defineConfig({
  plugins: ['dumi-plugin-color-chunk'],
  themeConfig: {
    name: 'ostore',
    logo: '/ostore.svg',
    favicons: ['/ostore.png'],
    nav: {
      // mode可选值有：override、append、prepend
      // - override: 直接覆盖约定导航，与 nav: [{ title: 'Blog', link: '/blog' }] 配置相同
      // - append: 将 value 中的导航追加到约定路由后面
      // - prepend: 将 value 中的导航添加到约定路由前面
      mode: "override",
      value: [
        { title: '组件', link: '/components/table' },
        { title: '函数', link: '/utils/url' },
        { title: '功能', link: '/functionals/border' },
      ]
    },
    socialLinks: {
      github: 'https://github.com/wyh-code/ostore',
    },
    footer: 'ostore | Copyright © 2023-present',
  },
  extraBabelPlugins: [
    [
      'babel-plugin-import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
    ],
  ],
  
  resolve: {
    // docDirs: [
    //   { type: 'doc', dir: 'docs' },
    // ],
    atomDirs: [
      { type: 'component', dir: '/packages/components' },
      { type: 'util', dir: '/packages/utils' },
      { type: 'functional', dir: '/packages/functionals' },
    ],
    // codeBlockMode: 'passive',
  },
  alias: {
    '@ostore/utils': path.join(__dirname, 'packages/utils'),
    '@ostore/ui': path.join(__dirname, 'packages/components'),
    '@ostore': path.join(__dirname, 'packages/components'),
  },
});
