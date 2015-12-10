import React from 'react';
import Relay from 'react-relay';
import CheckHidingSpotForTreasureMutation from '../mutations/CheckHidingSpotForTreasureMutation';

class App extends React.Component {
  render() {

  }
}

export default Relay.createContainer(App, {
  fragments: {
    game: () => Relay.QL`
      fragment on Game {
        turnsRemaining,
        hidingSpots(first: 9) {
          edges {
            node {
              id,
              hasBeenChecked,
              hasTreasure,
              ${CheckHidingSpotForTreasureMutation.getFragment('hidingSpot')},
            },
          },
        },
        ${CheckHidingSpotForTreasureMutation.getFragment('game')},
      }
    `,
  },
});
