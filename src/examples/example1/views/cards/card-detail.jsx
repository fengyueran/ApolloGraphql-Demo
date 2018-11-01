import React from 'react';
import { graphql } from 'react-apollo';
import { cardDetailsQuery } from '../../models/gql/remote';

// eslint-disable-next-line
const CardDetail = ({ data: { loading, error, cardDetail } }) => {
  if (loading) {
    return <p>loading</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  return (
    <div>
      {`this is ${cardDetail && cardDetail.name}`}
    </div>
  );
};

const CardDetailWithQuery = graphql(cardDetailsQuery, {
  options: props => ({
    variables: { cardId: props.cardId }
  }),
})(CardDetail);

export default CardDetailWithQuery;