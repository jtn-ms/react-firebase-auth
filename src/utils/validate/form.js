const minlength = 6;

export const isValidEmail = (email) => (
  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
)

export const isValidPassword = (password) => {
  // return /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_]+)/.test(password)
  //  && password.length >= minlength
  return password.length >= minlength
}

export const  promptChkEmail= (email) => (
  isValidEmail(email)?null:"Please enter a valid email address."
)

export const promptChkPwd = (password) => {
  // if (!password.match(/[a-z]/g)) {
  //   return "password must involve at least one lowercase letter";
  // }
  // if (!password.match(/[A-Z]/g)) {
  //   return "password must involve at least one uppercase letter";
  // }
  // if (!password.match(/[0-9]/g)) {
  //   return "password must involve at least one lowercase digit";
  // }
  // if (!password.match(/[\W_]+/g)) {
  //   return "password must involve at least one non-alphanumeric character";
  // }
  if (password.length < minlength) {
    return `password's length must be greater than or equal to ${minlength} characters`
  }
  return null;
}

export const validatePasswordDetailed = (password) => {
  let res = {
    lowercase: false,
    uppercase: false,
    length: false,
    number: false,
    nonalphanumeric: false
  }
  if (password.match(/[a-z]/g)) {
    res.lowercase = true;
  }
  if (password.match(/[A-Z]/g)) {
    res.uppercase = true;
  }
  if (password.match(/[0-9]/g)) {
    res.number = true;
  }
  if (password.match(/[\W_]+/g)) {
    res.nonalphanumeric = true;
  }
  if (password.length >= minlength) {
    res.length = true;
  }
  return res;
}

