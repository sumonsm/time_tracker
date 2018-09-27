export function authHeader() {
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.access_token) {
        return {
          'Content-Type': 'application/json',
          'access-token':user.access_token,
          'client': user.client,
          'uid': user.uid
       };
    } else {
        return {};
    }
}
