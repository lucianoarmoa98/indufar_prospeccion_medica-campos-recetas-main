import {ForgotPasswordPageConfig} from './auth/forgot-password/ForgotPasswordPageConfig';
import {RegisterPageConfig} from './auth/register/RegisterPageConfig';
import {ResetPasswordPageConfig} from './auth/reset-password/ResetPasswordPageConfig';
import {LoginPageConfig} from './auth/login/LoginPageConfig';
import {MailConfirmPageConfig} from './auth/mail-confirm/MailConfirmPageConfig';
import {LockPageConfig} from './auth/lock/LockPageConfig';
import {Login2PageConfig} from './auth/login-2/Login2PageConfig';
import {Register2PageConfig} from './auth/register-2/Register2PageConfig';
import {ForgotPassword2PageConfig} from './auth/forgot-password-2/ForgotPassword2PageConfig';
import {ResetPassword2PageConfig} from './auth/reset-password-2/ResetPassword2PageConfig';
import {Error404PageConfig} from './errors/404/Error404PageConfig';
import {Error500PageConfig} from './errors/500/Error500PageConfig';

export const pagesConfigs = [
  LoginPageConfig,
  RegisterPageConfig,
  ResetPasswordPageConfig,
  ForgotPasswordPageConfig,
  MailConfirmPageConfig,
  LockPageConfig,
  Login2PageConfig,
  Register2PageConfig,
  ForgotPassword2PageConfig,
  ResetPassword2PageConfig,
  Error404PageConfig,
  Error500PageConfig
];
