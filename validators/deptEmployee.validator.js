const gnx = require('@simtlix/gnx');
const GNXError = gnx.GNXError;
const { DeptEmployee } = require('../models/deptEmployee');

// Validate unique dept name
  const CantHave2EmployeesAtSameTime ={
      validate: async function (typeName, originalObject, materializedObject) {
          
          const from_date1 = materializedObject.from_date;
          const to_date1 = materializedObject.to_date;
        
          const EmployeesInSameDepartment = await DeptEmployee.find({ 'deptId': materializedObject.deptId }); //Search for employee that works in the same department as the employee I'm trying to add
          
          const from_date2 = EmployeesInSameDepartment.from_date;
          const to_date2 = EmployeesInSameDepartment.to_date;

          //  from_date2 < to_date1 < to_date2
          //  f1(----------)t1
          //        f2(-----------)t2
      
          // from_date1 < to_date2 < to_date1
          //       f1(----------)t1
          // f2(-----------)t2
      
          if ((from_date2 < to_date1 && to_date1 < to_date2) ||
              (from_date1 < to_date2 && to_date2 < to_date1)) {
            throw new CantHaveTwoEmployeesInTheSameDepartmentAtTheSameTimeError(typeName);
        }
               
    }};
  class CantHaveTwoEmployeesInTheSameDepartmentAtTheSameTimeError extends GNXError {
    constructor(typeName) {
      super(typeName,'Cant have 2 employees assigned to the same department in the same portion of time', 'CantHaveTwoEmployeesInTheSameDepartmentAtTheSameTimeError');
    }
};

module.exports = {
    CantHave2EmployeesAtSameTime,
  };