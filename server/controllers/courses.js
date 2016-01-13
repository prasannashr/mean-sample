var Course = require('mongoose').model('Course');

exports.getAllCourses = function(req, res) {
  Course.find({}).exec(function(err, collection) {
    res.send(collection);
  })
};

exports.getCourse = function(req, res) {
	console.log("Course Id : "+req.params.id);
  	Course.find({'_id':req.params.id}).exec(function(err, course) {
	    res.send(course[0]);
	})
};

exports.addCourses = function(req, res) {
	console.log(req.body);
	var newCourse = req.body;
	if(newCourse.publish){
		newCourse.published = new Date();
	}
	//create new course in DB  
    Course.create(newCourse, function(err, course) {
        if (err) {
            return handleError(res, err);
        }
        console.log(course);
        res.send(course);
    });
  
};
exports.updateCourse = function(req, res) {
  console.log(req.params.id);
  var updatedCourse = req.body;
  delete updatedCourse._id;
  //create new course in DB  
    Course.findOneAndUpdate({
        '_id': req.params.id
    }, req.body, function(err, course) {
        if (err) {
            return handleError(res, err);
        }
        console.log(course);
        return res.json(course);
    });
  
};

exports.deleteCourse = function(req, res) {
   
  Course.findById(req.params.id, function(err, course) {
      if (err) {
          return handleError(res, err);
      }
      if (!course) {
          return res.send(404);
      }
      console.log(course);
      // remove category matched by category ID from the category collection        
      course.remove(function(err) {
          if (err) {
              return handleError(res, err);
          }
          res.json(course);
      });
  });
};

function handleError(res, err) {
	console.log(err);
    return res.send(500, err);
}