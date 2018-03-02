module.exports = exports = function api(server) {
  server.get('/api-demo/:idx', (req, res) => {
    const actualPage = '/api-demo/detail';
    const message = req.body.message;
    const queryParams = {postIndex: req.params.idx};

    app.render(req, res, actualPage, queryParams);
  });
};
