
const users = [
    { username: 'user1', password: 'password1' },
    { username: 'user2', password: 'password2' },
  ];

  export function checkCredentials(username, password) {
    const user = users.find(
      (user) => user.username === username && user.password === password
    );
  
    return !!user;
  }
  