const express = require("express");
require("dotenv").config();

//crear el servidor de express

const app = express();

//directorio publico
app.use(express.static("public"));

//lectura y parseo body

app.use(express.json());
//rutas
app.use("/api/auth", require("./routes/auth"));
// app.get("/", (req, res) => {
//   console.log("se requier el /");
//   res.json({
//     ok: true,
//   });
// });

// escuchar peticiones

app.listen(process.env.PORT, () => {
  console.log(`servidor corriendo en el pruerno ${process.env.PORT}`);
});
