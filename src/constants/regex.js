export const COMMON_REX = {
    GMAIL: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
    ONLYSTRING: /^[a-zA-Z\s]+$/,
    PHONENUMBER: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
    WEBSITE: /^(ftp|http|https):\/\/[^ "]+|^www\.[^ "]+$/,
    ONLYNUMBER:/^\d+$/
};

export const API_HUB = {
    SIGNUP :"http://35.89.149.162:4040/api/v1/auth/signup",
    SIGNIN :"http://35.89.149.162:4040/api/v1/auth/signin",
    FORGETPASSWORD : "http://35.89.149.162:4040/api/v1/auth/forgot/password/send"
}

export const WORD_PRESS_API ={
    GRAPHQL : "https://projectsdemo.link/demo1/graphql"
}