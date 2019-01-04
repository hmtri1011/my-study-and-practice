export const FAKE_USER = {
  firstName: 'Tri',
  lastName: 'Hoang',
  username: 'hmtri',
  avatar: 'https://avatars3.githubusercontent.com/u/16288424?s=32'
}

export function login(username, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === 'hmtri' && password === 'hmtri') {
        resolve(FAKE_USER)
      } else {
        reject({ message: 'Invalid username or password' })
      }
    }, 300)
  })
}
