const gnx = require('@simtlix/gnx');
const GNXError = gnx.GNXError;
const { Department } = require('../models/department');

// Validate unique dept name
  const CantRepeatName ={
    validate: async function(typeName, originalObject, materializedObject) {
        const DeptFound =
        await Department.findOne({'dept_name': materializedObject.dept_name});
       
        if (DeptFound && DeptFound._id != materializedObject.id) {
            throw new CantUpdateDepartmentWithNameUsedError(typeName);
        }
    }};
  class CantUpdateDepartmentWithNameUsedError extends GNXError {
    constructor(typeName) {
      super(typeName,'Department name cant be repeated', 'CantUpdateDepartmentWithNameUsedError');
    }
};

module.exports = {
    CantRepeatName,
  };