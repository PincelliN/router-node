const fs = require("fs");

function handleRequest(req, res) {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.setHeader("Content-Type", "text/html; charset=UTF-8");
    res.write("<!DOCTYPE html>");
    res.write("<html>");
    res.write("<head>");
    res.write("<meta charset='UTF-8'>");
    res.write("<title> First Router Alone </title>");
    res.write("</head>");
    res.write("<body>");
    res.write("<h1> First Router Node.js</h1>");
    res.write(
      "<form action='/create-users' method='POST'> " +
        "<label for='username'>UserName</label> " +
        "<input type='text' name='username'> " +
        "<button type='submit'>Create</button> " +
        "</form>"
    );
    res.write("</body>");
    res.write("</html>");
    return res.end();
  }

  if (url === "/create-users" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      console.log("User creato:", decodeURIComponent(message)); // decodifica caratteri tipo %20
      res.statusCode = 302;
      res.setHeader("Location", "/");
      res.end();
    });
  }

  if (url === "/users") {
    res.setHeader("Content-Type", "text/html; charset=UTF-8");
    res.write("<!DOCTYPE html>");
    res.write("<html>");
    res.write("<head>");
    res.write("<meta charset='UTF-8'>");
    res.write("<title> First Router Alone </title>");
    res.write("</head>");
    res.write(
      "<body><ul> <li>Nicolò Pincelli</li> <li>Marika Keller</li> <li>Evelyn Pincelli</li> <li>Gino Pino</li> </ul> </body>"
    );
    res.write("</html>");
    return res.end();
  }

  // Rotta non trovata
  res.statusCode = 404;
  res.setHeader("Content-Type", "text/html; charset=UTF-8");
  res.write("<html><body><h1>404 Not Found</h1></body></html>");
  res.end();
}

module.exports = handleRequest;
