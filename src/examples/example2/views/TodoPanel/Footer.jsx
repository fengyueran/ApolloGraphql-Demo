import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { GET_VISIBILITY_FILTER } from '../../models/gql/local';
import Link from './Link';
 
const FilterLink = ({ filter, children }) => (
  <Query query={GET_VISIBILITY_FILTER}>
    {
      ({ data, client }) => (
        <Link
          onClick={() => client.writeData({ data: { visibilityFilter: filter } })}
          active={data.visibilityFilter === filter}
        >
          {children}
        </Link>
      )
    }
  </Query>
);

FilterLink.propTypes = {
  filter: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]).isRequired,
};

const Footer = () => (
  <p>
    Show: <FilterLink filter="SHOW_ALL">All</FilterLink>
    {', '}
    <FilterLink filter="SHOW_ACTIVE">Active</FilterLink>
    {', '}
    <FilterLink filter="SHOW_COMPLETED">Completed</FilterLink>
  </p>
);

export default Footer;