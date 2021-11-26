var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var institutionstudentSchema=new Schema({
  student_id: { type: Schema.Types.ObjectId, ref: 'Student' },
  institution_id: { type: Schema.Types.ObjectId, ref: 'Institution' },
  month:{ type: String, require: true},
  late_fee:{ type: String},
  payment_id: {type: String},
  payment_by: { type: String},
  account_number: { type: String},
  created_by: { type:String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
})

module.exports=mongoose.model('InstitutionStudent',institutionstudentSchema);