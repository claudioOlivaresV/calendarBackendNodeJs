const express = require("express");
const { dbConnection } = require("./database/config");
require("dotenv").config();
const cors = require("cors");
//crear el servidor de express

const app = express();

//base de datos

dbConnection();

//CORS

app.use(cors());

//directorio publico
app.use(express.static("public"));

//lectura y parseo body

app.use(express.json());
//rutas
app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));
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
