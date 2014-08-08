#!/usr/bin/env node
var fs = require('fs'),
    argv = require('yargs')
      .boolean('x')
      .argv,
    es = require('event-stream'),
    fakestk = require('fakestk');
var ljsx = require('./');

var opts = { gfm:true };
var out;

if(argv.o || argv.out) out = argv.o || argv.out;

if(argv._.length!==0){
  var tgt = argv._[0];

  if(argv.x){
    var input = '';
    ljsx(tgt,opts).pipe(es.through(function(data){
      input += data.toString();
    },function(){
      fakestk.run(input,function(err,res){
        if(err) return console.log(err);
        if(res!=='') console.log(res);
      });
    }));
  }else{
    if(out===undefined){
      ljsx(tgt,opts).pipe(process.stdout);
    }else{
      ljsx(tgt,opts).pipe(fs.createWriteStream(out));
    }
  }
}
