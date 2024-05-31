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

function saveParticipants(participants) {
    fs.writeFileSync(filePath, JSON.stringify(participants), 'utf8');
}

function loadMessages() {
    try {
        const data = fs.readFileSync(messageFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

function saveMessages(messages) {
    fs.writeFileSync(messageFilePath, JSON.stringify(messages), 'utf8');
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
    let messages = loadMessages();
    try {
        const eventData = JSON.parse(event.body);
        console.log("Parsed event data:", eventData);

        if (eventData.when === 'join') {
            participants.push({ id: eventData.id, name: eventData.name });
            messages.push(`${eventData.name}さんが入室しました`);
        } else if (eventData.when === 'leave') {
            participants = participants.filter(p => p.id !== eventData.id);
            messages.push(`${eventData.name}さんが退室しました`);
        }

        saveParticipants(participants);
        saveMessages(messages);
        console.log("Updated participants list:", participants);
        console.log("Updated messages list:", messages);

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
