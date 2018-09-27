function getUserId() {
  var userId;
  if(localStorage.getItem('user')){
    userId = JSON.parse(localStorage.getItem('user')).user_data.id;
  }
  return userId;
}

export const userId = getUserId();
