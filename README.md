# Teste teddy-finance

### Esse é meu resultado do teste proposto pela teddy-finance

Decidi utilizar os princípios SOLID para construção dessa aplicação e para isso utilizei a arquitetura limpa, mesmo que seja uma aplicação pequena gosto de usar pois a manutenção da mesma fica mais fácil e se torna mais simples para escala-la. Essa facilidade se deve principalmente pela inverção de dependencia e para isso utilizei a lib Tsrynge a fim de tornar esse processo mais fácil

### Nesta aplicação foram utilizadas as seguintes tecnologias:

- Typescript
- Tsyring
- Express
- Prisma ORM
- Jest
- Husky
- Prettier
- Docker
- Zod

### Passo-a-Passo para iniciar localmente

A imagem docker na aplicação permite que o projeto seja executado apenas com o docker instalado. Para isso basta executar o comando

```
docker-compose up --build
```

Com isso as rotas já estrão disponíveis, mas caso queira inicar o projeto direto no seu OS deve comentar o service app no arquivo do docker-compose, criar um arquivo .env e copiar o que há dentro do .env.example e depois basta rodar os seguintes comandos

```
docker-compose up -d

npm i

PRISMA_SCHEMA_PATH=./src/infrastructure/database/prisma/schema.prisma npx prisma db pull

npm run start:dev
```

O terceiro comando serve para rodar as migrations e criar as tabelas no banco de dados. Se tudo correu bem o console irá imprimir uma imagem que a aplicação está rodando na porta local

Para acessar a documentação basta acessar localhost:3000/api-docs, lá pode ser encontrado todas as rotas

Toda a aplicação está exatamente de acordo com o que se pediu sobre a questão das url encurtadas.

Sobre as rotas

## Usuários

#### -POST(/api/user) - criação de novo usuário

exemplo:

```
{
    "name":"vitor",
    "password": "120200",
    "email": "victor@4email.com"
}
```

## Autenticação

#### POST(/api/auth/login)-Gerar token de acesso

exemplo:

```
{
    "password": "secret",
    "email": "victor3@email.com"
}
```

## URL

#### POST (api/url/shorten) cria nova url encurtada

Se o usuário estiver autenticado irá salvar no banco de dados, caso contrário o link ficara em cache por 10 minutos
Exemplo:

```
{
    "completeUrl":"https//www.google.com/"
}
```

#### GET - (api/url) buscas todas as url cadastradas no banco

Essa rota é protegida para que apenas usuários atenticados possam utilizar

#### PATCH - (/api/url/:id) Atualiza uma URL

Essa rota é protegida para que apenas usuários atenticados possam utilizar

#### DELETE - (/api/url/:id) Exclui lógicamente uma URL

Essa rota é protegida para que apenas usuários atenticados possam utilizar

Aos avaliadores espero que gostem do meu resultado, me empenhei muito para podeser concluir, além do entrega principal consegui colocar alguns direfencias como:

- Utilizar docker-compose para subir o ambiente completo localmente.
- Ter testes unitários
- API está documentada com OPEN API ou Swagger
- Ter validação de entrada em todos os lugares necessários.
- Git tags
- Configurar pré commit ou pre push hooks.
- Código tolerante a falhas (middleware de erros trata os erros sem quebrar a aplicação).
  gostaria muito de ter adiciona mais diferencias porém não houve tempo hábil

Estou muito contente do que pude entregar, espero um retorno da equipe, desde já agradeço.