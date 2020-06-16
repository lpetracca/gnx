const graphql = require('graphql');
const gnx = require('@simtlix/gnx');
const { AuditableObjectFields } = require('./extended_types/auditableGraphQLObjectType');

const EmployeeType = require('./employee'); 
const Employee = require('../models/employee').Employee;
const Title = require('../models/title').Title;


const { fromToDate } = require('../validators/from-toDate.validator');
const { UniqueTitleForDeptEmployee } = require('../validators/title.validator');

const { GraphQLString, GraphQLID, GraphQLObjectType } = graphql;

const { GraphQLDate } = require('graphql-iso-date');
  
const TitleType = new GraphQLObjectType({
    name: 'TitleType',
    description: 'Represent titles',
    extensions: {
        validations: {
            'CREATE':
                [
                    fromToDate,
                    UniqueTitleForDeptEmployee
                ],
            'UPDATE':
                [
                    fromToDate,
                    UniqueTitleForDeptEmployee
                ],
            
        },
    },
    
    fields: () => Object.assign({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
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
    }, AuditableObjectFields)
});


gnx.connect(Title, TitleType, 'title', 'title');

module.exports = TitleType;