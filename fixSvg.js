var fs = require('fs');
var inputPath = 'img/symbol/svg';
var outputPath = 'img/';
var outputFile = 'sprite.css.svg';

var output = '';
var processed = 0;
var filenames = fs.readdirSync(inputPath);

function processFile(filename) {
	var content = fs.readFileSync(inputPath + '/' + filename, 'utf8');
	var defs = content.match(/<defs>(.*?)<\/defs>/g);

	content.replace(/<defs>(.*?)<\/defs>/g, '');

	defs = '<defs>' + defs.join('').replace(/<defs>/g, '').replace(/<\/defs>/g, '') + '</defs>';

	content = content.replace(/http:\/\/www\.w3\.org\/1999\/xlink">/, 'http://www.w3.org/1999/xlink">' + defs);

	addToOutput(content);
}


function addToOutput(data) {
	output += data;
}

function writeOutput() {
	var names = fs.readdirSync(outputPath);

	// remove first
	if (names.indexOf(outputFile) > -1) {
		fs.unlinkSync(outputPath + '/' + outputFile);
	}

	// write file
	fs.writeFileSync(outputPath + '/' + outputFile, output, {
		encoding: 'utf8'
	});
}

// start
filenames.forEach(function(file) {
	processFile(file);
	processed++;

	if (processed === filenames.length) {
		writeOutput();
	}
});