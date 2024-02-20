const { ActivityHandler, MessageFactory } = require('botbuilder');
var request = require('request');
const axios = require('axios');
// var url = "http://192.168.10.208:8001/api/v1/get_chat_response?token_id=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2XzE3MDU0NDkyMDAuNTMyNzYzIn0.KbDPMeitrdKWwVoYdwTU_T1GCxWN7IYtDbm-HKTUwdg&question="
var url = "https://api.crazyai.tech/api/v1/get_chat_response?token_id=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0OV8xNjk5NDc5OTAwLjk0OTIzNCJ9.1afKf0NhZz67zVV3C_No4AxbvUwMoXOFQfChzt7rL_k&question="
class EchoBot extends ActivityHandler {

    constructor() {
        super();
        // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
        this.onMessage(async (context, next) => {
            var temlURL = url + "" + context.activity.text
            var msgText = await postData(temlURL)
            await context.sendActivity(MessageFactory.text(msgText, msgText));
            await next();
        });

        this.onMembersAdded(async (context, next) => {
            const membersAdded = context.activity.membersAdded;
            const welcomeText = 'Hello and welcome to Medha AI!';
            for (let cnt = 0; cnt < membersAdded.length; ++cnt) {
                if (membersAdded[cnt].id !== context.activity.recipient.id) {
                    await context.sendActivity(MessageFactory.text(welcomeText, welcomeText));
                }
            }
            await next();
        });
        async function postData(temlURL) {
            try {
                const apiUrl = temlURL;
                const postData = {
                    "user_id": "1",
                    "user_name": "Admin",
                    "entities": "{}"
                };

                const response = await axios.post(apiUrl, postData);

                // Return the response data
                return response.data.message;
            } catch (error) {
                // Return null or throw error as needed
                return "Something went wrong please try after sometime";
            }
        }

    }
}

module.exports.EchoBot = EchoBot;
