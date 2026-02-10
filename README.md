<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

<p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    
## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

# 🐳 Conceitos Básicos do Docker

Um container Docker é um **pacote de software com as dependências necessárias para executar um aplicativo específico**. Todas as configurações e instruções para iniciar ou parar containers são **ditadas pela imagem do Docker**. Sempre que um usuário **executa uma imagem**, um **container é criado.**

A principal diferença entre **Docker** e uma **Máquina Virtual**, é que os containers do Docker executam aplicações de forma isolada e leve, compartilhando o sistema operacional do host. Enquanto isso, as máquinas virtuais têm seu próprio sistema operacional, já que simulam um computador inteiro, o que acaba afetando o desempenho e as necessidades de hardware.

É fácil gerenciar containers com a ajuda da API do Docker ou da interface de linha de comando (ILC).

# 📦 Criando Container

**Usando Docker Compose, ou seja, um arquivo docker-compose.yml:**

* Subir os container em modo detached: **docker compose up -d**
* Parar e remover os containers: **docker compose down**
* Será criada uma **network** automática, permitindo que os containers se comuniquem se estiverem conectados nela.

**Sem o arquivo:**

* **Build da imagem** do container: **docker build --tag nome-imagem .** (sendo 'ponto final' o caminho do diretório atual, onde deve estar o Dockerfile)
* Executar com **docker run -p 3000:3000 nome-container** (Porta do seu computador (host) : Porta do container Docker)

# 📋 Comandos Úteis

**Listagem:**

* **docker images** mostra todas imagens
* **docker ps -a** lista todos os containers, enquanto sem **-a** mostrará somente os em execução

**Gerenciando um Container:**

* Parar com **docker stop nome-container**
* Iniciar com **docker start nome-container**
* Reinicialização com **docker restart nome-container**
* Entrar em um container via terminal com **docker exec -it nome-container bash**

**Deletar:**

* Com o container parado, podemos excluir usando seu nome, através de **docker rm nome-container**
* Remover uma imagem é possível com **docker rmi nome-imagem**

# 💾 Database dentro do Container

Para conectar o BD de um container em um **editor SQL**, como o DBeaver, podemos usar **localhost** e porta do host na conexão, ou IP e porta do container. Para a segunda opção, basta digitar **docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' nome-container** e usar o IP retornado
