/*
 * slush-focusnetworks
 * https://github.com/focusnetworks/slush-focusnetworks
 *
 * Copyright (c) 2014, Focusnetworks
 * Licensed under the MIT license.
 */

'use strict';

var gulp        = require('gulp'),
    install     = require('gulp-install'),
    conflict    = require('gulp-conflict'),
    template    = require('gulp-template'),
    rename      = require('gulp-rename'),
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
            message: 'Qual o nome do projeto?',
            default: defaults.appName
        },
        {
            type: 'list',
            name: 'typeProject',
            message: 'Qual linguagem?',
            choices: ['HTML', 'Rails', 'cakePHP', 'MEAN', 'AngularJS'],
            default: 'HTML'
        },
        {
            type: 'confirm',
            name: 'moveon',
            message: 'Gerar scaffolding?'
        }
    ],
    function (answers) {
        answers.appNameSlug = _.slugify(answers.appName);
        if (!answers.moveon) {
            return done();
        }
        if (answers.typeProject == 'HTML') {
            console.log("HTML");
            gulp.src(__dirname + '/templates/html/**')
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
