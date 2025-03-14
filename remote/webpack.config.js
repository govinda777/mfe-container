const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const deps = require("./package.json").dependencies;

const configs = {
  appName: "remote",
  appFileName: "remoteEntry.js",
  development: {
    PUBLIC_PATH: "http://localhost:3001/",
    CONTAINER_PATH: "container@http://localhost:3000/remoteEntry.js",
    PORT: 3001,
  },
  production: {
    PUBLIC_PATH: "http://localhost:3001/",
    CONTAINER_PATH: "container@http://localhost:3000/remoteEntry.js",
    PORT: 3001,
  },
};

module.exports = (env, argv) => {
  console.log({ env, argv, configs: configs[argv.mode] });
  return {
    output: {
      publicPath: configs[argv.mode].PUBLIC_PATH,
    },

    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    },

    devServer: {
      hot: true,
      port: configs[argv.mode].PORT,
      historyApiFallback: true,
      allowedHosts: 'all',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers':
          'Origin, X-Requested-With, Content-Type, Accept',
      },
    },

    module: {
      rules: [
        {
          test: /\.m?js/,
          type: "javascript/auto",
          resolve: {
            fullySpecified: false,
          },
        },
        {
          test: /\.(css|s[ac]ss)$/i,
          use: ["style-loader", "css-loader", "postcss-loader"],
        },
        {
          test: /\.(ts|tsx|js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
      ],
    },

    plugins: [
      new ModuleFederationPlugin({
        name: configs.appName,
        filename: configs.appFileName,
        remotes: {
          container: configs[argv.mode].CONTAINER_PATH,
        },
        exposes: {
          './TestPage': './src/pages/test/index.tsx',
        },
        shared: {
          ...deps,
          react: {
            singleton: true,
            requiredVersion: deps.react,
          },
          "react-dom": {
            singleton: true,
            requiredVersion: deps["react-dom"],
          },
        },
      }),
      new HtmlWebPackPlugin({
        template: "./src/index.html",
      }),
    ],
  };
};
