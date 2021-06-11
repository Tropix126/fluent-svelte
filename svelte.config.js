const sveltePreprocess = require('svelte-preprocess');

module.exports = {
    preprocess: sveltePreprocess({
        defaults: {
            style: 'scss'
        },
        postcss: {
           plugins: [require('autoprefixer')()]
        }
    })
};