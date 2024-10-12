class UrlService {
  endpoint = {
    base: 'http://localhost:8080',
    path: {
      login: 'auth/login',
      users: 'api/users'
    }
  }
}

export {UrlService}