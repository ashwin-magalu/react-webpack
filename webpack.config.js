import path from "path";
import webpack from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ESLintWebpackPlugin from "eslint-webpack-plugin";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

export default {
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].bundle.css",
      chunkFilename: "[id].css",
    }),
    new webpack.HotModuleReplacementPlugin(),
    new ESLintWebpackPlugin({
      extensions: ["js", "jsx"],
      fix: true,
    }),
  ],

  // React entry point
  entry: path.resolve(__dirname, "src", "index.jsx"),

  // bundled code output point
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },

  // mode will be development or production or etc
  mode: "development",

  resolve: {
    extensions: [".js", ".jsx"], // Add .jsx extension
  },

  // To bundle the code every time there is a change in the react application
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    open: true, // Tells the devServer to open a browser window for the application
    client: {
      logging: "none",
    }, // To stop logging all server requests and long pull requests
    port: 8080,
    historyApiFallback: true,
    hot: true,
  },

  // The module is an array of rules objects that will test a condition for our files to see if
  // webpack loaders should be applied to the output, or modify the webpack parser.
  module: {
    // Each rule can have a test property that tests if a file should be acted upon by a webpack
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: path.resolve(__dirname, "src"),
        exclude: /node_modules/,
        // use is the loader that we want to use on the selected files
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  // @babel/preset-env is used to check backward compatibility and polyfills for commonly used browser versions
                  "@babel/preset-env",
                  {
                    // targets a browsers list query for compatible browser versions
                    // defaults option covers 99% of browsers that we use today
                    targets: "defaults",
                  },
                ],
                // @babel/preset-react handles JSX syntax that we will be writing in our React App
                "@babel/preset-react",
              ],
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        include: path.resolve(__dirname, "src"),
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1, // Enables/disables or setup number of loaders applied before CSS loader
            },
          },
          "postcss-loader",
        ],
      },
    ],
  },
};
