var express = require('express');
var router = express.Router();
const SchemaValidator = require('../middlewares/SchemaValidator');
const CDRController = require('./cdr.controller');


/**
 * @description Saving CDR Data
 * @method POST /v1/api/cdr
 */
router.route('/').post(SchemaValidator('CDRValidator','singleRecordValidator', true),CDRController.addChargeDataRecord);


/**
 * @description Fetching the Records By Session/Vehicle Id
 * @method GET /v1/api/cdr
 */
router.route('/:id').get(CDRController.getByIdOrFullRecords);


/**
 * @description Fetching Full Records
 * @method GET /v1/api/cdr
 */
router.route('/').get(CDRController.getByIdOrFullRecords);


/**
 * @description Exporting the router
 */
module.exports = router;
