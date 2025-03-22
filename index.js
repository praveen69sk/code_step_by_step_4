import express from "express";
import jwt from "jsonwebtoken";

const app = express();
const secretKey = "secretkey";

app.use(express.json());

const verifyToken = (req, resp, next) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const token = bearerHeader.split(" ")[1];
    req.token = token;
    next();
  } else {
    resp.json({
      message: "Invalid Token!",
    });
  }
};

app.get("/", (req, resp) => {
  resp.json({ name: "Praveen S Kalawad" });
});

app.post("/login", (req, resp) => {
  const user = {
    id: 1,
    name: "praveen s kalawad",
    email: "test123@test.com",
  };

  jwt.sign({ user }, secretKey, { expiresIn: "300s" }, (err, token) => {
    resp.json({
      token,
    });
  });
});

app.post("/profile", verifyToken, (req, resp) => {
  jwt.verify(req.token, secretKey, (err, authData) => {
    if (err) {
      resp.send({
        result: "Invalid Token!",
      });
    } else {
      resp.json({
        message: "Profile Accessed!",
        authData,
      });
    }
  });
});

app.listen(4500);
