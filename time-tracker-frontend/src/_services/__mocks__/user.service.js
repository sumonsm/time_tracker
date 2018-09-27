export const userService = {
    login,
    logout
};

const fakeLoginData = {};
const fakeLogoutData = {};

async function login() {
  return await new Promise(resolve => {
    resolve(fakeLoginData);
  });
};

async function logout() {
  return await new Promise(resolve => {
    resolve(fakeLogoutData);
  });
};
