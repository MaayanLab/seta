import Relay from 'react-relay';

export default {
  category: () => Relay.QL`query {
    category(tag: $categoryTag)
  }`,
};
