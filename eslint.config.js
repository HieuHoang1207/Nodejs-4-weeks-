const globals = require("globals");
const pluginJs = require("@eslint/js");
const prettier = require("eslint-plugin-prettier"); // Import Prettier plugin // Import Prettier plugin

module.exports = [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      ecmaVersion: 2020, // Hoặc phiên bản mới hơn
      globals: {
        ...globals.browser,
        it: "readonly", // Thêm biến it
        expect: "readonly", // Thêm biến expect
        process: "readonly", // Thêm biến process
        next: "readonly",
        test: "readonly",
        jest: "readonly",
        describe: "readonly",
        afterEach: "readonly",
        __dirname: "readonly",
        require: "readonly",
        module: "readonly",
        exports: "readonly",
        // Thêm bất kỳ global nào khác mà bạn cần
      },
    },
    rules: {
      "no-console": "off", // Tắt quy tắc không cho phép console.log
      indent: ["error", 2], // Sử dụng 4 space cho indent
      quotes: ["error", "double"], // Sử dụng dấu nháy đơn
      semi: ["error", "always"], // Bắt buộc sử dụng dấu chấm phẩy
      "no-unused-vars": ["warn"], // Cảnh báo về các biến không được sử dụng
      "prettier/prettier": ["error"], // Kết hợp với Prettier
      // Thêm các quy tắc khác theo nhu cầu
    },
    plugins: {
      prettier, // Thay đổi cách định nghĩa plugins thành đối tượng
    },
  },
  {
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      // Thêm các quy tắc khác cho môi trường trình duyệt
    },
  },
  pluginJs.configs.recommended,
];
