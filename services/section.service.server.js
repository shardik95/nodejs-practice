module.exports= function(app){

    app.post("/api/course/:courseId/section",createSection)
    app.get("/api/course/:courseId/section",getSections)
    app.post("/api/section/:sectionId/enrollment",enrollStudent)
    app.get("/api/student/section",findAllSectionsForStudent)

    var sectionModel = require('../models/section/section.model.server')
    var enrollmentModel=require('../models/enrollment/enrollment.model.server');

    function createSection(req,res){
        var section = req.body;
        sectionModel.createSection(section)
            .then(function (section) {
                res.send(section)
            })
    }

    function findAllSectionsForStudent(req,res) {
        var currentUser=req.session['currentUser'];
        var userId=currentUser._id;
        enrollmentModel.findAllSectionsForStudent(userId)
            .then(function (enrollments) {
                res.json(enrollments)
            })
    }

    function getSections(req,res) {
        let courseId=req.params['courseId'];
        sectionModel.findSection(courseId)
            .then(function (sections) {
                res.send(sections)
            })
    }

    function enrollStudent(req,res) {
        var sectionId = req.params.sectionId;
        var currentUser = req.session['currentUser'];
        var userId= currentUser._id;
        var enrollment={
            section:sectionId,
            student:userId
        }

        sectionModel.decrementSectionSeats(sectionId)
            .then(function () {
                enrollmentModel.addEnrollment(enrollment)
            })
            .then(function (enrollment) {
                res.send(enrollment);
            })
    }

}