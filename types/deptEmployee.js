const graphql = require('graphql');
const gnx = require('@simtlix/gnx');
const { AuditableObjectFields } = require('./extended_types/auditableGraphQLObjectType');

const EmployeeType = require('./employee');
const DepartmentType = require('./department');
const DeptEmployee = require('../models/deptEmployee').DeptEmployee;
const Employee = require('../models/employee').Employee;
const Department = require('../models/department').Department;

const { fromToDate } = require('../validators/from-toDate.validator');
const { CantHave2EmployeesAtSameTime } = require('../validators/deptEmployee.validator')

const { GraphQLID, GraphQLObjectType } = graphql;

const { GraphQLDate } = require('graphql-iso-date');

const DeptEmployeeType = new GraphQLObjectType({
    name: 'DeptEmployeeType',
    description: 'Represent dept employees',
    extensions: {
      validations: {
        'CREATE':
                [
                    fromToDate,
                    CantHave2EmployeesAtSameTime
                ],
        'UPDATE':
                [
                    fromToDate,
                    CantHave2EmployeesAtSameTime
                ],
      },
    },

    fields: () => Object.assign({
        id: { type: GraphQLID },
        from_date: { type: GraphQLDate },
        to_date: { type: GraphQLDate },
        employee: {
            type: EmployeeType,
            extensions: {
                relation: {
                    embedded: false,
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
                    embedded: false,
                    connectionField: 'deptId'
                }
            },
            resolve(parent, args) {
                return Department.findById(parent.deptId)
            }
        }
    }, AuditableObjectFields),
});

gnx.connect(DeptEmployee, DeptEmployeeType, 'deptEmployee', 'deptEmployees');

module.exports = DeptEmployeeType;