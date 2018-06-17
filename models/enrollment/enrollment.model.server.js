var mongoose = require('mongoose');
var enrollSchema = require('./enrollment.schema.server');

var enrollmentModel = mongoose.model('EnrollmentModel',enrollSchema);

function addEnrollment(enrollment) {
    return enrollmentModel.create(enrollment);
}

function findAllSectionsForStudent(userId){
    return enrollmentModel.find({student:userId})
        .populate('section')
        .exec();
}

module.exports={
    addEnrollment:addEnrollment,
    findAllSectionsForStudent:findAllSectionsForStudent
}