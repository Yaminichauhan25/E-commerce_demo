import * as dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file
export const constants = {
    statusCode: {
      invalid: 400,
      loginFailed: 401,
      success: 200,
      alreadyLoggedIn: 406,
      alreadyExist: 409,
      notFound: 404,
      gone: 410,
      internalServerError: 500,
    },
  
    message: {
      success: "success",
      serverRunning: "server is running on port",
      signedup: "signedup successfully",
      connection: "connection successful!",
      exist: "user already exit",
      notExist:"User does not exist"
    },
  
    status: {
      true: true,
      false: false,
    },
  };
  export const APP_CONFIG = {
      dbConnection: process.env.DB_URL,
      port:process.env.PORT,
      url:process.env.URL,
      jwt_secret:process.env.JWT_SECRET,
      accountSid:process.env.ACCOUNT_SID,
      authToken:process.env.AUTH_TOKEN
  };