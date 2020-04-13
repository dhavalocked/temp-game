var MongoClient = require('mongodb').MongoClient
var database; 

exports.connect = function(url, done) {
  if (database) return done()

  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true  },function(err, db) {
    if (err) return done(err)
    database = db.db("dpteenpatti")
    done()
  })
}

exports.get = function() {
  return database
}

exports.close = function(done) {
  if (database) {
    database.close(function(err, result) {
      database = null
      done(err)
    })
  }
}