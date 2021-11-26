var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var institutionSchema=new Schema({
  institution_name: { type: String, lowercase: true },
  email: { type:String },
  institution_contract: { type: String, unique: true } ,
  institution_address: { type: String },
  password: { type:String, required:true },
  image: { type:String },
  status: { type: Boolean },
  register_ip: { type: Object },

  uniqueId: { type: String, unique: true },
  payment_date:{type: Date},
  payment_key: { type: String },
  payment_bkash_number: { type: String },
  payment_sender_name: { type: String },
  payment_completed: {type: String },
  sendKey: { type: String },
  reset_verification_code : { type: String },
  role: { type:String, required:true },

  created_by: { type:String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
})

module.exports=mongoose.model('Institution',institutionSchema);