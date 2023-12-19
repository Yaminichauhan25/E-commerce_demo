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
      unauthorized:"Unauthorized" ,
      serverRunning: "server is running on port",
      signedup: "signedup successfully",
      login:"Loggedin successfully",
      logout:"Logout successful",
      connection: "connection successful!",
      exist: "user already exit",
      notExist:"User does not exist",
      updateProfile: "profile updated successfully",
      addAddress:"address saved successfuly",
      invalidIdFormat:"Invalid address ID format",
      addressNotFound:"Address not found",
      addressUpdated:"Address updated successfully",
      error:"Internal server error",
      productAdded: "new product added successfully",
      addedToCart:"successfully added to cart",
      removeFromcart:"removed successfully",
      productExist:"Product already exist",
      wishlistCreated:"New wishlist created and product added",
      productAddedToExistingWishlist:"Product added to existing wishlist",
      passwordNotMatched:"Password does not match",
      errorSendingOtp:"Error sending OTP",
      otpSent: "otp sent",
      passwordUpdated:'password updated',
      enterSamePassword:'enter same password'
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