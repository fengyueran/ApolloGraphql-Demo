

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { LineContainer } from '@xinghunm/widgets';

const Card = styled.div`
  width: 200px;
  height: 200px;
  margin: 5px;
  background: blue;
`;

const CardsList = ({ data: { loading, error, cards } }) => {
  if (loading) {
    return <p>Loading</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  return (
    <LineContainer>
      {
        [1, 2].map(() => (
          <Card />
        ))
      }
    </LineContainer>
  );
}; 

CardsList.propTypes = {
  data: PropTypes.object.isRequired,
};

export default CardsList;
