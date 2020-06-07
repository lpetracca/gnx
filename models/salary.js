const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const salaryFields = {
    empId: Schema.Types.ObjectId,
    salary: Number,
    from_date: Date,
    to_Date: Date
};

const salarySchema = new Schema(salaryFields);

const Salary = mongoose.model('Salary', salarySchema);
if (!Salary.collection.collection) {
  Salary.createCollection();
}
module.exports = {Salary, salaryFields};