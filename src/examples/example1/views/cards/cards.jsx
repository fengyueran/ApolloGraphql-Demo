

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { graphql } from 'react-apollo';
import { LineContainer, VContainer, FlexContainer } from '@xinghunm/widgets';
import { addCardMutation } from '../../models/local';

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

const Button = styled.button`
  outline: none;
  height: 39px;
  width: 85px;
  margin: 5px;
`;

const AddCard = ({ mutate }) => (
  <Button 
    onClick={() => {
      mutate({
        variables: { 
          i: {
            caseName: "HT-18TEST",
            name: 'test',
            sex: 'male'
          }
        }
      });
    }}
  >
    Add Card
  </Button>
);
AddCard.propTypes = {
  mutate: PropTypes.func.isRequired
};

const AddCardWithMutation = graphql(
  addCardMutation
)(AddCard);

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
    <VContainer>
      <AddCardWithMutation />
      <FlexContainer>
        {
          cards.map(cardInfo => (
            <Card key={cardInfo.id} {...cardInfo} />
          ))
        }
      </FlexContainer>
    </VContainer>
  );
}; 

Cards.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Cards;
