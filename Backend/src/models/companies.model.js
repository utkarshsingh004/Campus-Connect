import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  user:{
     type:mongoose.Schema.Types.ObjectId,
     ref:"User",
     required:true
  },
  companyName: { type: String, required: true },
  logo: { type: String, required: true },
  location: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['Confirmed', 'Pending', 'In Progress', 'Other'], 
    default: 'Pending' 
  },
  industry: { type: String, required: true },
  visitDate: { type: Date, required: true },
  website: { type: String, required: true },
  description: { type: String, required: true },
  process: [{ type: String }],

  title: { type: String, required: true },
  department: { type: String, required: true },
  type: { 
    type: String, 
    required: true,
    enum: ['Full-time', 'Internship', 'Part-time'],
    default: 'Full-time' 
  },
  experience: { type: String, required: true },
  ctc: { type: String, required: true },
  eligibility: { type: String, required: true },
  deadline: { type: Date, required: true },
  skills: [{ type: String, required: true }]
}, { timestamps: true });

export const Company = mongoose.model('Company', companySchema);
