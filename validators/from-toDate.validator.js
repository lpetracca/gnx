const gnx = require('@simtlix/gnx');
const GNXError = gnx.GNXError;

// Validate that the "from date" is before the "to date"
const fromToDate = {
    validate: async function(typeName, originalObject, materializedObject) {
        
        const from_date = materializedObject.from_date;
        const to_date = materializedObject.to_date

        if (to_date < from_date) {
            throw new FromDateIsAfterToDateError(typeName);
        }
    }
};
    
  class FromDateIsAfterToDateError extends GNXError {
    constructor(typeName) {
      super(typeName,'From date is after to date', 'FromDateIsAfterToDateError');
    }
  };

module.exports = {
    fromToDate
  };