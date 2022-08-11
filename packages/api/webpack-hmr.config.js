/* eslint-disable @typescript-eslint/no-var-requires */
const { WebpackPnpExternals } = require('webpack-pnp-externals');
const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const StartServerPlugin = require('start-server-nestjs-webpack-plugin');
const path = require('path');

const lazyImports = ['@nestjs/microservices/microservices-module', '@nestjs/websockets/socket-module'];

module.exports = function (options, webpack) {
  return {
    ...options,
    entry: ['webpack/hot/poll?100', options.entry],
    externals: [
      WebpackPnpExternals({
        exclude: ['webpack/hot/poll?100'],
      }),
    ],
    plugins: [
      ...options.plugins,
      new webpack.IgnorePlugin({
        checkResource(resource) {
          if (!lazyImports.includes(resource)) {
            return false;
          }
          try {
            require.resolve(resource, {
              paths: [process.cwd()],
            });
          } catch (err) {
            return true;
          }
          return false;
        },
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.WatchIgnorePlugin({
        paths: [/\.js$/, /\.d\.ts$/],
      }),
      // Copy binaries required by @prisma/client
      new CopyPlugin({
        patterns: [
          'prisma/schema.prisma',
          {
            from: path.join(__dirname, '../../node_modules/@prisma/engines/'),
            filter: (path) => {
              const filename = path.split('/').at(-1);
              return filename.startsWith('libquery_engine');
            },
          },
        ],
      }),
      new RunScriptWebpackPlugin({ name: options.output.filename, autoRestart: false }),
    ],
  };
};
