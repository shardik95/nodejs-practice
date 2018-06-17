var mongoose = require('mongoose');

var enrollmentSchema = mongoose.Schema({
    student: {type:mongoose.Schema.Types.ObjectId,ref:'UserModel'},
    section:{type:mongoose.Schema.Types.ObjectId,ref:'SectionModel'},
    grade:String
},{collections:'enrollments'});

module.exports=enrollmentSchema;