var Categories = require('mongoose').model('Categories');

exports.getCategories = function(req, res) {
  Categories.find({}).exec(function(err, collection) {
    //console.log(collection);
    res.json(collection);
  })
};

//add categories
exports.createCategory = function(req, res, next) {
  var categoryData = req.body;
 
  categoryData.categoryName = categoryData.categoryName.toLowerCase();
  categoryData.createdAt = new Date();
  //console.log(categoryData);
  
  Categories.create(categoryData, function(err, category) {
    //console.log(category);
    if(err) {
      if(err.toString().indexOf('E11000') > -1) {
        err = new Error('Duplicate Category Name');
      }
      res.status(400);
      
    }
    res.send(category);
  })
};

//delete category by id
exports.deleteCategory = function(req, res) {
   
  Categories.findById(req.params.cid, function(err, category) {
      if (err) {
          return handleError(res, err);
      }
      if (!category) {
          return res.send(404);
      }
      console.log(category);
      // remove category matched by category ID from the category collection        
      category.remove(function(err) {
          if (err) {
              return handleError(res, err);
          }
          res.json(category);
      });
  });
};