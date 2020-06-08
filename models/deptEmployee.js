const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deptEmployeeFields = {
    empId: Schema.Types.ObjectId,
    deptId: Schema.Types.ObjectId,
    from_date: Date,
    to_date: Date
  };
  
  const deptEmployeeSchema = new Schema(deptEmployeeFields);
  
  const DeptEmployee = mongoose.model('DeptEmployee', deptEmployeeSchema);
  if (!DeptEmployee.collection.collection) {
    DeptEmployee.createCollection();
  }
module.exports = { deptEmployeeFields, DeptEmployee };