#!/usr/bin/env node
var fs = require('fs'),
    argv = require('yargs').argv;
var ljsx = require('./');

var opts = { gfm:true };
var out;

if(argv.o || argv.out) out = argv.o || argv.out;

if(argv._.length!==0){
  var tgt = argv._[0];
  if(out===undefined){
    ljsx(tgt,opts).pipe(process.stdout);
  }else{
    ljsx(tgt,opts).pipe(fs.createWriteStream(out));
  }
}
