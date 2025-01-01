const jsonServer = require('json-server');
const initialData = require('./db.json');
const { overrideRouter, responseOverrideMiddleware } = require('endpoint-response-override');

const server = jsonServer.create();

// setup memory database, make sure to clone the data to avoid mutation
const router = jsonServer.router(structuredClone(initialData));

const middlewares = jsonServer.defaults();

// Add responseOverrideMiddleware to the server
server.use(responseOverrideMiddleware);

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post('/resetdb', (req, res, next) => {
    router.db.setState(structuredClone(initialData));
    res.jsonp(router.db.getState());
});

server.use('/override', overrideRouter);
server.use(router);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});