const graphql = require('graphql');
const gnx = require('@simtlix/gnx');
const SexTypeEnum = require('./enums/sex.enum');
const { AuditableObjectFields } = require('./extended_types/auditableGraphQLObjectType');

const EmployeeType = require('./employee'); 
const Employee = require('../models/employee').Employee;
const Title = require('../models/title').Title;

/*
const {
  CantRepeatName,
  CantDeleteTitleWithBooks,
} = require('../validators/Title.validator');
*/

const {
    GraphQLString, GraphQLID, GraphQLObjectType, GraphQLInt
  } = graphql;

const { GraphQLDate } = require('graphql-iso-date');
  
const TitleType = new GraphQLObjectType({
    name: 'TitleType',
    description: 'Represent titles',
    extensions: {
        validations: {
            'UPDATE':
                [
                    //CantRepeatName,
                ],
            'DELETE':
                [
                    //CantDeleteTitleWithBooks,
                ],
        },
    },
    
    fields: () => Object.assign(AuditableObjectFields, {
        id: { type: GraphQLID },
        title: { type: GraphQLString },
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
        }
    })
});


gnx.connect(Title, TitleType, 'title', 'title');

module.exports = TitleType;