const graphql = require('graphql');
const gnx = require('@simtlix/gnx');
const SexTypeEnum = require('./enums/sex.enum');
const { AuditableObjectFields } = require('./extended_types/auditableGraphQLObjectType');

const Employee = require('../models/employee').Employee;

const {
  CantRepeatDNI, AgeAtLeast18
} = require('../validators/employee.validator');


const {
    GraphQLString, GraphQLID, GraphQLObjectType, GraphQLInt, GraphQLList
  } = graphql;

const { GraphQLDate } = require('graphql-iso-date');
  
const EmployeeType = new GraphQLObjectType({
    name: 'EmployeeType',
    description: 'Represent employee',
    extensions: {
        validations: {
            'CREATE':
            [
                CantRepeatDNI,
                AgeAtLeast18
            ],
            
            'UPDATE':
            [
                CantRepeatDNI,
                AgeAtLeast18
            ]
        },
    },
    
    fields: () => Object.assign(AuditableObjectFields, {
        id: { type: GraphQLID },
        first_name: { type: GraphQLString },
        last_name: { type: GraphQLString },
        dni: { type: GraphQLInt },
        birth_date: { type: GraphQLDate },
        gender: { type: SexTypeEnum },
        hire_date: { type: GraphQLDate }

    })
});


gnx.connect(Employee, EmployeeType, 'employees', 'employees');

module.exports = EmployeeType;