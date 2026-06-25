export interface registrationDTO {
  name: string;
  email: string;
  password: string;
}


export interface verifyDTO{
  email: string 
  code: string
}


export interface loginDTO extends registrationDTO {
  email: string;
  passowrd: string;
}
