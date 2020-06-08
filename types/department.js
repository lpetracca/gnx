const graphql = require('graphql');
const gnx = require('@simtlix/gnx');
const { AuditableObjectFields } = require('./extended_types/auditableGraphQLObjectType');

const Department = require('../models/department').Department;


/*
const {
  CantRepeatName,
  CantDeleteDepartmentsWithBooks,
} = require('../validators/Departments.validator');
*/

const { GraphQLString,
    GraphQLID, GraphQLObjectType } = graphql;

const DeptartmentType = new GraphQLObjectType({
    name: 'DeptartmentType',
    description: 'Represent deptartments',
    extensions: {
      validations: {
        'UPDATE':
        [
         // CantRepeatName,
        ],
        'DELETE' :
        [
         // CantDeleteDepartmentWithBooks,
        ],
      },
    },

    fields: () => Object.assign(AuditableObjectFields, {
        id: { type: GraphQLID },
        dept_name: { type: GraphQLString }
    }),
});


gnx.connect(Department, DeptartmentType, 'Department', 'Departments');

module.exports = DeptartmentType;
