"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
const twilio_1 = __importDefault(require("twilio"));
const constant_1 = require("../constants/constant");
const phoneNumberUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
const PhoneNumberFormat = require('google-libphonenumber').PhoneNumberFormat;
// Your Twilio credentials
const accountSid = constant_1.APP_CONFIG.accountSid;
const authToken = constant_1.APP_CONFIG.authToken;
const twilioClient = (0, twilio_1.default)(accountSid, authToken);
dotenv_1.default.config();
const user = String(process.env.EMAIL);
const pass = String(process.env.PASSWORD);
let transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: user,
        pass: pass,
    },
});
class userServiceClass {
    //send email
    sendEmail(email, link) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mail = yield transporter.sendMail({
                    from: user,
                    to: email.email,
                    subject: "Link for Mail verification is:",
                    html: "Hello,<br> Please Click on the link to verify your email.<br><a href=" +
                        link +
                        ">Click here to verify</a>",
                });
                console.log("email sent sucessfully");
                return Promise.resolve(mail);
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    //   async sendOtpByEmail(otp: any, email: any) {
    //     try {
    //       var mailOptions = {
    //         to: email,
    //         subject: "Otp for verification is: ",
    //         html:
    //           "<h3>OTP for Reset yor password</h3>" +
    //           "<h1 style='font-weight:bold;'>" +
    //           otp +
    //           "</h1>", // html body
    //       };
    //       transporter.sendMail(mailOptions, (error: any, info: any) => {
    //         if (error) {
    //           console.log(error);
    //           Promise.reject(error);
    //         }
    //         Promise.resolve(otp);
    //       });
    //     } catch (err: any) {
    //       console.log(err);
    //       return err;
    //     }
    //   }
    sendOtpByEmail(otp, email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mailOptions = {
                    to: email,
                    subject: "Otp for verification is: ",
                    html: `<h3>OTP for Reset your password</h3><h1 style='font-weight:bold;'>${otp}</h1>`,
                };
                const info = yield transporter.sendMail(mailOptions);
                console.log("Message sent: %s", info.messageId);
                return otp;
            }
            catch (err) {
                console.error("Error sending OTP email:", err.message);
                throw err;
            }
        });
    }
    // Function to send OTP via SMS
    sendOtpBySMS(otp, phoneNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(phoneNumber);
            try {
                // Parse and format the phone number
                const parsedPhoneNumber = phoneNumberUtil.parseAndKeepRawInput(phoneNumber, '91'); // Change 'IN' to the appropriate country code
                const formattedPhoneNumber = phoneNumberUtil.format(parsedPhoneNumber, PhoneNumberFormat.E164);
                console.log(formattedPhoneNumber);
                const message = yield twilioClient.messages.create({
                    body: `Your OTP is: ${otp}`,
                    from: '+17632735566',
                    to: formattedPhoneNumber,
                });
                console.log(`OTP sent successfully: ${message.sid}`);
                return true;
            }
            catch (error) {
                console.error("Error sending OTP via SMS:", error.message);
                return false;
            }
        });
    }
}
exports.userService = new userServiceClass();
