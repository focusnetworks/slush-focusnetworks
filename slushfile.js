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
            message: "What's the name of your project?",
            default: defaults.appName
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
            type: 'confirm',
            name: 'moveon',
            message: "Ok, let's go?"
        }
    ],
    function (answers) {
        var frameworkCSS  = answers.frameworkCSS,
            generateDoc   = answers.generateDoc,
        hasFrameworkCSS = function (feat) {
          return frameworkCSS.indexOf(feat) !== -1;
        },
        hasDoc = function (feat) {
          return generateDoc.indexOf(feat) !== -1;
        };

        answers.appNameSlug = _.slugify(answers.appName);

        if (!answers.moveon) {
            return done();
        }

        answers.includeFoundation = hasFrameworkCSS('includeFoundation');
        answers.includeBootstrap  = hasFrameworkCSS('includeBootstrap');
        answers.docYes            = hasDoc('docYes');
        answers.docNo             = hasDoc('docNo');

        var pattern = [__dirname + '/templates/' + answers.typeProject + '/**',  '!' + __dirname + '/templates/' + answers.typeProject + '/{css,css/**}'];

        if (answers.includeBootstrap) {
          pattern = [__dirname + '/templates/' + answers.typeProject + '/**', '!' + __dirname + '/templates/' + answers.typeProject +  '/{css,css/vendor/bootstrap/**}'];
        }

        if (answers.includeFoundation) {
          pattern = [__dirname + '/templates/' + answers.typeProject + '/**', '!' + __dirname + '/templates/' + answers.typeProject +  '/{css,css/vendor/foundation/**}'];
        }

        if (answers.docYes) {
            shell.task([
              'npm install frontend-md',
              'frontend-md'
            ]);
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
