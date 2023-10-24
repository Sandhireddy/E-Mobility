const httpStatus = require('http-status');

const CDRModel = require('./cdr.model');

/**
 * @description Validate and Add Charge Data Record
 * @param {*} req 
 * @param {*} res 
 * @returns CDRSchemaValues
 */
const addChargeDataRecord = (req, res) => {
    try {
        // transfering the raw JSON data into a valiable
        const rawData = req.body;

        // Checking 2 condition whether the totoal cost is above 0 and end time is greater then start time
        if (rawData.totalCost > 0 && rawData.startTime < rawData.endTime) {

            /**
            * Checking the database if any "Start time" of an upcoming Charge Data Record for a particular vehicle is
            * always be bigger than the "End time" of any previous Charge Data Records
            */
            CDRModel.getConflictTime(rawData.vehicleIdentification, rawData.startTime).then(conflictResults => {

                // If no records found
                if (!conflictResults.length) {

                    
                    const CDRData = new CDRModel({
                        "sessionIdentification": rawData.sessionIdentification,
                        "vehicleIdentification": rawData.vehicleIdentification,
                        "startTime": rawData.startTime,
                        "endTime": rawData.endTime,
                        "totalCost": rawData.totalCost
                    });

                    // storing the data
                    CDRData.save().then(savedResult => {

                        return res.status(httpStatus.OK).send({ status: "success", message: "Saved Successfully" });
                    })

                } else {

                    // return error if any Vehicle start time collide
                    return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(errorFormat([{ message: "Start time is overlapping with another entiry" }]));
                }
            }).catch((error) => {

                console.log(error);

                return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(errorFormat([{ message: "Failed to add Details. Please try after some time" }]));
            })
        } else {
            // returning data validation error
            let temp = [];

            rawData.totalCost > 0 ? "" : temp.push({ "message": "totalCost should be greater then zero." });

            rawData.startTime < rawData.endTime ? "" : temp.push({ "message": "endTime should be greater then StartTime." })

            return res.status(httpStatus.FORBIDDEN).send(errorFormat(temp));
        }

    } catch (error) {

        console.log(error);

        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(errorFormat([{ message: "Failed to add Details. Please try after some time" }]));
    }
}


/**
 * @description Get the data By Id or Full Records
 * @param {*} req 
 * @param {*} res 
 * @returns [] or Array<CDRSchemaValues>
 */
const getByIdOrFullRecords = (req, res) => {
    try {
        /**_id can be null/undefined/value
         * If the value exist then get that particular data
         * If the value doesn't exist then get full records
         **/
        const _id = req.params.id;

        // filtering values from the data base
        CDRModel.getByIdOrFullRecords(_id).then(result => {

            res.status(httpStatus.OK).send({ items: result, status: result.length != 0 ? "success" : "No Records" });

        }).catch(resultError => {

            console.log(resultError);

            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(errorFormat([{ message: "Failed to get details. Please try after some time" }]));
        })

    } catch (error) {

        console.log(error);

        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(errorFormat([{ message: "Failed to get details. Please try after some time" }]));
    }
}


const errorFormat = (messageArray) => {
    return {
        status: "failed",
        "error": {
            "details": messageArray
        }
    }
}


module.exports = {
    addChargeDataRecord,
    getByIdOrFullRecords
}