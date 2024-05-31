const fs = require('fs');
const filePath = '/tmp/participants.json';
const messageFilePath = '/tmp/messages.json';

function loadParticipants() {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

function loadMessages() {
    try {
        const data = fs.readFileSync(messageFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

exports.handler = async function(event, context) {
    const participants = loadParticipants();
    const messages = loadMessages();
    console.log("Returning participants and messages list:", { participants, messages });
    return {
        statusCode: 200,
        body: JSON.stringify({ participants, messages } || { participants: [], messages: [] }),
    };
};
