

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { graphql } from 'react-apollo';
import { LineContainer, VContainer, FlexContainer } from '@xinghunm/widgets';
import { cardsListQuery, addCardMutation, deleteCardMutation } from '../../models/local';

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
        },
        refetchQueries: [{ query: cardsListQuery }], // 重新获取
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

const DeleteCard = ({ mutate }) => (
  <Button 
    onClick={() => {
      mutate({
        variables: { 
          caseName: "test"
        },
        update: (cache, { data: { deleteCard } }) => { // deleteCard为该mutation返回的数据
          // Read the data from the cache for this query.
          let { cards } = cache.readQuery({ query: cardsListQuery });
          cards = cards.slice();
          if (cards) {
            cards.splice(0, 1);
          }
          // Write the data back to the cache.
          cache.writeQuery({ 
            query: cardsListQuery,
            data: { cards }
          });
        }
      });
    }}
  >
    Delete Card
  </Button>
);
DeleteCard.propTypes = {
  mutate: PropTypes.func.isRequired
};

const DeleteCardWithMutation = graphql(
  deleteCardMutation
)(DeleteCard);

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
      <LineContainer>
        <AddCardWithMutation />
        <DeleteCardWithMutation />
      </LineContainer>
      <FlexContainer>
        {
          cards && cards.map(cardInfo => (
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
const CardsWithData = graphql(cardsListQuery, {
  // options: { pollInterval: 500 } // 5s拉取一次数据
})(Cards);
export default CardsWithData;