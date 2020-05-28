var commonController = require("../common/commonController");

/**
 * External Drupal API calls with authentication
 * @param req
 * @param res
 * @param next
 */
let getApiDataFromDrupal = (req, res) => {
  req.isJsonReq = false;
  let dataForOption = commonController.getDrupalDataForOptions("GET", true);
  let options = commonController.generateOptions(req, dataForOption);
  return commonController.getApiResponse(options, req, res);
};

/**
 * Method to append Google map API key
 * @param {*} req
 */
let getUpdatedRequest = req => {
  let reqBody = req.body;
  return reqBody;
};

module.exports = {
  getApiDataFromDrupal: getApiDataFromDrupal,
  getUpdatedRequest: getUpdatedRequest
};
