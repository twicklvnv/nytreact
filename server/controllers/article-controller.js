var Article = require("../models/Article");

module.exports = {
    //find articles in db
    find: function(req, res) {
        Article.find().then(function(doc) {
            res.json(doc);
        }).catch(function(err) {
            res.json(err)
        });
    },

    //add articles to db
    insert: function(req, res) {
      Article.create(req.body).then(function(doc) {
          res.json(doc);
      }).catch(function(err) {
          res.json(err);
      });
    },

    //delete articles from db
    delete: function(req, res) {
        Article.remove({
            _id: req.params.id
        }).then(function(doc) {
            res.json(doc);
        }).catch(function(err) {
            res.json(err);
        });
    }
};