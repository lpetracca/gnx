const graphql = require('graphql');
const gnx = require('@simtlix/gnx');
const { AuditableObjectFields } = require('./extended_types/auditableGraphQLObjectType');

const EmployeeType = require('./employee');
const DepartmentType = require('./department') 
const DeptManager = require('../models/deptManager').DeptManager;
const Employee = require('../models/employee').Employee;
const Department = require('../models/department').Department;

const { fromToDate } = require('../validators/from-toDate.validator');
const { CantHave2ManagersAtSameTime } = require('../validators/deptManager.validator');

const { GraphQLID, GraphQLObjectType } = graphql;

const { GraphQLDate } = require('graphql-iso-date');

const DeptManagerType = new GraphQLObjectType({
    name: 'DeptManagerType',
    description: 'Represent dept manager',
    extensions: {
      validations: {
        'CREATE':
                [
                    fromToDate,
                    CantHave2ManagersAtSameTime
                ],
        'UPDATE':
                [
                    fromToDate,
                    CantHave2ManagersAtSameTime
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
                    connectionField: 'deptId'
                }
            },
            resolve(parent, args) {
                return Department.findById(parent.deptId)
            }
        }

    }),
});



gnx.connect(DeptManager, DeptManagerType, 'deptManager', 'deptManagers');

module.exports = DeptManagerType;
