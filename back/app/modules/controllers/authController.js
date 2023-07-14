import { AuthService } from '../services/authService.js';
import {
  statusCodes,
  TOKEN_EXPIRY_TIME,
} from '../../utils/core/genericConstants.js';
import { sendError, sendResponse } from '../../utils/utils/httpUtils.js';
import { generateToken } from '../../utils/utils/jwtUtils.js';
import { EmailService } from '../services/emailService.js';
export class AuthController {
  static register = async (req, res) => {
    try {
      const newUser = await AuthService.registerUser(req.body);
      sendResponse(
        res,
        statusCodes.STATUS_OK,
        `${newUser.pseudo} was registered successfully!`
      );
    } catch (err) {
      console.log(err);
      sendError(
        res,
        statusCodes.STATUS_INTERNAL_SERVER_ERROR,
        'There was a problem with registration.'
      );
    }
  };

  static login = async (req, res) => {
    try {
      const user = await AuthService.loginUser(req.body, req.models);

      let token = generateToken(
        { id: user.id, pseudo: user.pseudo },
        TOKEN_EXPIRY_TIME
      );

      sendResponse(res, statusCodes.STATUS_OK, 'Login successful', {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        token: token,
      });
    } catch (err) {
      console.log(err);

      sendError(
        res,
        statusCodes.STATUS_INTERNAL_SERVER_ERROR,
        'There was a problem with login.'
      );
    }
  };

  static logout = async (req, res) => {
    try {
      const user = await AuthService.logoutUser(req.userId, req.models);

      sendResponse(
        res,
        statusCodes.STATUS_OK,
        `l'utilisateur avec l'id ${user.id} a été deconnecté`
      );
    } catch (err) {
      console.log(err);

      sendError(
        res,
        statusCodes.STATUS_INTERNAL_SERVER_ERROR,
        'Une erreur est survenue lors de la déconnexion'
      );
    }
  };

  static forgotPassword = async (req, res) => {
    try {
      const { user, token } = await AuthService.processForgotPassword(
        req.body.email,
        req.models
      );

      const { error } = await EmailService.sendPasswordResetEmail(
        user,
        token,
        req
      );
      if (error) {
        return sendError(
          res,
          statusCodes.STATUS_INTERNAL_SERVER_ERROR,
          'Error occurred while sending password reset email.'
        );
      } else {
        return sendResponse(
          res,
          statusCodes.STATUS_OK,
          'Password reset email sent.'
        );
      }
    } catch (err) {
      console.log(err);

      sendError(
        res,
        statusCodes.STATUS_INTERNAL_SERVER_ERROR,
        'Error occurred while processing password reset request.'
      );
    }
  };
}
