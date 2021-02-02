const wikilinks = require('markdown-it-wikilinks')({linkPattern: /\[\[([\w\s/!]+)(\|([\w\s/!]+))?\]\]/})
const md = require('markdown-it')()
    .use(wikilinks)
    .render('Click [[Wiki Links|here]] to learn about [[/Wiki]] links.')

console.log(md);


const html = require('markdown-it')()
  .use(require('markdown-it-wikilinks')({ baseURL: '/wiki/' }))
  .render('[[/Main Page]]')

console.log(html);


var fs = require('fs');
console.log('haha');
const directoryPath = __dirname;
//passsing directoryPath and callback function
// fs.readdir(directoryPath, function (err, files) {
//     //handling error
//     if (err) {
//         return console.log('Unable to scan directory: ' + err);
//     } 
//     //listing all files using forEach
//     files.forEach(function (file,type) {
//         // Do whatever you want to do with the file
//         console.log(file+' - '+type); 
//     });
// });

// var folders =[]
// var files=[]

// const files = fs.readdirSync(directoryPath)
// const path = require('path')
// for (const file of files) {
// 	var stat = fs.lstatSync(path.join(directoryPath, file));
// 	// console.log('test');
// 	if()
// 	console.log(file);
// 	console.log(stat.isDirectory());
// }

// files.forEach(function(file){
// 	console.log(file);
// })


// const fs = require("fs")
const path = require("path")
var avoid=['.git','_site','node_modules','.obsidian']
var _ = require('lodash');
const getAllFiles = function(dirPath, arrayOfFiles) {
  files = fs.readdirSync(dirPath)

  arrayOfFiles = arrayOfFiles || []

  files.forEach(function(file) {
  	var skip=false;
  	avoid.forEach(function(f){
  		if(f==file)
  			skip=true;
  	})
  	if(!skip){
	    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
	      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
	    } else {
	      arrayOfFiles.push(path.join(dirPath, "/", file))
	    }
  	}
  })

  return arrayOfFiles
}
var all_files=getAllFiles(__dirname);
var href='';
var to_match = 'cashflowy_monthly_update_october';
// all_files.indexOf()
all_files.forEach(function(file){
	if(file.indexOf(to_match)>-1)
		href=file;
})
console.log(all_files);
console.log('\n\n')
console.log(href.split(__dirname)[1].split('.md')[0]);
console.log(__dirname);
