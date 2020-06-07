const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const titleFields = {
    empId: Schema.Types.ObjectId,
    title: String,
    from_date: Date,
    to_date: Date
  };
  
  const titleSchema = new Schema(titleFields);
  
  const Title = mongoose.model('Title', titleSchema);
  if (!Title.collection.collection) {
    Title.createCollection();
  }
module.exports = { titleFields, Title };