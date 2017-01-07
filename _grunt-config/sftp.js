"use strict";

module.exports = function (grunt, options) {

    let secret = grunt.file.readJSON('./secret.json');


    return {
        "bestpractices": {
            "files": {
                "./": "_build/htdocs/**/*.*"
            },
            "options": {
                createDirectories: true,
                "path": secret.hostpath,
                "host": secret.host,
                "username": secret.username,
                "password": secret.password,
                "showProgress": true,
                "srcBasePath": "_build/htdocs/"
            }
        },
        "bestpractices2": {
            "files": {
                "./best-practices": "_build/htdocs/best-practices/*.*"
            },
            "options": {
                createDirectories: true,
                "path": secret.hostpath,
                "host": secret.host,
                "username": secret.username,
                "password": secret.password,
                "showProgress": true,
                "srcBasePath": "_build/htdocs/"
            }
        }
    }
}