const gnx = require('@simtlix/gnx');
const GNXError = gnx.GNXError;
const { Employee } = require('../models/employee');
const { GraphQLDate } = require('graphql-iso-date');
const Date = GraphQLDate;

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
    const now = Date.now()
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

  
  const executeAuditableOnUpdating = async (objectId, modifiedObject) => {
    const promotionModel = gnx.getModel(PromotionType);
    return AuditableGraphQLObjectTypeController.onUpdating(
      objectId, modifiedObject, promotionModel
    );
  };



module.exports = {
    CantRepeatDNI,
    AgeAtLeast18
  };