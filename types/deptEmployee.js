const graphql = require('graphql');
const gnx = require('@simtlix/gnx');
const { AuditableObjectFields } = require('./extended_types/auditableGraphQLObjectType');

const EmployeeType = require('./employee');
const DepartmentType = require('./department');
const DeptEmployee = require('../models/deptEmployee').DeptEmployee;
const Employee = require('../models/employee').Employee;
const Department = require('../models/department').Department;

const { fromToDate } = require('../validators/from-toDate.validator');

const {
    GraphQLID, GraphQLObjectType } = graphql;

const { GraphQLDate } = require('graphql-iso-date');

const DeptEmployeeType = new GraphQLObjectType({
    name: 'DeptEmployeeType',
    description: 'Represent dept employees',
    extensions: {
      validations: {
        'CREATE':
                [
                    fromToDate
                ],
        'UPDATE':
                [
                    fromToDate
                ],
      },
    },

    fields: () => Object.assign(AuditableObjectFields, {
        id: { type: GraphQLID },
        from_date: { type: GraphQLDate },
        to_date: { type: GraphQLDate },
        employee: {
            type: EmployeeType,
            extensions: {
                relation: {
                connectionField: 'empId',
                },
            },
            resolve(parent, args) {
                return Employee.findById(parent.empId);
            }
        },

        department: {
            type: DepartmentType,
            extensions: {
                relation: {
                    connectionField: 'deptId'
                }
            },
            resolve(parent, args) {
                return Department.findById(parent.deptId)
            }
        }

    }),
});



gnx.connect(DeptEmployee, DeptEmployeeType, 'deptEmployee', 'deptEmployees');

module.exports = DeptEmployeeType;