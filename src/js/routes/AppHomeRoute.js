import Relay from 'react-relay';

export default class extends Relay.Route {
  static path = '/';
  static routeName = 'AppHomeRoute';
  static queries = {
    game: () => Relay.QL`
      query {
        game
      }
    `,
  };
}
