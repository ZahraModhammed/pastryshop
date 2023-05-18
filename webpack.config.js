const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const path = require('path');


module.exports = {
  mode: 'development ',
  entry: {
   app:'./src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    hot:false,
    open:true,
    port: 9001,
    devMiddleware:{
      writeToDisk: true,
    }
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
        options: {
            minimize: true,
            // sources:false
          },
      },

      {
        test: /\.css$/i,
        exclude:/bootstrap\.min\.css$/i,
        use: [
        {
        loader:MiniCssExtractPlugin.loader,
        options:{
          esModule:false,
        },
        
        }
        ,
        "css-loader" ],

      
      },
      {
        test:/bootstrap\.min\.css$/i,
        use:[
          {
            loader:MiniCssExtractPlugin.loader,
            options:{
              esModule:false,
            },
            
            },
            'rtlcss-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename:'./images/[name][ext]'
        },
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[contenthash].[ext]",
              outputPath: "fonts/",
            },
          },
        ],
      },

      
     
    ],

  },
  
 
  plugins:[
    new HtmlWebpackPlugin({
        filename: "index.html",
        template: "./src/index.html"
    }),
    new MiniCssExtractPlugin({
      filename:"css/style.css"
    }),
    
    new CssMinimizerPlugin()
   
    
  ],

  
};