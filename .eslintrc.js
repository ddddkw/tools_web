module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended', // 使用 TypeScript ESLint 插件的推荐规则
    ],
    // 配置项
    env: {
        browser: true, // 浏览器环境
        es2021: true, // ES2021 特性
        node: true, // Node.js 环境
    },
    parserOptions: {
        ecmaVersion: 'latest', // 使用最新的 ECMAScript 版本
        sourceType: 'module', // 使用 ES6 模块语法
        ecmaFeatures: {
            jsx: true, // 启用 JSX（如果适用，比如 React）
        },
        // 如果使用 TypeScript 解析器，可以添加以下配置：
        parser: '@typescript-eslint/parser',
        // project: './tsconfig.json', // 指定 tsconfig.json 文件的位置（如果适用）
    },
    // 全局变量声明（如果需要）
    globals: {
        __webpack_public_path__: 'readonly',
    },
    // 指定要使用的插件
    plugins: [
        '@typescript-eslint', // TypeScript 插件（如果适用）
    ],
};
