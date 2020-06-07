const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const deptManagerFields = {
    empId: Schema.Types.ObjectId,
    deptId: Schema.Types.ObjectId,
    from_date: Date,
    to_date: Date
};

const deptManagerSchema = new Schema(deptManagerFields);

const DeptManager = mongoose.model('DeptManager', deptManagerSchema);
if (!DeptManager.collection.collection) {
  DeptManager.createCollection();
}
module.exports = { DeptManager, deptManagerFields };