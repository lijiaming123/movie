module.exports = function(grunt) {

  grunt.initConfig({
    watch: {
      jade: {
        files: ['views/**'],
        options: {
          livereload: true
        }
      },
      js: {
        files: ['public/js/**', 'models/**/*.js', 'schemas/**/*.js'],
        //tasks: ['jshint'],
        options: {
          livereload: true
        }
    }
},
      

    nodemon: {
      dev: {
        script:"app.js"
        options: {
          args: [],
          nodeArgs:["--debug"]
          ignore: ['README.md', 'node_modules/**', '.DS_Store'],
          ext:'js',
          watch: ['./'],
          delay: 1000,
          env: {
            PORT: 3000
          },
          cwd: __dirname
        }
      }
    },

    concurrent: {
      tasks: ['nodemon', 'watch'],
      options: {
        logConcurrentOutput: true
      }
    }
})

grunt.registerTask('build', 'build a browser file', function() {
    var done = this.async();

    var outfile = './brain-' + pkg.version + '.js';

    var bundle = browserify('./browser.js').bundle(function(err, src) {
      console.log("> " + outfile);

      // prepend license
      var license = fs.readFileSync("./LICENSE");
      src = "/*\n" + license + "*/" + src;

      // write out the browser file
      fs.writeFileSync(outfile, src);
      done();
    });
  });
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-nodemon')
  grunt.loadNpmTasks('grunt-concurrent')


  grunt.option('force', true)

  grunt.registerTask('default', ['concurrent'])
  grunt.registerTask('test', ['mochaTest'])


}