/*
 * grunt-openui5-babel
 * https://github.com/jmorino/grunt-openui5-babel
 *
 * Copyright (c) 2017 Jérome Morino
 * Licensed under the MIT license.
 */

'use strict';

const path = require('path');
const babel = require('babel-core');


/**
 * --> inputs
 *   file.src || file.ast
 *   file.map
 * 
 * outputs -->
 *   file.code
 *   file.map (might override input)
 *   file.ast (might override input)
 */
function transpile(file, options) {
	const params = Object.assign({}, options);
	const { filename, ast, code, map } = file;
	let result;

	// add input source map, if any
	if (map) { params.inputSourceMap = map; }

	// transpile file by priority: by AST, then by file
	if (ast && code) {
		result = babel.transformFromAst(ast, code, params);
	}
	else if (filename) {
		result = babel.transformFileSync(filename, params);
	}
	else {
		throw new Error('no input for transpilation: expected "filename" or ("ast" and "code")');
	}

	// enhance file with result
	Object.assign(file, result);
}

//=================================================================================================================

function readJSON(grunt, src, fallback) {
	if (!grunt.file.exists(src)) { return fallback; }
	return grunt.file.readJSON(src);
}

//=================================================================================================================

function sourceMapName(filename) {
	return `${filename}.map`;
}

//=================================================================================================================

module.exports = function(grunt) {

	// Please see the Grunt documentation for more information regarding task
	// creation: http://gruntjs.com/creating-tasks

	grunt.registerMultiTask('openui5_babel', 'Grunt plugin to transpile UI5 sources with Babel', function () {
		const options = this.options() || {};
		const babelOptionsES6 = readJSON(grunt, '.babelrc', {});
		const babelOptionsUI5 = Object.assign({}, babelOptionsES6, {
			babelrc : false,
			plugins : ["syntax-class-properties", ["transform-modules-ui5", options]],
			presets : [],
		});
		
		// transpile all files
		this.files.forEach(file => {
			// consider only first item of src array
			file.filename = file.src[0];

			// add input source map, if any
			if (babelOptionsES6.sourceMaps !== false) {
				file.map = readJSON(grunt, sourceMapName(file.filename), undefined);
			}
			
			// transpile UI5
			transpile(file, babelOptionsUI5);
			// transpile ES6
			transpile(file, babelOptionsES6);
			
			// append sourceMappingURL and save source map file
			if (file.map) {
				const sourceMapFileName = sourceMapName(file.dest);
				file.code += '\n//# sourceMappingURL=' + path.basename(sourceMapFileName);
				grunt.file.write(sourceMapFileName, JSON.stringify(file.map));
			}
			
			// save transformed file
			grunt.file.write(file.dest, file.code);
		});
	});
};
