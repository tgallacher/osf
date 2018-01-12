const path = require('path');


module.exports = {
    _JSOUTDIR: path.join(__dirname, 'public_html', 'assets'),
    _JSSRCDIR: path.join(__dirname, 'src'),
    definePluginConfig: {
        __PRODUCTION__: JSON.stringify(true),
        'process.env.NODE_ENV': JSON.stringify('production')
    }
}
