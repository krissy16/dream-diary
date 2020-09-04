import config from '../config';

const AuthApiService = {
  postLogin(credentials) {
    return fetch(`${config.API_ENDPOINT}/auth/login`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${config.API_KEY}`
      },
      body: JSON.stringify(credentials),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      );
  },
  postUser(user) {
         return fetch(`${config.API_ENDPOINT}/users`, {
           method: 'POST',
           headers: {
             'content-type': 'application/json',
             'Authorization': `Bearer ${config.API_KEY}`
           },
           body: JSON.stringify(user),
         })
           .then(res =>
             (!res.ok)
               ? res.json().then(e => Promise.reject(e))
               : res.json()
           );
       },
}

export default AuthApiService;