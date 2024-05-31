const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    const googleAppsScriptUrl = 'YOUR_GOOGLE_APPS_Shttps://script.google.com/macros/s/AKfycbwT_Yr3hqdxXLnTDCYtlS7SsVmZyCGB0amVwu9T8rnUABC5b7MudydkUkNEdWHK1UB-/execCRIPT_GET_URL'; // Google Apps Scriptのデータ取得用URL

    try {
        const response = await fetch(googleAppsScriptUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch data from Google Sheets');
        }

        const participants = await response.json();
        return {
            statusCode: 200,
            body: JSON.stringify(participants),
        };
    } catch (error) {
        console.error('Error fetching participants:', error);
        return {
            statusCode: 500,
            body: `Error fetching participants: ${error.message}`,
        };
    }
};
