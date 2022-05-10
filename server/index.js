const path = require("path");
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "data.json"));
const middlewares = jsonServer.defaults();
const data = require("./data.json");

server.use(middlewares);

server.get("/echo", (req, res) => {
  res.jsonp(req.query);
});

server.use(jsonServer.bodyParser);

router.render = (req, res) => {
  if (req.method === "GET" && !req.params.id) {
    var obj = {};
    obj.data = res.locals.data;
    obj.total = data.pigeons.length;
    res.jsonp(obj);
  } else {
    res.jsonp(res.locals.data);
  }
};

server.use(router);
server.listen(3002, () => {
  console.log("JSON Server is running on port 3002");
});
