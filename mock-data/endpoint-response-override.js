const express = require('express');

const overrideRouter = express.Router();

const endpointsOverride = [[]];

const responseOverrideMiddleware = (req, res, next) => {
    const parallelIndex = parseInt(req.headers['x-parallel-index'] ?? '0');
    if( endpointsOverride[parallelIndex]) {
        const found = endpointsOverride[parallelIndex].find(({url:overrideUrl, method:overrideMethod}) => req.url.match(overrideUrl) && req.method === overrideMethod);
        if(found) {
            const { response } = found;
            return res.status(response.status).jsonp(response.body);
        }
    }
    return next();
};

overrideRouter.post('/register', (req, res, next) => {
    const { body } = req;
    const { url, method, response } = body;
    const parallelIndex = parseInt(req.headers['x-parallel-index'] ?? '0');
    if(endpointsOverride[parallelIndex] === undefined) {
        endpointsOverride[parallelIndex] = [];
    }
    endpointsOverride[parallelIndex].push({url, method: method.toUpperCase(), response});
    res.status(200).jsonp({message: 'Override endpoint Success'});
});

overrideRouter.post('/reset', (req, res, next) => {
  const parallelIndex = parseInt(req.headers['x-parallel-index'] ?? '0');
  if(endpointsOverride[parallelIndex]) {
    endpointsOverride[parallelIndex] = [];
  };
  res.status(200).jsonp({message: 'Reset Endpoints Success'});
});

module.exports = {
    overrideRouter,
    responseOverrideMiddleware
}