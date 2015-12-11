import {
  connectionDefinitions,
} from 'graphql-relay';

const { connectionType: hidingSpotConnection } = connectionDefinitions({
  name: 'HidingSpot',
  nodeType: hidingSpotType,
});
