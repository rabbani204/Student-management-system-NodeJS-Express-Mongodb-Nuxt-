var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var studentSchema=new Schema({
  student_name: { type: String, required: true },
  student_contact: { type: String, require: true },
  parent_contact: { type: String, require: true },
  batchStudent: {
    type: Schema.Types.ObjectId, 
    ref: 'BatchStudent', 
  },
  email: { type:String },
  student_address: { type: String },
  password: { type:String, required:true },
  image: { type:String },
  status: { type: Boolean },
  register_ip: { type: Object },

  uniqueId: { type: String, unique: true },
  sendKey: { type: String },
  reset_verification_code : { type: String },
  role: { type:String, required:true },

  created_by: { type:String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
})

module.exports=mongoose.model('Student',studentSchema);