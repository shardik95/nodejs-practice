var mongoose=require('mongoose');

var sectionSchema = require('./section.schema.server');

var sectionModel = mongoose.model('SectionModel',sectionSchema);

function createSection(section) {
    return sectionModel.create(section);
}

function findSection(courseId){
    return sectionModel.find({courseId:courseId})
}

function decrementSectionSeats(sectionId){
    return sectionModel.update({
        _id:sectionId
    },{
        $inc:{seats:-1}
    })
}

var api={
    createSection:createSection,
    findSection:findSection,
    decrementSectionSeats:decrementSectionSeats
}

module.exports=api;