import { auth } from "express-oauth2-jwt-bearer";

const jwtCheck = auth({
  audience: "http://localhost:8000",
  issuerBaseURL: "https://" + process.env.AUTH_BASE_URL,
  tokenSigningAlg: "RS256",
});

export default jwtCheck;
