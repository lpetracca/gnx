const graphql = require('graphql');
const gnx = require('@simtlix/gnx');
const { AuditableObjectFields } = require('./extended_types/auditableGraphQLObjectType');

const Department = require('../models/department').Department;

const { CantRepeatName,
  DepartmentHasDeptEmployee,
  DepartmentHasDeptManager } = require('../validators/department.validator')

const { GraphQLString,
    GraphQLID, GraphQLObjectType } = graphql;

const DeptartmentType = new GraphQLObjectType({
    name: 'DeptartmentType',
    description: 'Represent deptartments',
    extensions: {
      validations: {
        'CREATE' :
        [
          CantRepeatName
        ],
        
        'UPDATE':
        [
         CantRepeatName
        ],
        
        'DELETE':
        [
          DepartmentHasDeptEmployee,
          DepartmentHasDeptManager
        ]
        
      },
    },

    fields: () => Object.assign({
        id: { type: GraphQLID },
        dept_name: { type: GraphQLString }
        
    }, AuditableObjectFields),
});


gnx.connect(Department, DeptartmentType, 'Department', 'Departments');

module.exports = DeptartmentType;
