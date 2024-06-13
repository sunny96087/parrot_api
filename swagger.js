const swaggerAutogen = require("swagger-autogen")();
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const doc = {
  info: {
    version: "1.0.0",
    title: "ciaocraft api",
    description: "六角課程團體專題用 api",
  },
  // * 開發
  // host: 'localhost:3666',
  // schemes: ['http', 'https'],
  // * 部署
  host: "ciaocraft-api.onrender.com",
  schemes: ["https"],

  basePath: "/",
  tags: [
    // by default: empty Array
    {
      name: "Collections-front",
      description: "收藏 (前台)",
    },
    {
      name: "Feedback-front",
      description: "回饋 (前台)",
    },
    {
      name: "Upload-front",
      description: "上傳圖片 (前台)",
    },
    {
      name: "Upload-back",
      description: "上傳圖片 (後台)",
    },
    {
      name: "Upload-manage",
      description: "上傳圖片 (平台管理員)",
    },
    {
      name: "HR",
      description: "--- 分隔線 - 以下是參考的 ---",
    },
    {
      name: "Index",
      description: "首頁",
    },
    {
      name: "Upload",
      description: "上傳圖片",
    },
    {
      name: "Email",
      description: "信箱驗證",
    },
  ],
};

const outputFile = "./swagger_output.json"; // 輸出的文件名稱
const endpointsFiles = ["./app.js"]; // 要指向的 API，通常使用 Express 直接指向到 app.js 就可以

swaggerAutogen(outputFile, endpointsFiles, doc); // swaggerAutogen 的方法

// Demo
// http://localhost:3666/v1
// https://ciaocraft-api.onrender.com
