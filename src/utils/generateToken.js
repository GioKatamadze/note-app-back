import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_TOKEN, { expiresIn: "2h" });
};

export default generateToken;
