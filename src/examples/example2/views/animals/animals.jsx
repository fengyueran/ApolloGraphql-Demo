import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { 
  graphql, Query, ApolloConsumer, Mutation
} from 'react-apollo';
import { LineContainer, VContainer, FlexContainer } from '@xinghunm/widgets';
import { 
  cardsListQuery, cardQuery, addCardMutation, deleteCardMutation,
  updateCardMutation
} from '../../models/gql/remote';

import { cardsSubscription } from '../../models/gql/subscriptions';

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

const AddCard = () => (
  <Mutation mutation={addCardMutation}>
    {
      (addCard, { data }) => (
        <Button 
          onClick={() => {
            addCard({
              variables: { 
                i: {
                  caseName: "HT-18TEST",
                  name: 'test',
                  sex: 'male',
                  age: 20
                }
              },
              // refetchQueries: [{ query: cardsListQuery }], // 重新获取
            });
          }}
        >
          Add Card
        </Button>
      )
    }
  </Mutation>
);

const DeleteCard = () => (
  <Mutation 
    mutation={deleteCardMutation}
    update={(cache, { data: { deleteCard } }) => {
      let { cards } = cache.readQuery({ query: cardsListQuery });
      cards = cards.slice();
      cards.splice(0, 1);
      cache.writeQuery({ 
        query: cardsListQuery,
        data: { cards }
      });
    }}
  >
    {
      (deleteCard, { loading, error }) => (
        <Fragment>
          <Button 
            onClick={() => {
              deleteCard({
                variables: { 
                  caseName: "test"
                }
              });
            }}
          >
            Delete Card
          </Button>
          { loading && <p>Loading...</p>}
          { error && <p>Error :( Please try again</p>}
        </Fragment>
      )
    }
  </Mutation> 
);

const UpdateCard = () => (
  <Mutation mutation={updateCardMutation}>
    {
      (updateCard, { data }) => (
        <Button 
          onClick={() => {
            updateCard({
              variables: { 
                id: '1', // 通过id修改单个item，可以自动更新而不需要update
                age: 30
              },
            });
          }}
        >
          Update Snow Age
        </Button>
      )
    }
  </Mutation>
);

const Card = ({ caseName, name, age }) => (
  <VContainer style={cardStyles}>
    <CaseName>
      {caseName}
    </CaseName>
    <Text>
      {`Name: ${name}`}
    </Text>
    <Text>
      {`Age: ${age}`}
    </Text>
  </VContainer>
);

Card.propTypes = {
  caseName: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

const StartQuery = ({ onCardFetched }) => (
  <ApolloConsumer>
    {client => (
      <Button onClick={async () => {
        const { data } = await client.query({
          query: cardQuery,
          variables: { 
            name: "snow"
          },
        });
        onCardFetched(data);
      }}
      >
        Find Snow
      </Button>)
    }
  </ApolloConsumer>);

StartQuery.propTypes = {
  onCardFetched: PropTypes.func.isRequired
};

class Animals extends React.Component {
  state = {
    foundedCard: null
  }

  componentWillMount() {
    const { data, newCardId } = this.props;
    data.subscribeToMore({
      document: cardsSubscription,
      variables: {
        cardId: 5
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) {
          return prev;
        }

        const newCard = subscriptionData.data.cardAdded;
        const { cards } = prev;
        console.log('update query', subscriptionData);
        return { cards: cards.concat([newCard]) };
      }
    });
  }

  onCardFetched = (data) => {
    const { card } = data;
    this.setState({ foundedCard: card });
  }

  render() {
    const { foundedCard } = this.state;
    const {
      loading, error, data, startPolling, stopPolling, refetch,
      networkStatus 
    } = this.props;
    const cards = data && data.cards;
    if (networkStatus === 4) return 'Refetching'; // networkStatus1-8，详见networkStatushttps://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-networkStatus
    if (loading) {
      return <p>Loading</p>;
    }
    if (error) {
      return <p>{error.message}</p>;
    }

    return (
      <VContainer>
        <LineContainer>
          <AddCard />
          <DeleteCard />
          <UpdateCard />
          <Button onClick={() => refetch()}>
            Refetch
          </Button>
          <StartQuery onCardFetched={this.onCardFetched} />
        </LineContainer>
        <FlexContainer>
          {
            cards && cards.map((card, index) => (
              <Card key={index} {...card} />
            ))
          }
        </FlexContainer>
      </VContainer>
    );
  }
}

const AnimalsWithQuery = graphql(cardsListQuery, {
  options: { 
    // pollInterval: 500,
    notifyOnNetworkStatusChange: true
  }
})(Animals);

export default AnimalsWithQuery;