import axios from 'axios';
import { apiUrl } from '../_helpers';

export const userService = {
    login,
    logout
};

function login(email, password) {
  const requestOptions = {
      method: 'POST',
      url: `${apiUrl}/auth/sign_in`,
      headers: { 'Content-Type': 'application/json' },
      data: { email: email, password: password }
  };
  return axios(requestOptions)
    .then(function (response) {
      if(response.headers['access-token']){
        localStorage.setItem('user', JSON.stringify({
          user_data: response.data.data,
          access_token: response.headers['access-token'],
          client: response.headers['client'],
          uid: response.headers['uid']
        }));
        window.location.reload(true);
      }else{
        logout();
        window.location.reload(true);
      }
    })
    .catch(function (error) {
      console.log("Error", error);
    });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}
