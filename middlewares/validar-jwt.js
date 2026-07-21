const { response } = require("express");
const jwt = require("jsonwebtoken");

const validatJWT = (req, res = response, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({
      ok: false,
      msg: "No hay token en la petición",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const { uid, name } = jwt.verify(token, process.env.SECRET_JWT_SEED);
    console.log(uid, name);
    ((req.uid = uid), (req.name = name));
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "Token no valido",
    });
  }
  console.log(token);

  next();
};

module.exports = {
  validatJWT,
};
