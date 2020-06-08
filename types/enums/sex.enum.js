const graphql = require('graphql');

const {
  GraphQLEnumType,
} = graphql;

const SexTypeEnum = new GraphQLEnumType({
  name: 'SexTypeEnum',
  values: {
    M: {
      value: 'Masculine',
    },
    F: {
      value: 'Femenine',
    }
  },
});

module.exports = SexTypeEnum;
