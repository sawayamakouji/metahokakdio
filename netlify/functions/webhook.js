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

function saveParticipants(participants) {
    try {
        fs.writeFileSync(filePath, JSON.stringify(participants), 'utf8');
    } catch (error) {
        console.error("Error saving participants:", error);
    }
}

exports.handler = async function(event, context) {
    console.log("Received event:", event.body);

    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: 'Method Not Allowed',
        };
    }

    let participants = loadParticipants();
    try {
        const eventData = JSON.parse(event.body);
        console.log("Parsed event data:", eventData);

        if (eventData.type === 'participant_joined') {
            participants.push(eventData.participant);
        } else if (eventData.type === 'participant_left') {
            participants = participants.filter(p => p.id !== eventData.participant.id);
        }

        saveParticipants(participants);
        console.log("Updated participants list:", participants);

        return {
            statusCode: 200,
            body: 'Webhook received',
        };
    } catch (error) {
        console.error("Error parsing JSON:", error);
        return {
            statusCode: 400,
            body: `Error parsing JSON: ${error.message}`,
        };
    }
};

exports.participants = participants;
