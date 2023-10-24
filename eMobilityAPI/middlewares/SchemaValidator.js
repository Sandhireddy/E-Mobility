/* middlewares/SchemaValidator.js */
const _ = require('lodash');
const Joi = require('@hapi/joi');


module.exports = (Validator,route, useJoiError = false) => {
    
    const Schemas = require('../validators/' + Validator); // mentorValidator
    // useJoiError determines if we should respond with the base Joi error
    // boolean: defaults to false
    const _useJoiError = _.isBoolean(useJoiError) && useJoiError;

    // enabled HTTP methods for request data validation
    const _supportedMethods = ['post', 'put', 'get', 'delete'];

    // Joi validation options
    const _validationOptions = {
        abortEarly: false, // abort after the last validation error
        allowUnknown: true, // allow unknown keys that will be ignored
        stripUnknown: true // remove unknown keys from the validated data
    };

    // return the validation middleware
    return (req, res, next) => {

        const method = req.method.toLowerCase();

        if (_.includes(_supportedMethods, method) && _.has(Schemas, route)) {
            // get schema for the current route
            const _schema = _.get(Schemas, route);

            if (_schema) {

                // Validate req.body using the schema and validation options
                let response = Schemas[route].validate(req.body,{abortEarly: false});

                if (response.error) {
                    // Joi Error
                    
                    const JoiError = {
                        status: 'failed',
                        error: {
                            original: response.error._object,

                            // fetch only message and type from each error
                            details: _.map(response.error.details, ({ message, type }) => ({
                                message: message.replace(/['"]/g, ''),
                            }))
                        }
                    };

                    // Custom Error
                    const CustomError = {
                        status: 'failed',
                        error: 'Invalid request data. Please review request and try again.'
                    };

                    // Send back the JSON error response
                    res.status(422).json(_useJoiError ? JoiError : CustomError);
                } else {
                    // Replace req.body with the data after Joi validation

                    req.body = response.value;
                    next();
                }
            }
        }

    };
};