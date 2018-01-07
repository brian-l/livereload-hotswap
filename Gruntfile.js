module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        babel: {
            options: {
                sourceMap: true,
                presets: ['env',],
            },
            env: {
                files: [
                    {
                        expand: true,
                        cwd: 'src',
                        src: '*.es6.js',
                        dest: 'dist',
                        ext: '.js',
                    },
                ]
            }
        },
        uglify: {
            utils: {
                files: {
                    'dist/hotswap.min.js': ['dist/hotswap.js'],
                },
                mangle: true,
                sourceMap: true
            }
        },
    });

    grunt.registerTask('default', ['babel', 'uglify']);
};
