/*
 * slush-focusnetworks
 * https://github.com/focusnetworks/slush-focusnetworks
 *
 * Copyright (c) 2015, Focusnetworks
 * Licensed under the MIT license.
 */

'use strict';

var gulp        = require('gulp'),
    install     = require('gulp-install'),
    conflict    = require('gulp-conflict'),
    template    = require('gulp-template'),
    rename      = require('gulp-rename'),
    shell       = require('gulp-shell'),
    _           = require('underscore.string'),
    inquirer    = require('inquirer');

function format(string) {
    var username = string.toLowerCase();
    return username.replace(/\s/g, '');
}

var defaults = (function() {
    var homeDir         = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE,
        workingDirName  = process.cwd().split('/').pop().split('\\').pop(),
        osUserName      = homeDir && homeDir.split('/').pop() || 'root',
        configFile      = homeDir + '/.gitconfig',
        user            = {};

    if (require('fs').existsSync(configFile)) {
        user = require('iniparser').parseSync(configFile).user;
    }

    return {
        appName: workingDirName,
        userName: format(user.name) || osUserName,
        authorEmail: user.email || ''
    };
})();


gulp.task('default', function (done) {
    inquirer.prompt([
        {
            type: 'input',
            name: 'appName',
            message: 'What is the name of your project?',
            default: defaults.appName
        },
        {
            type: 'input',
            name: 'appVersion',
            message: 'What is the version of your project?',
            default: '0.1.0'
        },
        {
            type: 'list',
            name: 'typeProject',
            message: 'What do you want to use?',
            //choices: ['HTML', 'Rails', 'cakePHP', 'MEAN', 'AngularJS'],
            choices: ['HTML', 'cakePHP'],
            default: 'HTML'
        },
        {
          type: 'checkbox',
          name: 'frameworkCSS',
          message: 'Do you want to include Framework CSS?',
          choices: [{
            name: 'Foundation',
            value: 'includeFoundation',
            checked: false
          }, {
            name: 'Bootstrap',
            value: 'includeBootstrap',
            checked: false
          }]
        },
        {
          type: 'checkbox',
          name: 'includeFontAwesome',
          message: 'Do you want to include Font Awesome?',
          choices: [{
            name: 'Yes',
            value: 'awesomeYes',
            checked: false
          }, {
            name: 'No',
            value: 'awesomeNo',
            checked: false
          }]
        },
        {
          type: 'checkbox',
          name: 'generateDoc',
          message: 'Do you want to include FRONTEND.md?',
          choices: [{
            name: 'Yes',
            value: 'docYes',
            checked: false
          }, {
            name: 'No',
            value: 'docNo',
            checked: false
          }]
        },
        {
          type: 'checkbox',
          name: 'generateIgnore',
          message: 'Do you want to include .gitignore?',
          choices: [{
            name: 'Yes',
            value: 'ignoreYes',
            checked: false
          }, {
            name: 'No',
            value: 'ignoreNo',
            checked: false
          }]
        },
        {
            type: 'confirm',
            name: 'moveon',
            message: "Ok, let's go?"
        }
    ],
    function (answers) {
        var frameworkCSS        = answers.frameworkCSS,
            generateDoc         = answers.generateDoc,
            generateIgnore      = answers.generateIgnore,
            includeFontAwesome  = answers.includeFontAwesome,
        hasFrameworkCSS = function (feat) {
          return frameworkCSS.indexOf(feat) !== -1;
        },
        hasDoc  = function (feat) {
          return generateDoc.indexOf(feat) !== -1;
        },
        hasIgnore = function (feat) {
          return generateIgnore.indexOf(feat) !== -1;
        },
        hasAwesome  = function (feat) {
          return includeFontAwesome.indexOf(feat) !== -1;
        };

        answers.appNameSlug = _.slugify(answers.appName);

        if (!answers.moveon) {
            return done();
        }

        //Framework CSS
        answers.includeFoundation = hasFrameworkCSS('includeFoundation');
        answers.includeBootstrap  = hasFrameworkCSS('includeBootstrap');

        //Font Awesome
        answers.awesomeYes        = hasAwesome('awesomeYes');
        answers.awesomeNo         = hasAwesome('awesomeNo');

        //Doc FRONTEND
        answers.docYes            = hasDoc('docYes');
        answers.docNo             = hasDoc('docNo');

        //.gitignore
        answers.ignoreYes         = hasIgnore('ignoreYes');
        answers.ignoreNo          = hasIgnore('ignoreNo');

        if (answers.includeBootstrap) {
          var pattern = [__dirname + '/templates/' + answers.typeProject + '/**', '!' + __dirname + '/templates/' + answers.typeProject +  '/{css,css/vendor/foundation/**}'];
        }

        if (answers.includeFoundation) {
          var pattern = [__dirname + '/templates/' + answers.typeProject + '/**', '!' + __dirname + '/templates/' + answers.typeProject +  '/{css,css/vendor/bootstrap/**}'];
        }

        if (answers.awesomeYes) {
          var pattern = [__dirname + '/templates/' + answers.typeProject + '/**',  __dirname + '/templates/' + answers.typeProject +  '/{css,css/font-awesome.min.css}'];
        }

        // if (!(answers.includeBootstrap) && !(answers.includeFoundation)) {
        //   var pattern = [__dirname + '/templates/' + answers.typeProject + '/**',  '!' + __dirname + '/templates/' + answers.typeProject + '/{css/vendor,css/vendor/**}'];
        // }

        console.log("CSS: " + answers.awesomeYes);

        console.log("Padrao: " + pattern);

        if (answers.docYes) {
            shell.task([
              'npm install frontend-md',
              'frontend-md'
            ]);
        }

        if (answers.ignoreYes) {


        }

        if (answers.typeProject == 'HTML') {
            gulp.src(pattern)
                .pipe(template(answers))
                .pipe(rename(function(file) {
                    if (file.basename[0] === '_') {
                        file.basename = '.' + file.basename.slice(1);
                    }
                }))
                .pipe(conflict('./'))
                .pipe(gulp.dest('./'))
                .pipe(install())
                .on('finish', function () {
                    done();
            });
        }
        if (answers.typeProject == 'Rails') {
            gulp.src(__dirname + '/templates/rails/**')
            .pipe(template(answers))
            .pipe(rename(function(file) {
                if (file.basename[0] === '_') {
                    file.basename = '.' + file.basename.slice(1);
                }
            }))
            .pipe(conflict('./'))
            .pipe(gulp.dest('./'))
            .pipe(install())
                .on('finish', function () {
            done();
            });
        }
        if (answers.typeProject == 'cakePHP') {
            gulp.src(__dirname + '/templates/cakePHP/**')
            .pipe(template(answers))
            .pipe(rename(function(file) {
                if (file.basename[0] === '_') {
                    file.basename = '.' + file.basename.slice(1);
                }
            }))
            .pipe(conflict('./'))
            .pipe(gulp.dest('./'))
            .pipe(install())
                .on('finish', function () {
            done();
            });
        }
        if (answers.typeProject == 'MEAN') {
            gulp.src(__dirname + '/templates/MEAN/**')
            .pipe(template(answers))
            .pipe(rename(function(file) {
                if (file.basename[0] === '_') {
                    file.basename = '.' + file.basename.slice(1);
                }
            }))
            .pipe(conflict('./'))
            .pipe(gulp.dest('./'))
            .pipe(install())
                .on('finish', function () {
            done();
            });
        }
        if (answers.typeProject == 'AngularJS') {
            gulp.src(__dirname + '/templates/angularJS/**')
            .pipe(template(answers))
            .pipe(rename(function(file) {
                if (file.basename[0] === '_') {
                    file.basename = '.' + file.basename.slice(1);
                }
            }))
            .pipe(conflict('./'))
            .pipe(gulp.dest('./'))
            .pipe(install())
                .on('finish', function () {
            done();
            });
        }
    });
});
