import json

from flask import Flask, request
from flask_cors import CORS
from modules.chatbot.chatbot import ChatBot

app = Flask(__name__)
CORS(app)
chatBot = ChatBot()


@app.route('/handle-query', methods=['POST'])
def chat():
    input_query = request.data.decode(encoding="utf-8")
    input_query = json.loads(input_query)
    input_query = input_query["query"]

    bot_response = chatBot.get_response(user_input=input_query)

    return "Bot: " + bot_response


if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5000)
