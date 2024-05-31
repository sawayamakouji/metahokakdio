const participants = require('./webhook').participants;

exports.handler = async function(event, context) {
    console.log("Returning participants list:", participants);
    return {
        statusCode: 200,
        body: JSON.stringify(participants || []),
    };
};
