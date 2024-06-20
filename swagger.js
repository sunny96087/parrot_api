const swaggerAutogen = require("swagger-autogen")();
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const doc = {
  info: {
    version: "1.0.0",
    title: "parrot api",
    description: "鸚鸚食堂 api",
  },
  // * 開發
  // host: "localhost:3666",
  // schemes: ["http", "https"],
  // * 部署
  host: "parrot-api.2fishs.com",
  schemes: ["https"],

  basePath: "/",
  tags: [
    {
      name: "Parrot",
      description: "鸚鸚",
    },
    {
      name: "Info",
      description: "資訊",
    },
    {
      name: "Food",
      description: "食物",
    },
    {
      name: "Parrot",
      description: "鸚鸚",
    },
    {
      name: "Feedback",
      description: "回饋",
    },

    {
      name: "Upload",
      description: "上傳圖片",
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
// https://parrot-api-55iv.onrender.com/
// https://parrot-api.2fishs.com/

