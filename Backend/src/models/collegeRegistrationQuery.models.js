import mongoose from 'mongoose';

const CollegeContactSchema = new mongoose.Schema({
  collegeName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  contactNumber: {
    type: String,
    default: '',
    trim: true,
  },
  role: {
    type: String,
    default: '',
    trim: true,
  },
  address: {
    type: String,
    default: '',
    trim: true,
  },
  notes: {
    type: String,
    default: '',
    trim: true,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

 const CollegeContact = mongoose.model('CollegeContact', CollegeContactSchema);

 export default CollegeContact


