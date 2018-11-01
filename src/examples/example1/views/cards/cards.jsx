

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { graphql, compose } from 'react-apollo';
import { LineContainer, VContainer, FlexContainer } from '@xinghunm/widgets';
import { cardsListQuery, addCardMutation, deleteCardMutation } from '../../models/gql/remote';

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

// const AddCard = ({ addCard1, addCard2 }) => (
//   <Button 
//     onClick={() => {
//       addCard1();
//     }}
//   >
//     Add Card
//   </Button>
// );


class AddCard extends React.Component {
  render() {
    const { addCard1, addCard2 } = this.props;
    return (
      <Button 
        onClick={() => {
          addCard1();
        }}
      >
        Add Card
      </Button>
    );
  }
}

AddCard.propTypes = {
  addCard1: PropTypes.func.isRequired,
  addCard2: PropTypes.func.isRequired
};

const AddCardWithMutation = graphql(
  addCardMutation
)(AddCard);

// 多个mutation
const AddCardWithMutations = compose(
  graphql(addCardMutation, { 
    props: ({ mutate }) => ({
      addCard1: () => mutate({
        variables: { 
          i: {
            caseName: "HT-18TEST",
            name: 'test',
            sex: 'male'
          }
        },
        optimisticResponse: {
          addCard: {
            name: 'test',
            id: 'tmp',
            __typename: 'Card'
          }
        },
        update: (cache, { data: { addCard }, loading, error }) => { 
          if (error) {
            console.log('add card fail');
          } else if (addCard) {
            console.log('add card success');
          }
        },
        refetchQueries: [{ query: cardsListQuery }], // 重新获取
      })
    }),
  }),
  graphql(addCardMutation, { name: 'addCard2' }) // name为mutate函数名
)(AddCard);

const DeleteCard = ({ deleteCard }) => (
  <Button 
    onClick={() => {
      deleteCard();
    }}
  >
    Delete Card
  </Button>
);
DeleteCard.propTypes = {
  deleteCard: PropTypes.func.isRequired
};

const DeleteCardWithMutation = graphql(
  deleteCardMutation, {
    props: ({ mutate }) => ({ 
      deleteCard: () => mutate({
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
      })
    }),
  }
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
        <AddCardWithMutations />
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