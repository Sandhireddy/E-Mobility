const mongoose = require('mongoose');

// Data Base Schema for CDR
const CDRSchema = mongoose.Schema({
    sessionIdentification: {
        type: String,
        required: true,
    },
    vehicleIdentification: {
        type: String,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    totalCost: {
        type: Number,
        required: true
    }
});


// Customize Query
CDRSchema.statics = {

    /**
     * @description Checking the database if any "Start time" of an upcoming Charge Data Record for a particular vehicle is always be bigger than the "End time" of any previous Charge Data Records
     * @param {*} _vehicleIdentification Vehicle ID
     * @param {*} _startTime Start Time
     */
    getConflictTime(_vehicleIdentification, _startTime) {
        return new Promise((resolve, reject) => {
            this.aggregate([
                {
                    $match: {
                        "vehicleIdentification": _vehicleIdentification,
                        "endTime": { $gte: _startTime }
                    }
                },
                {
                    "$project":{
                        "_id":0,
                        "vehicleIdentification": 1,
                        "endTime": 1,
                    }
                }
            ], (error, result)=>{
                if(error){
                    console.log(error);
                    reject(error)
                }
                resolve(result);
            }).cursor({ batchSize: 1000 }).exec();
        })
    },


    /**
     * @description Get the details by Id. Pull all the records that exist in either Vehicle or session ID
     * @param {*} _id 
     * @returns 
     */
    getByIdOrFullRecords(_id){
        let filterSet = [];
        if(_id != null || _id != undefined){
            filterSet.push({$match:{
                $or: [{"vehicleIdentification": _id}, {"sessionIdentification": _id}]
            }})
        }

        filterSet.push({
            "$project":{
                "_id":0,
                "sessionIdentification": 1,
                "vehicleIdentification": 1,
                "startTime": 1,
                "endTime": 1,
                "totalCost": 1
            }
        })

        return new Promise((resolve, reject) => {
            this.aggregate( filterSet, (error, result)=>{
                if(error){
                    console.log(error);
                    reject(error)
                }
                resolve(result);
            }).cursor({ batchSize: 1000 }).exec();
        })
    }
}

module.exports = mongoose.model('CDR', CDRSchema, 'CDR');