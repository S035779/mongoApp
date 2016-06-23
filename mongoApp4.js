//app.js
var mongoose = require('mongoose');
//book-storeデータベースへ接続
var con = mongoose.connect('mongodb://mamoru_hashimoto:mamo-pass@localhost/book-store');
var db = con.connection;

//接続エラー時にコールバック実行
db.on('error', console.error.bind(console, 'connection error:'));
 
//接続成功時にコールバック実行
db.once('open', function (callback) {
  console.log("connect successfully")
});

var Schema = mongoose.Schema;
 
var bookSchema = new Schema({
    _id:Number,
    title: String,
    price: Number,
    publishDate: Date,
    author: { type: Number, ref: 'Author' }
});
 
var authorSchema = new Schema({
    _id:Number,
    name: String,
    books : [{ type: Schema.Types.ObjectId, ref: 'Book' }]
});
 
var Book = mongoose.model('Book', bookSchema);
var Author = mongoose.model('Author', authorSchema);

Book.remove({ title: 'JavaScriptリファレンス' }, function(err) {
   if(err) {
     console.log(err);
   } else {
     console.log("delete success.");
   }
});
