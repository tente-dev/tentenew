export const EmailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/
export const OneLowerCaseAtLeastRegEx = /^(?=.*[a-z])/
export const OneUpperCaseAtLeastRegEx = /^(?=.*[A-Z])/
export const OneNumericCharAtLeastRegEx = /^(?=.*[0-9])/
export const OneSpecialCharAtLeastRegEx =
  /[ !"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]/
export const PhoneNumberRegEx =
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
