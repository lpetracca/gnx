const graphql = require('graphql');
const gnx = require('@simtlix/gnx');
const { AuditableObjectFields } = require('./extended_types/auditableGraphQLObjectType');

const EmployeeType = require('./employee'); 
const Salary = require('../models/salary').Salary;
const Employee = require('../models/employee').Employee;

const { fromToDate } = require('../validators/from-toDate.validator');

const { GraphQLID, GraphQLObjectType,GraphQLInt } = graphql;

const { GraphQLDate } = require('graphql-iso-date');

const SalaryType = new GraphQLObjectType({
    name: 'SalaryType',
    description: 'Represent salaries',
    extensions: {
      validations: {
        'CREATE':
                [
                    fromToDate
                ],
        'UPDATE':
                [
                    fromToDate
                ]
      },
    },

    fields: () => Object.assign(AuditableObjectFields, {
        id: { type: GraphQLID },
        salary: { type: GraphQLInt },
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
        }
    }),
});



gnx.connect(Salary, SalaryType, 'salary', 'salaries');

module.exports = SalaryType;
