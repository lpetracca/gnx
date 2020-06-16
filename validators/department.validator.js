const gnx = require('@simtlix/gnx');
const GNXError = gnx.GNXError;
const { Department } = require('../models/department');
const { DeptEmployee } = require('../models/deptEmployee');
const { DeptManager } = require('../models/deptManager');

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


  // Can't delete department with dept employee
  const DepartmentHasDeptEmployee ={
    validate: async function(typeName, originalObject, materializedObject) {
        
        const DeptEmployeeFound =
        await DeptEmployee.findOne({'deptId': originalObject});
        
        if (DeptEmployeeFound) {
            throw new CantDeleteDepartmentWithDeptEmployeeError(typeName);
        }
    }};
  class CantDeleteDepartmentWithDeptEmployeeError extends GNXError {
    constructor(typeName) {
      super(typeName,'Department has at least 1 dept employee related', 'CantDeleteDepartmentWithDeptEmployeeError');
    }
  };


  // Can't delete department with dept manager
  const DepartmentHasDeptManager ={
    validate: async function(typeName, originalObject, materializedObject) {
        
        const DeptManagerFound =
        await DeptManager.findOne({'deptId': originalObject});
        
        if (DeptManagerFound) {
            throw new CantDeleteDepartmentWithDeptManagerError(typeName);
        }
    }};
  class CantDeleteDepartmentWithDeptManagerError extends GNXError {
    constructor(typeName) {
      super(typeName,'Department has at least 1 dept manager related', 'CantDeleteDepartmentWithDeptManagerError');
    }
  };

  
module.exports = {
  CantRepeatName,
  DepartmentHasDeptEmployee,
  DepartmentHasDeptManager

  };