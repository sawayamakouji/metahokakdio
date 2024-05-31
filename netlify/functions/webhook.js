const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: 'Method Not Allowed',
        };
    }

    try {
        const eventData = JSON.parse(event.body);
        const googleAppsScriptUrl = 'YOUR_GOOhttps://script.google.com/macros/s/AKfycbwT_Yr3hqdxXLnTDCYtlS7SsVmZyCGB0amVwu9T8rnUABC5b7MudydkUkNEdWHK1UB-/execGLE_APPS_SCRIPT_URL'; // Google Apps ScriptのURL

        const response = await fetch(googleAppsScriptUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(eventData),
        });

        if (!response.ok) {
            throw new Error('Failed to send data to Google Sheets');
        }

        return {
            statusCode: 200,
            body: 'Webhook received and processed',
        };
    } catch (error) {
        console.error('Error processing webhook:', error);
        return {
            statusCode: 500,
            body: `Error processing webhook: ${error.message}`,
        };
    }
};
