

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { LineContainer, VContainer } from '@xinghunm/widgets';

const cardStyles = {
  width: 200,
  height: 100,
  margin: 5,
  background: '#AFC9F1',
};

const Text = styled.span`
  margin: 5px;
`;

const Card = ({ name, sex }) => (
  <VContainer style={cardStyles}>
    <Text>
      {`name: ${name}`}
    </Text>
    <Text>
      {`sex: ${sex}`}
    </Text>
  </VContainer>
);

Card.propTypes = {
  sex: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

const Cards = ({ data: { loading, error, cards } }) => {
  if (loading) {
    return <p>Loading</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  return (
    <LineContainer>
      {
        cards.map(cardInfo => (
          <Card key={cardInfo.id} {...cardInfo} />
        ))
      }
    </LineContainer>
  );
}; 

Cards.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Cards;
