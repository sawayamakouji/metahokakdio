let participants = [];

exports.handler = async function(event, context) {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: 'Method Not Allowed',
        };
    }

    try {
        const eventData = JSON.parse(event.body);

        if (eventData.type === 'participant_joined') {
            participants.push(eventData.participant);
        } else if (eventData.type === 'participant_left') {
            participants = participants.filter(p => p.id !== eventData.participant.id);
        }

        return {
            statusCode: 200,
            body: 'Webhook received',
        };
    } catch (error) {
        return {
            statusCode: 400,
            body: `Error parsing JSON: ${error.message}`,
        };
    }
};

exports.participants = participants;
