module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    less: {
      dev: {
        files: {
          "./dev/styles/styles.css": "./src/styles/styles.less",
        },
      },
      dist: {
        options: {
          compress: true,
        },
        files: {
          "./dist/styles/styles.min.css": "./dev/styles/styles.css",
        },
      },
    },
    watch: {
      css: {
        files: ["./src/styles/*.less"],
        tasks: ["less:dev"],
      },
      html: {
        files: ["./src/*.html"],
        tasks: ["replace:dev"],
      },
    },
    replace: {
      dev: {
        options: {
          patterns: [
            {
              match: "CSS_ADDRESS",
              replacement: "./styles/styles.css",
            },
            {
              match: "JS_ADDRESS",
              replacement: "../src/scripts/script.js",
            },
          ],
        },
        files: [
          {
            expand: true,
            flatten: true,
            src: ["src/index.html"],
            dest: "dev/",
          },
        ],
      },
      dist: {
        options: {
          patterns: [
            {
              match: "CSS_ADDRESS",
              replacement: "./styles/styles.min.css",
            },
            {
              match: "JS_ADDRESS",
              replacement: "./scripts/scripts.min.js",
            },
          ],
        },
        files: [
          {
            expand: true,
            flatten: true,
            src: ["temp/index.html"],
            dest: "dist/",
          },
        ],
      },
    },
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
        },
        files: {
          "temp/index.html": "dev/index.html",
        },
      },
    },
    clean: ["temp"],
    uglify: {
      target: {
        files: {
          "dist/scripts/script.min.js": "src/scripts/script.js",
        },
      },
    },
  });

  grunt.loadNpmTasks("grunt-contrib-less");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-replace");
  grunt.loadNpmTasks("grunt-contrib-htmlmin");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-uglify");

  grunt.registerTask("default", ["watch"]);
  grunt.registerTask("build", [
    "less:dist",
    "htmlmin:dist",
    "replace:dist",
    "clean",
    "uglify",
  ]);
};
