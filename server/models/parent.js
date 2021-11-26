var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var parentSchema=new Schema({
  parent_name: { type: String, required: true },
  parent_contact: { type: String, require: true },
  email: { type:String },
  parent_address: { type: String },
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

module.exports=mongoose.model('Parent',parentSchema);