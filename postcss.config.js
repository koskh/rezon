/* eslint-disable */
module.exports = {
    plugins: [
        require('postcss-smart-import')({ /* ...options */ }),
        // require('precss')({ /* ...options */ }),
        require('postcss-mixins')({ /* ...options */ }),
        require('postcss-simple-vars')({ /* ...options */ }),
        require('postcss-nested')({ /* ...options */ }),
        require('postcss-utilities')({ /* ...options */ }),
        require('autoprefixer')({ /* ...options */ }),
    ]
}
