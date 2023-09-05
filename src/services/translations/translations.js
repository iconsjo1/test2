import * as AuthTranslationsEn from './Auth/en';
import * as AuthTranslationsAr from './Auth/ar';
import * as MainTranslationsEn from './main/en';
import * as MainTranslationsAr from './main/ar';
import * as PaymentTranslationsEn from './payments/en';
import * as PaymentTranslationsAr from './payments/ar';
import * as LoginTranslationsEn from './login/en';
import * as LoginTranslationsAr from './login/ar';
import * as ForgotPasswordTranslationsEn from './ForgotPassword/en';
import * as ForgotPasswordTranslationsAr from './ForgotPassword/ar';
import * as setPasswordTranslationsEn from './SetPassword/en';
import * as setPasswordTranslationsAr from './SetPassword/ar';
import * as setPasswordSuccessTranslationsEn from './SetPassword/SetPassworSuccess/en';
import * as setPasswordSuccessTranslationsAr from './SetPassword/SetPassworSuccess/ar';
import * as signupTranslationsEn from './SignUp/en';
import * as signupTranslationsAr from './SignUp/ar';
import * as verificationTranslationsEn from './SignUp/SignupVerification/en';
import * as verificationTranslationsAr from './SignUp/SignupVerification/ar';
import * as signupSetPasswordEn from './SignUp/SignupSetPassword/en';
import * as signupSetPasswordAr from './SignUp/SignupSetPassword/ar';
import * as invoiceDetailsEn from './invoiceDetails/en';
import * as invoiceDetailsAr from './invoiceDetails/ar';
import * as invoicesEn from './invoices/en';
import * as invoicesAr from './invoices/ar';
// import * as selectPaymentTypeEn from './selectPaymentType/en';
// import * as selectPaymentTypeAr from './selectPaymentType/ar';
import * as giftShopEn from "./gift'sShop/en";
import * as giftShopAr from "./gift'sShop/ar";

export default {
  en: {
    ...AuthTranslationsEn,
    ...MainTranslationsEn,
    ...PaymentTranslationsEn,
    ...LoginTranslationsEn,
    ...ForgotPasswordTranslationsEn,
    ...setPasswordTranslationsEn,
    ...setPasswordSuccessTranslationsEn,
    ...signupTranslationsEn,
    ...verificationTranslationsEn,
    ...signupSetPasswordEn,

    ...invoiceDetailsEn,
    ...invoicesEn,
    // ...selectPaymentTypeEn,
    ...giftShopEn,
  },
  ar: {
    ...AuthTranslationsAr,
    ...MainTranslationsAr,
    ...PaymentTranslationsAr,
    ...LoginTranslationsAr,
    ...ForgotPasswordTranslationsAr,
    ...setPasswordTranslationsAr,
    ...setPasswordSuccessTranslationsAr,
    ...signupTranslationsAr,
    ...verificationTranslationsAr,
    ...signupSetPasswordAr,

    ...invoiceDetailsAr,
    ...invoicesAr,
    // ...selectPaymentTypeAr,
    ...giftShopAr,
  },
};
