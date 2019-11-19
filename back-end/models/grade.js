import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const gradeSchema = new Schema({
    name: { type: String, required: [true, 'Name is required'] },
    description: String,
    userId: String,
    date: { type: Date, default: Date.now },
    active: { type: Boolean, default: true }
});

// Convert to model
const Grade = mongoose.model('Grade', gradeSchema);

export default Grade;