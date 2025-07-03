const fs = require("fs");

function handleRequest(req, res) {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.write("<html>");
    res.write("<meta charset='UTF-8'>");
    res.write("<head><title> First Router Alone </title><head>");
    res.write("<body> ");
    res.write("<h1> First Router Node.js</h1> ");
    res.write(
      "<form action='/create-users' method='POST'> <label for='username'> UserName</laber> <input type='text' name='username'> <button type='submit'>Create</button> </form>"
    );
    res.write(" </form>");
    res.write("</html>");
    return res.end();
  }

  if (url === "/create-users" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      console.log(message);
      return res.end();
    });
  }

  res.setHeader("Content-Type", "text/html; charset=UTF-8");

  res.write("<html>");
  res.write("<meta charset='UTF-8'>");
  res.write("<head><title> First Router Alone </title><head>");
  res.write(
    "<body><ul> <li>Nicolò Pincelli</li> <li>Marika Keller</li> <li>Evelyn Pincelli</li> <li>Gino Pino</li> </ul> </body>"
  );
  res.write("</html>");
  res.end();
}

module.exports = handleRequest;
