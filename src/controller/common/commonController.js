var request = require("request");
var environment = require("../../../environment.json");

/**
 * Method to send error message
 * @param {*} res
 * @param {*} error
 */
let sendErrorMessage = (res, error) => {
  return res.status(500).send({ message: error });
};
/**
 * Method to send success message
 * @param {*} res
 * @param {*} response
 * @param {*} body
 */
let sendSuccessMessage = (res, response, body) => {
  return res.status(response.statusCode).send(body);
};
/** Method to send success message
 * @param {*} res
 * @param {*} body
 */
let sendSuccessMessageWithOutStatus = (res, body) => {
  return res.status(200).send(body);
};
/**
 * Send response in JSON format
 * @param {*} req
 * @param {*} response
 * @param {*} body
 */
let sendSuccessMessageJson = (res, response, body) => {
  return res.status(response.statusCode).json(body);
};
/**
 * Method to send success JSON
 * @param {*} res
 * @param {*} body
 */
let sendSuccessMessageJsonWithOutStatus = (res, body) => {
  return res.status(200).json(body);
};
/**
 * Method to make api call and get the response
 */
let getApiResponse = (options, req, res) => {
  console.log("KKKKKKKIIIIILLLL");
  request(options, function(error, response, body) {
    if (error) {
      return sendErrorMessage(res, error);
    }
    return checkAndSendSuccessMessage(req, res, response, body);
  });
};
/**
 * Get Response with promise
 * @param {*} options
 * @param {*} req
 * @param {*} res
 */
let getApiResponseWithPromise = (options, req, res) => {
  return new Promise(function(success, failure) {
    request(options, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        success(body);
      } else {
        failure(error);
      }
    });
  });
};
/**
 * Check and send success message as it is or convert into json
 * @param {*} res
 * @param {*} response
 * @param {*} body
 */
let checkAndSendSuccessMessage = (req, res, response, body) => {
  if (req.isJsonReq) {
    sendSuccessMessageJson(res, response, body);
  } else {
    sendSuccessMessage(res, response, body);
  }
};

/**
 * Generate options for poast
 * @param  req
 * @param  data
 */
let generateOptions = (req, data) => {
  var auth =
    "Basic " +
    new Buffer(data.userName + ":" + data.password).toString("base64");
  var urlData = data.url + req.url;
  const options = {
    url: urlData,
    method: data.method,
    rejectUnauthorized: false,
    requestCert: false,
    headers: getHeaderDetailsForGet(auth)
  };
  return options;
};

/**
 * Header for Get options
 * @param {*} auth
 */
let getHeaderDetailsForGet = auth => {
  let headerData = {
    "Content-Type": "application/hal+json",
    Authorization: auth
  };
  return headerData;
};
/**
 * method to set options for Get call
 * @param methodName
 */
let getDrupalDataForOptions = (methodName, isGetMethod) => {
  let data = {
    userName: environment.userName,
    password: environment.pwd,
    url: environment.apiUrl,
    method: methodName,
    isGet: isGetMethod
  };
  return data;
};
/**
 * Exporting all the common methods
 */
module.exports = {
  sendErrorMessage: sendErrorMessage,
  sendSuccessMessage: sendSuccessMessage,
  sendSuccessMessageJson: sendSuccessMessageJson,
  sendSuccessMessageWithOutStatus: sendSuccessMessageWithOutStatus,
  getApiResponse: getApiResponse,
  generateOptions: generateOptions,
  getHeaderDetailsForGet: getHeaderDetailsForGet,
  getDrupalDataForOptions: getDrupalDataForOptions,
  getApiResponseWithPromise: getApiResponseWithPromise,
  sendSuccessMessageJsonWithOutStatus: sendSuccessMessageJsonWithOutStatus
};
