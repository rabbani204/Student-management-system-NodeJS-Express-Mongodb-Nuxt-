var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var batchtudentSchema=new Schema({
  student_id: { type: Schema.Types.ObjectId, ref: 'Student', required : true},
  batch_id: { type: Schema.Types.ObjectId, ref: 'Batch', required:true},
  about_student:{type: String},
  created_by: { type:String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
})

module.exports=mongoose.model('BatchStudent',batchtudentSchema);