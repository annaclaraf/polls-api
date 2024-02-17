import fastify from 'fastify';

const app = fastify();

app.listen({ port: 3333 }).then(() => {
  console.log('server listening at port 3333');
});

app.get('/', () => {
  return 'hello world';
});