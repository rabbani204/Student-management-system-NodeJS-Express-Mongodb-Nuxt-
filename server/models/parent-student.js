var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var parentstudentSchema=new Schema({
  parent_id: { type: Schema.Types.ObjectId, ref: 'Parent' },
  student_id: { type: Schema.Types.ObjectId, ref: 'Student' },
  created_by: { type:String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
})

module.exports=mongoose.model('ParentStudent',parentstudentSchema);