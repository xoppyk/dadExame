export default function(Vue) {
  Vue.auth = {
    setToken(token, expiration) {
      localStorage.setItem('token', token);
      localStorage.setItem('expiration', expiration);
    },

    getToken() {
      var token = localStorage.getItem('token')
      var expiration = localStorage.getItem('expiration')

      if (!token || !expiration) {
        return null
      }

      if (Date.now() > parseInt(expiration)) {
        this.destroyToken()
        return null
      } else {
        return token;
      }
    },

    destroyToken() {
      localStorage.removeItem('token');
      localStorage.removeItem('expiration');
      localStorage.removeItem('player');
    },

    isAuthenticated() {
      if (this.getToken()) {
        return true;
      }
      return false;
    },
    setAuthentifiedUser(currentPlayer) {
      var user = {
        'id': currentPlayer.id,
        'name': currentPlayer.name,
        'nickname': currentPlayer.nickname,
        'email': currentPlayer.email,
        'total_points': currentPlayer.total_points,
        'total_games_played': currentPlayer.total_games_played,
      };
      localStorage.setItem('player', JSON.stringify(user));
    },

    getAuthentifiedUser() {
      var user = localStorage.getItem('player');
      return JSON.parse(user);
    },
  }
  Object.defineProperties(Vue.prototype, {
    $auth: {
      get() {
        return Vue.auth
      }
    }
  })
}
