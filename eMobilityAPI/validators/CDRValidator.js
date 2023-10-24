const Joi = require('@hapi/joi');
const constants = require('../shared/constants');

const singleRecordValidator = Joi.object().keys({
    sessionIdentification: Joi.string().required().label('Session Identification'),
    vehicleIdentification: Joi.string().regex(constants.PATTERNS.VEHICLE_ID).required().label("Vehicle Identification"),
    startTime: Joi.string().regex(constants.PATTERNS.YYYY_MM_DDTHH_MM_SS).required().label('Start Time'),
    endTime: Joi.string().regex(constants.PATTERNS.YYYY_MM_DDTHH_MM_SS).required().label('End Time'),
    totalCost: Joi.number().required().label('Total Cost'),
});

module.exports = {
    singleRecordValidator: singleRecordValidator
}