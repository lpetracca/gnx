const gnx = require('@simtlix/gnx');
const GNXError = gnx.GNXError;
const { DeptEmployee } = require('../models/deptEmployee');
const { Title } = require('../models/title');

// Validate unique title
const UniqueTitleForDeptEmployee = {
    validate: async function(typeName, originalObject, materializedObject) {
        
        const FoundTitle =
            await Title.findOne({ 'empId': materializedObject.empId }); //Searches for a title with the same empId 
        const FoundDeptEmployee =
            await DeptEmployee.findOne({ 'empId': materializedObject.empId }); //Searches for employees in the department to later compare deptId's
        const FoundDeptartment =
            await DeptEmployee.findOne({'deptId': FoundDeptEmployee.deptId })
        
        if (FoundTitle && FoundDeptartment && FoundTitle._id != materializedObject.id) {
            throw new CantUpdateEmployeeWithTwoTitles(typeName);
        }
    }};
  class CantUpdateEmployeeWithTwoTitles extends GNXError {
    constructor(typeName) {
      super(typeName,'The same employee cannot have 2 titles with the same department', 'CantUpdateEmployeeWithTwoTitles');
    }
  };

  
module.exports = {
    UniqueTitleForDeptEmployee
  };