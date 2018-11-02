

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { graphql, compose } from 'react-apollo';
import { LineContainer, VContainer, FlexContainer } from '@xinghunm/widgets';
import { channelsListQuery, addCardMutation, deleteCardMutation } from '../../models/gql/remote';
import CardDetail from './card-detail';


const Ul = styled.ul`
  list-style: none;
`;

const Li = styled.li`
  padding: 10px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
  font-weight: 400;
  width: 20%;
  text-align: left;
`;

// const cardStyles = {
//   width: 200,
//   height: 120,
//   margin: 5,
//   background: '#AFC9F1',
//   position: 'relative',
// };

// const Text = styled.span`
//   margin: 5px 5px 5px 10px;
// `;

// const CaseName = styled.h3`
//   margin: 10px;
// `;

// const Button = styled.button`
//   outline: none;
//   height: 39px;
//   width: 85px;
//   margin: 5px;
// `;

// const DetailButton = styled.button`
//   outline: none;
//   margin: 5px;
//   position: absolute;
//   right: 0;
//   width: 60px;
//   height: 30px;
// `;

// // const AddCard = ({ addCard1, addCard2 }) => (
// //   <Button 
// //     onClick={() => {
// //       addCard1();
// //     }}
// //   >
// //     Add Card
// //   </Button>
// // );


// class AddCard extends React.Component {
//   render() {
//     const { addCard1, addCard2 } = this.props;
//     return (
//       <Button 
//         onClick={() => {
//           addCard1();
//         }}
//       >
//         Add Card
//       </Button>
//     );
//   }
// }

// AddCard.propTypes = {
//   addCard1: PropTypes.func.isRequired,
//   addCard2: PropTypes.func.isRequired
// };

// const AddCardWithMutation = graphql(
//   addCardMutation
// )(AddCard);

// // 多个mutation
// const AddCardWithMutations = compose(
//   graphql(addCardMutation, { 
//     props: ({ mutate }) => ({
//       addCard1: () => mutate({
//         variables: { 
//           i: {
//             caseName: "HT-18TEST",
//             name: 'test',
//             sex: 'male'
//           }
//         },
//         optimisticResponse: {
//           addCard: {
//             name: 'test',
//             id: 'tmp',
//             __typename: 'Card'
//           }
//         },
//         update: (cache, { data: { addCard }, loading, error }) => { 
//           if (error) {
//             console.log('add card fail');
//           } else if (addCard) {
//             console.log('add card success');
//           }
//         },
//         refetchQueries: [{ query: cardsListQuery }], // 重新获取
//       })
//     }),
//   }),
//   graphql(addCardMutation, { name: 'addCard2' }) // name为mutate函数名
// )(AddCard);

// const DeleteCard = ({ deleteCard }) => (
//   <Button 
//     onClick={() => {
//       deleteCard();
//     }}
//   >
//     Delete Card
//   </Button>
// );
// DeleteCard.propTypes = {
//   deleteCard: PropTypes.func.isRequired
// };

// const DeleteCardWithMutation = graphql(
//   deleteCardMutation, {
//     props: ({ mutate }) => ({ 
//       deleteCard: () => mutate({
//         variables: { 
//           caseName: "test"
//         },
//         update: (cache, { data: { deleteCard } }) => { // deleteCard为该mutation返回的数据
//           // Read the data from the cache for this query.
//           let { cards } = cache.readQuery({ query: cardsListQuery });
//           cards = cards.slice();
//           if (cards) {
//             cards.splice(0, 1);
//           }
//           // Write the data back to the cache.
//           cache.writeQuery({ 
//             query: cardsListQuery,
//             data: { cards }
//           });
//         }
//       })
//     }),
//   }
// )(DeleteCard);

// // eslint-disable-next-line
// class Card extends React.Component {
//   state = {
//     isShowDetail: false,
//   }

//   render() {
//     const { 
//       id, caseName, name, sex
//     } = this.props;
//     const { isShowDetail } = this.state;
//     return (
//       <VContainer style={cardStyles}>
//         <CaseName>
//           {caseName}
//         </CaseName>
//         <Text>
//           {`Name: ${name}`}
//         </Text>
//         <Text>
//           {`Sex: ${sex}`}
//         </Text>
//         <DetailButton onClick={() => this.setState({ isShowDetail: !isShowDetail })}>
//           详情
//         </DetailButton>
//         {
//           isShowDetail && <CardDetail cardId={id} />
//         }
//       </VContainer>
//     );
//   }
// }


// Card.propTypes = {
//   id: PropTypes.string.isRequired,
//   caseName: PropTypes.string.isRequired,
//   sex: PropTypes.string.isRequired,
//   name: PropTypes.string.isRequired,
// };


const ChannelsList = ({ data: { loading, error, channels } }) => {
  if (loading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  return (
    <Ul>
      { 
        channels.map(ch => <Li key={ch.id}>{ch.name}</Li>) 
      }
    </Ul>);
};

ChannelsList.propTypes = {
  data: PropTypes.object.isRequired,
};

const ChannelsListWithData = graphql(channelsListQuery, {
  // options: { pollInterval: 500 } // 5s拉取一次数据
})(ChannelsList);

export default ChannelsListWithData;