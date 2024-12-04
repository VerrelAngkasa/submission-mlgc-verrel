const predictCancerHandler = require('../server/handler');
const getPredictHistories = require('../services/storeData');

const routes = [
    {
        method: 'POST',
        path: '/predict',
        handler: predictCancerHandler,
        options: {
            payload: {
                allow: 'multipart/form-data',
                multipart: true,
                maxBytes: 1000000
            }
        }
    },
    {
        method: 'GET',
        path: '/predict/histories',
        handler: getPredictHistories.getHistories,
    }
];

module.exports = routes;