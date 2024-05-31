const fs = require('fs');
const filePath = '/tmp/participants.json';

function loadParticipants() {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.log("Error loading participants:", error);
        return [];
    }
}

exports.handler = async function(event, context) {
    const participants = loadParticipants();
    console.log("Returning participants list:", participants);
    return {
        statusCode: 200,
        body: JSON.stringify(participants || []),
    };
};
