// This page is to create API links for mapping and data fetching in client side

export const HOST = "http://localhost:3007";

const AUTH_ROUTE = `${HOST}/api/auth`;
const MESSAGES_ROUTE = `${HOST}/api/messages`


// API to check user is new or old 
export const CHECK_USER_ROUTE = `${AUTH_ROUTE}/check-user`
// API for user who is signed in 
export const ONBOARD_USER_ROUTE = `${AUTH_ROUTE}/onboard-user`

// API for all contacts and users 
export const GET_ALL_CONTACTS = `${AUTH_ROUTE}/get-contacts`

// API for messages 
export const ADD_MESSAGE_ROUTE = `${MESSAGES_ROUTE}/add-message`

export const GET_MESSAGES_ROUTE = `${MESSAGES_ROUTE}/get-messages`