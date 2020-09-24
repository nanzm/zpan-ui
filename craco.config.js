const { loaderByName, addBeforeLoader } = require("@craco/craco");
const CracoLessPlugin = require("craco-less");

module.exports = {
  webpack: {
    alias: {},
    plugins: [],
    configure: (webpackConfig, { env, paths }) => {
      return webpackConfig;
    },
  },
  plugins: [
    {
      plugin: {
        overrideWebpackConfig: ({ webpackConfig }) => {
          const rawLoader = { test: /^iconfont.js$/, use: ["raw-loader"] };

          addBeforeLoader(
            webpackConfig,
            loaderByName("file-loader"),
            rawLoader
          );
          return webpackConfig;
        },
      },
    },
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "#2971FF",
              "@ant-prefix": "zpan",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
