

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { LineContainer, VContainer } from '@xinghunm/widgets';

const cardStyles = {
  width: 200,
  height: 110,
  margin: 5,
  background: '#AFC9F1',
};

const Text = styled.span`
  margin: 5px 5px 5px 10px;
`;

const CaseName = styled.h3`
  margin: 10px;
`;

const Card = ({ caseName, name, sex }) => (
  <VContainer style={cardStyles}>
    <CaseName>
      {caseName}
    </CaseName>
    <Text>
      {`Name: ${name}`}
    </Text>
    <Text>
      {`Sex: ${sex}`}
    </Text>
  </VContainer>
);

Card.propTypes = {
  caseName: PropTypes.string.isRequired,
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
