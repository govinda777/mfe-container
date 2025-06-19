const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const configs = {
  appName: "container",
  appFileName: "remoteEntry.js",
  development: {
    PUBLIC_PATH: "http://localhost:3000/",
    REMOTE_PATH: "remote@http://localhost:3001/remoteEntry.js",
    REMOTE_EVENT_BUS_PATH: "remoteEventBus@http://localhost:3002/remoteEntry.js",
    PORT: 3000,
  },
  production: {
    PUBLIC_PATH: "http://localhost:3000/",
    REMOTE_PATH: "remote@http://localhost:3001/remoteEntry.js",
    REMOTE_EVENT_BUS_PATH: "remoteEventBus@http://localhost:3002/remoteEntry.js",
    PORT: 3000,
  },
};

const deps = require("./package.json").dependencies;

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
      allowedHosts: "all",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept",
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
          // Use a promise-based approach for loading the remote
          // This allows the container to continue loading even if the remote is unavailable
          remote: `promise new Promise(resolve => {
            const remoteUrl = "${configs[argv.mode].REMOTE_PATH}";
            const script = document.createElement('script');
            script.src = remoteUrl.split('@')[1];
            
            script.onload = () => {
              // When the script loads successfully, resolve with the remote module
              const remote = window.remote;
              resolve(remote);
            };
            
            script.onerror = () => {
              // When the script fails to load, resolve with an empty module
              // This allows the container to continue loading
              console.warn("[Module Federation] Remote 'remote' failed to load. Using fallback.");
              resolve({});
            };
            
            // Add the script to the document to start loading
            document.head.appendChild(script);
          })`,
          remoteEventBus: `promise new Promise(resolve => {
            const remoteUrl = "${configs[argv.mode].REMOTE_EVENT_BUS_PATH}";
            const script = document.createElement('script');
            script.src = remoteUrl.split('@')[1];
            
            script.onload = () => {
              // When the script loads successfully, resolve with the remote module
              const remote = window.remoteEventBus;
              resolve(remote);
            };
            
            script.onerror = () => {
              // When the script fails to load, resolve with an empty module
              // This allows the container to continue loading
              console.warn("[Module Federation] Remote 'remoteEventBus' failed to load. Using fallback.");
              resolve({});
            };
            
            // Add the script to the document to start loading
            document.head.appendChild(script);
          })`,
        },
        exposes: {
          "./Button": "./src/components/Button.tsx",
          "./hooks/useStore": "./src/hooks/useStore.ts",
          "./hooks/useStoreSelector": "./src/hooks/useStoreSelector.ts",
          "./providers/StoreProvider": "./src/providers/StoreProvider.tsx",
          "./services/eventBus": "./src/services/eventBus.ts",
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
