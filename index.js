var fs = require('fs');
var marked = require('marked'),
    es = require('event-stream');

module.exports = function(file,markedOpts){
  var cont = fs.readFileSync(file)+'';
  var lex = marked.lexer(cont,markedOpts);
  return es.readArray(lex).pipe(es.through(function(data){
    if(data.type==='code'){
      this.emit('data',data.text+"\n");
    }
  }));
};
