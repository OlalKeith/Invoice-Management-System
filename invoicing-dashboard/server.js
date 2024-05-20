const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);

// Enable CORS
server.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://your-vercel-app.vercel.app"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

server.use(router);
server.listen(3000, () => {
  console.log("JSON Server is running");
});
