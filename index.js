const jsonServer = require("json-server");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const os = require("os");

fs.copyFile("db.json", os.tmpdir() + "/db.json", function (err) {
  if (err) console.log(err);
  else console.log("copy file succeed to" + os.tmpdir());
});

const server = jsonServer.create();
const router = jsonServer.router(path.resolve(os.tmpdir() + "/db.json"), {
  _isFake: false,
});
const middlewares = jsonServer.defaults();

server.use(cors());
server.use(jsonServer.bodyParser);
server.use(middlewares);
server.use(router);

const PORT = 8000;

server.listen(process.env.PORT || PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`);
});
