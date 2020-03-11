const { override, fixBabelImports, addLessLoader } = require('customize-cra');
const darkThemeVars = require('antd/dist/dark-theme');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      hack: `true;@import "${require.resolve('antd/lib/style/color/colorPalette.less')}";`,
      ...darkThemeVars,
      '@primary-color': '#BB6BD9',
      '@link-color': '#BB6BD9',
      '@body-background': '#161724',
      '@component-background': '#212337',
      '@popover-background': '#212337',
      '@popover-customize-border-color': '#212337',
      '@border-color-split': '#212337'
    }
  })
);
