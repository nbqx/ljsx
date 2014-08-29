var fs = require('fs'),
    test = require('tape'),
    colorize = require('tap-colorize');

var ljsx = require(__dirname+'/../');
var inp = [__dirname,'..','example.ljsx'].join('/'),
    out = [__dirname,'out.jsx'].join('/'),
    result = [__dirname,'result.jsx'].join('/');

test.createStream().on('end',function(){
  fs.unlinkSync(out);
}).pipe(colorize()).pipe(process.stdout);

test("input file path",function(t){
  t.plan(1);
  
  ljsx(inp,{gfm:true}).pipe(fs.createWriteStream(out)).on('close',function(){
    var a = fs.readFileSync(out) + '',
        b = fs.readFileSync(result) + '';
    t.equal(a,b);
  });
});

test("input buffer",function(t){
  t.plan(1);
  var bf = fs.readFileSync(inp);
  ljsx(bf,{gfm:true}).pipe(fs.createWriteStream(out)).on('close',function(){
    var a = fs.readFileSync(out) + '',
        b = fs.readFileSync(result) + '';
    t.equal(a,b);
  });
});
