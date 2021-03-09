export const HTTP_SUCCESS = 200
export const HTTP_CREATED = 201

export const HTTP_NO_CONTENT = 204

export const HTTP_BAD_REQUISITION = 400
export const HTTP_NO_AUTHENTICATED = 401
export const HTTP_NO_AUTHORIZED = 403
export const HTTP_NO_FIND = 404

export const HTTP_SERVER_ERROR = 500
export const HTTP_UNAVAILABLE_SERVICE = 503
export const HTTP_TIMEOUT_ERROR = 504

const ip = require('ip')
const ip_now = ip.address()
export const IP_UPLOAD_PATH = `http://192.168.15.7:3333/uploads/`


