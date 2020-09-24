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
