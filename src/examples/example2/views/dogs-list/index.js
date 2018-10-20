
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { graphql, Query } from 'react-apollo';
import { LineContainer, VContainer, FlexContainer } from '@xinghunm/widgets';
import { dogsListQuery } from '../../models/local';

const cardStyles = {
  width: 200,
  height: 110,
  margin: 5,
  background: '#AFC9F1',
};

const Select = styled.select`
  margin: 0 10px;
  width: 150px;
  height: 42px;
  font-size: 20px;
`;


const Text = styled.span`
  margin: 5px 5px 5px 10px;
`;

const Button = styled.button`
  outline: none;
  height: 39px;
  width: 85px;
  margin: 5px;
`;

const Dog = ({ breed, name, age }) => (
  <VContainer style={cardStyles}>
    <Text>
      {`Breed: ${breed}`}
    </Text>
    <Text>
      {`Name: ${name}`}
    </Text>
    <Text>
      {`Age: ${age}`}
    </Text>
  </VContainer>
);

Dog.propTypes = {
  breed: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

const DogInfo = ({ breed }) => (
  <Query query={dogsListQuery} variables={{ breed }}>
    {
      ({ loading, error, data }) => {
        if (loading) {
          return <p>Loading</p>;
        }
        if (error) {
          return <p>{error.message}</p>;
        }
        return (
          <Text>
            {`this is ${breed} dog.`}
          </Text>);
      }
    }
  </Query>
);

DogInfo.propTypes = {
  breed: PropTypes.string.isRequired,
};

const DogsList = ({ onDogSelected }) => (
  <Query query={dogsListQuery}>
    {
      ({ data: { loading, error, dogs } }) => {
        if (loading) {
          return <p>Loading</p>;
        }
        if (error) {
          return <p>{error.message}</p>;
        }
        return (
          <VContainer>
            <Text>
              Dogs:
            </Text>
            <Select onChange={onDogSelected}>
              {
                dogs && dogs.map(dog => (
                  <option key={dog.id}>
                    {dog.breed}
                  </option>
                ))
              }
            </Select>
          </VContainer>
        );
      }
    }
  </Query>
);

DogsList.propTypes = {
  onDogSelected: PropTypes.func.isRequired
};


class Wrapper extends React.Component {
  state = {
    selectedDog: null,
  }

  onDogSelected = ({ target }) => {
    this.setState({ selectedDog: target.value });
  }

  render() {
    const { selectedDog } = this.state;
    return (
      <VContainer style={{ margin: '0 20px' }}>
        <DogsList onDogSelected={this.onDogSelected} />
        {selectedDog && (
          <DogInfo breed={selectedDog} />
        )}
      </VContainer>);
  }
}

 
export default Wrapper;