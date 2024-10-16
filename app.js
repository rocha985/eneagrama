const fs = require("fs");
const { google } = require("googleapis");

const service = google.sheets("v4");
const credentials = require("./credentials.json");

const authClient = new google.auth.JWT(
    credentials.client_email,
    null,
    credentials.private_key.replace(/\\n/g, "\n"),
    ["https://www.googleapis.com/auth/spreadsheets"]
);

(async function () {
    try {
        const token = await authClient.authorize();
        authClient.setCredentials(token);

        const res = await service.spreadsheets.values.get({
            auth: authClient,
            spreadsheetId: '1QSamVv_Lr96i-gmIZW9L63F58oNfa8jVZFQY3lVXTC4',
            range: "A:AU", // Ajuste o range conforme necessário
        });

        const answers = [];

        const rows = res.data.values;

        if (rows.length) {
            rows.shift();

            for (const row of rows) {
                const response = {
                    timeStamp: row[0], 
                    answers: row.slice(1)
                };
                answers.push(response);
            }

            fs.writeFileSync("answers.json", JSON.stringify(answers), function (err) {
                if (err) throw err;
                console.log("Saved!");
            });

        } else {
            console.log("No data found.");
        }

    } catch (error) {
        console.log(error);
        process.exit(1);
    }

})();
