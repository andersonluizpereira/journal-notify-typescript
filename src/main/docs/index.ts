import paths from './paths'
import components from './components'
import schemas from './schemas'
export default {
  openapi: '3.0.0',
  info: {
    title: 'Ads - Modelo de API',
    description: 'Essa é a documentação da API NodeJs usando Typescript, TDD, Clean Architecture e seguindo os princípios do SOLID e Design Patterns.',
    version: '1.0.0',
    contact: {
      name: 'Anderson Pereira',
      email: 'andy2903.alp@gmail.com',
      url: 'https://www.linkedin.com/in/anderson-luiz-sanches-carlucci-pereira-b792b130/'
    },
    license: {
      name: 'GPL-3.0-or-later',
      url: 'https://spdx.org/licenses/GPL-3.0-or-later.html'
    }
  },
  servers: [{
    url: '/api',
    description: 'Servidor Principal'
  }],
  tags: [{
    name: 'Login',
    description: 'APIs relacionadas a Login'
  }],
  paths,
  schemas,
  components
}
