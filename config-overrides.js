const { name } = require('./package');

module.exports = {
    webpack: (config) => {
        //将微应用打包成 umd 模块时，设置输出的全局变量名。
        config.output.library = `${name}-[name]`;
        //设置打包输出的模块格式为 umd。
        config.output.libraryTarget = 'umd';
        // webpack 5 需要把 jsonpFunction 替换成 chunkLoadingGlobal
        // config.output.jsonpFunction = `webpackJsonp_${name}`;
        // 指定在浏览器环境中使用全局对象
        config.output.globalObject = 'window';

        return config;
    },

    devServer: (_) => {
        const config = _;
//为开发服务器的响应头添加 Access-Control-Allow-Origin，允许跨域请求（注意仅适用于开发环境）。
        config.headers = {
            'Access-Control-Allow-Origin': '*',
        };
        // 当路由请求404时，返回根目录index.html，常用于单页应用的路由配置。
        config.historyApiFallback = true;
        //禁用热模块替换(HMR)，即禁止在开发服务器中热更新模块。
        config.hot = false;
        //禁用开发服务器的内容监视功能，这样开发服务器不会监听文件的变化。
        config.watchContentBase = false;
        //禁用开发服务器的实时重新加载功能。
        config.liveReload = false;

        return config;
    },
};
