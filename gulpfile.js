'use strict';
var gulp = require('gulp'),
	gulpLoadPlugins = require('gulp-load-plugins')({
		scope : ['devDependencies', 'dependencies', 'peerDependencies'],
		rename : {
			'gulp.spritesmith': 'spritesmith',
			'gulp-spriter': 'spriter',
			'gulp-image-resize': 'imageResize'
		}
	});

require('./tasks/dev')(gulp, gulpLoadPlugins);


