# Polls 

## 💡 Visão Geral

Este projeto foi desenvolvido durante a "Next Level Week: Expert", um evento promovido pela Rocketseat. A aplicação permite criar e votar em enquetes em tempo real.

## 🚀 Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- **TypeScript**
- **Node.js**
- **Fastify**
- **Docker**
- **Prisma**
- **Postgres**
- **Redis**
- **WebSocket**


## 🛠️ Como Executar

```bash
# Clone o repositório
$ git clone https://github.com/annaclaraf/polls-api.git

# Entre na pasta do projeto
$ cd polls-api

# Instale as dependências
$ npm i

# Renomeie o arquivo de exemplo de variáveis de ambiente
$ mv .env.example .env

# Inicie o serviço do banco de dados com Docker
$ docker-compose up -d

# Execute as migrações do banco de dados com Prisma
$ npx prisma migrate dev

# Execute a aplicação
$ npm run dev
```

> [!NOTE]
>
> A aplicatição estará disponível em http://localhost:3333/