import Webpack from "webpack";
import WebpackDevServer from "webpack-dev-server";
import webpackConfig from "./webpack.config.js";

const compiler = Webpack(webpackConfig);
const devServerOptions = { ...webpackConfig.devServer };
const server = new WebpackDevServer(devServerOptions, compiler);

// server.startCallback(() => {
//   console.log("Successfully started server on http://localhost:8080");
// });

const runServer = async () => {
  console.log("Starting server...");
  await server.start();
};

const stopServer = async () => {
  console.log("Stopping server...");
  await server.stop();
};

runServer();

setTimeout(() => {
  // stopServer();
}, 50000);
