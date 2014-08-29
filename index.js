var fs = require('fs');
var marked = require('marked'),
    es = require('event-stream');

var cont;

module.exports = function(src,markedOpts){
  if(Buffer.isBuffer(src)){
    cont = src + '';
  }else{
    cont = fs.readFileSync(src)+'';
  }
  var lex = marked.lexer(cont,markedOpts);
  return es.readArray(lex).pipe(es.through(function(data){
    if(data.type==='code'){
      this.emit('data',data.text+"\n");
    }
  }));
};
