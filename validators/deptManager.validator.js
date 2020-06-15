const gnx = require('@simtlix/gnx');
const GNXError = gnx.GNXError;
const { DeptManager } = require('../models/deptManager');

// Validate unique dept name
  const CantHave2ManagersAtSameTime ={
      validate: async function (typeName, originalObject, materializedObject) {
          
          const from_date1 = materializedObject.from_date;
          const to_date1 = materializedObject.to_date;
        
          const ManagersInSameDepartment = await DeptManager.find({ 'deptId': materializedObject.deptId }); //Search for manager that works in the same department as the manager I'm trying to add
          
          const from_date2 = ManagersInSameDepartment.from_date;
          const to_date2 = ManagersInSameDepartment.to_date;

          //  from_date2 < to_date1 < to_date2
          //  f1(----------)t1
          //        f2(-----------)t2
      
          // from_date1 < to_date2 < to_date1
          //       f1(----------)t1
          // f2(-----------)t2
      
          if ((from_date2 < to_date1 && to_date1 < to_date2) ||
              (from_date1 < to_date2 && to_date2 < to_date1)) {
            throw new CantHaveTwoManagersInTheSameDepartmentAtTheSameTimeError(typeName);
        }
               
    }};
  class CantHaveTwoManagersInTheSameDepartmentAtTheSameTimeError extends GNXError {
    constructor(typeName) {
      super(typeName,'Cant have 2 managers assigned to the same department in the same portion of time', 'CantHaveTwoManagersInTheSameDepartmentAtTheSameTimeError');
    }
};

module.exports = {
    CantHave2ManagersAtSameTime,
  };