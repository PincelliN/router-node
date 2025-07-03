const fs = require("fs"); // (Non usato al momento, ma importato per possibili letture/scritture su file)

function handleRequest(req, res) {
  const url = req.url; // Ottiene l'URL della richiesta (es: "/", "/users")
  const method = req.method; // Ottiene il metodo HTTP usato (GET, POST, ecc.)

  // --- Rotta principale ---
  if (url === "/") {
    res.setHeader("Content-Type", "text/html; charset=UTF-8"); // Imposta l'header per dire al browser che invii HTML con codifica UTF-8
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
    return res.end(); // Termina la risposta
  }

  // --- Rotta per gestire l'invio del form (POST) ---
  if (url === "/create-users" && method === "POST") {
    const body = []; // Array per raccogliere i "chunk" di dati inviati

    // Evento che si attiva quando arriva un pezzo di body
    req.on("data", (chunk) => {
      body.push(chunk);
    });

    // Evento che si attiva quando tutta la richiesta è stata ricevuta
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString(); // Concatena e converte il buffer in stringa
      const message = parsedBody.split("=")[1]; // Estrae il valore del campo "username"
      console.log("User creato:", decodeURIComponent(message)); // Stampa l'utente, decodificando eventuali caratteri speciali

      // Redirect alla home page dopo l'invio
      res.statusCode = 302; // Codice per redirezione temporanea
      res.setHeader("Location", "/"); // Indica dove reindirizzare
      res.end(); // Termina la risposta
    });
  }

  // --- Rotta "/users" per mostrare lista utenti fissa ---
  if (url === "/users") {
    res.setHeader("Content-Type", "text/html; charset=UTF-8");
    res.write("<!DOCTYPE html>");
    res.write("<html>");
    res.write("<head>");
    res.write("<meta charset='UTF-8'>");
    res.write("<title> First Router Alone </title>");
    res.write("</head>");
    res.write(
      "<body><ul> " +
        "<li>Nicolò Pincelli</li> " +
        "<li>Marika Keller</li> " +
        "<li>Evelyn Pincelli</li> " +
        "<li>Gino Pino</li> " +
        "</ul> </body>"
    );
    res.write("</html>");
    return res.end(); // Termina la risposta
  }

  // --- Gestione 404: rotta non trovata ---
  res.statusCode = 404; // Codice HTTP 404 = Not Found
  res.setHeader("Content-Type", "text/html; charset=UTF-8");
  res.write("<html><body><h1>404 Not Found</h1></body></html>");
  res.end();
}

module.exports = handleRequest; // Esporta la funzione per essere usata in altri file (es. server.js)
