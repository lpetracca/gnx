const gnx = require('@simtlix/gnx');
const GNXError = gnx.GNXError;
const { Employee } = require('../models/employee');
const { Salary } = require('../models/salary');
const { Title } = require('../models/title');
const { DeptEmployee } = require('../models/deptEmployee');
const { DeptManager } = require('../models/deptManager');

// Validate unique dni
const CantRepeatDNI = {
    validate: async function(typeName, originalObject, materializedObject) {
        const EmployeeDni =
        await Employee.findOne({'dni': materializedObject.dni});
       
        if (EmployeeDni && EmployeeDni._dni != materializedObject.dni) {
            throw new CantUpdateEmployeeWithUsedDNI(typeName);
        }
    }};
  class CantUpdateEmployeeWithUsedDNI extends GNXError {
    constructor(typeName) {
      super(typeName,'DNI cant be repeated', 'CantUpdateEmployeeWithUsedDNI');
    }
};
  

// Validate employee older than 18
const AgeAtLeast18 = {
  validate: async function (typeName, originalObject, materializedObject) {
    const now = new Date()
    const bday = materializedObject.birth_date;
    
    const age = now.getMonth() < bday.getMonth() ?
      now.getFullYear() - bday.getFullYear() - 1
      : now.getFullYear() - bday.getFullYear();

    if ( age < 18 ) {
      throw new CantBeYoungerThan18Error(typeName);
    }
  }
}

class CantBeYoungerThan18Error extends GNXError {
    constructor(typeName) {
      super(typeName,'Employee must be at least 18 years old', 'CantBeYoungerThan18Error');
    }
};

  
  // Can't delete employee with salary
  const EmployeeHasSalary ={
    validate: async function(typeName, originalObject, materializedObject) {
        
        const SalaryFound =
        await Salary.findOne({'empId': originalObject});
        
        if (SalaryFound) {
            throw new CantDeleteEmployeeWithSalaryError(typeName);
        }
    }};
  class CantDeleteEmployeeWithSalaryError extends GNXError {
    constructor(typeName) {
      super(typeName,'Employee has at least 1 salary related', 'CantDeleteEmployeeWithSalaryError');
    }
  };


  // Can't delete employee with title
  const EmployeeHasTitle ={
    validate: async function(typeName, originalObject, materializedObject) {
        
        const TitleFound =
        await Title.findOne({'empId': originalObject});
        
        if (TitleFound) {
            throw new CantDeleteEmployeeWithTitleError(typeName);
        }
    }};
  class CantDeleteEmployeeWithTitleError extends GNXError {
    constructor(typeName) {
      super(typeName,'Employee has at least 1 title related', 'CantDeleteEmployeeWithTitleError');
    }
};
  

  // Can't delete employee with dept employee
  const EmployeeHasDeptEmployee ={
    validate: async function(typeName, originalObject, materializedObject) {
        
        const DeptEmployeeFound =
        await DeptEmployee.findOne({'empId': originalObject});
        
        if (DeptEmployeeFound) {
            throw new CantDeleteEmployeeWithDeptEmployeeError(typeName);
        }
    }};
  class CantDeleteEmployeeWithDeptEmployeeError extends GNXError {
    constructor(typeName) {
      super(typeName,'Employee has at least 1 dept employee related', 'CantDeleteEmployeeWithDeptEmployeeError');
    }
  };


  // Can't delete employee with dept manager
  const EmployeeHasDeptManager ={
    validate: async function(typeName, originalObject, materializedObject) {
        
        const DeptManagerFound =
        await DeptManager.findOne({'empId': originalObject});
        
        if (DeptManagerFound) {
            throw new CantDeleteEmployeeWithDeptManagerError(typeName);
        }
    }};
  class CantDeleteEmployeeWithDeptManagerError extends GNXError {
    constructor(typeName) {
      super(typeName,'Employee has at least 1 dept manager related', 'CantDeleteEmployeeWithDeptManagerError');
    }
  };


module.exports = {
  CantRepeatDNI,
  AgeAtLeast18,
  EmployeeHasSalary,
  EmployeeHasTitle,
  EmployeeHasDeptEmployee,
  EmployeeHasDeptManager
};