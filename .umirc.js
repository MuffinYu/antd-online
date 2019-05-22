
// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: false,
        dynamicImport: false,
        title: 'antd-online',
        dll: true,
        routes: {
          exclude: [/components\//],
        },
      },
    ],
  ],
  cssModulesExcludes: ['components/ApiContainer/index.css', 'pages/index.css'],
  outputPath: './docs'
};
