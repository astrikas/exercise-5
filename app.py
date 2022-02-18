import string
import random
from datetime import datetime, timedelta
from flask import Flask, jsonify, render_template, request
from functools import wraps
import json

app = Flask(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

# sample_chats = {
#     1: {
#         "authorized_users": {
#             "as3215jhkg231hjgkl4123": {"username": "Alice", "expires": "2020-02-15T20:53:15Z"},
#             "session_token_1": {"username": "Bob", "expires": "2020-02-15T20:57:22Z"}
#         },
#         "magic_key": "some_really_long_key_value"
#         "messages": [
#             {"username": "Alice", "body": "Hi Bob!"},
#             {"username": "Bob", "body": "Hi Alice!"},
#             {"username": "Alice", "body": "Knock knock"},
#             {"username": "Bob", "body": "Who's there?"},
#         ]
#     }
# }
chats = {}

def newChat(host, session_token):
    authorized_users = dict([
        (session_token, dict([
            ("username", host),
            ("expires", datetime.utcnow() + timedelta(hours=6))
        ]))
    ])
    magic_key = ''.join(random.choices(string.ascii_lowercase + string.digits, k=40))

    return dict([
        ("authorized_users", authorized_users),
        ("magic_key", magic_key),
        ("messages", [])
    ])


@app.route('/')
def index(chat_id=None):
    return app.send_static_file('index.html')

@app.route('/username')
def auth():
    return app.send_static_file('username.html')

@app.route('/chat/<int:chat_id>')
def chat(chat_id):
    #check for local storage or magic link, if not then render home page instead of chat.html
    invite_link = "some_cool_invite_link"
    return render_template('chat.html',
            chat_id=chat_id,
            invite_link=invite_link)

# -------------------------------- API ROUTES ----------------------------------
# TODO: Create the API
@app.route("/create", methods=["POST"])
def create_route():
    user_name = request.json["user_name"]
    token = request.json["token"]
    result = newChat(user_name, token)
    session_id =len(chats)+1
    chats[session_id] = result
    return chats
    
@app.route("/messages", methods = ["POST"])
def create_message_route():
    user_name = request.json["user_name"]
    new_message = request.json["new_message"]
    room = request.json["room"]
    message_obj = {
        "username": user_name,
        "body": new_message
    }
    chats[int(room)]['messages'].append(message_obj) 
    return chats

@app.route("/getmessages", methods = ["POST"])
def get_message_route():
    user_name = request.json["user_name"]
    if len(chats)==0:
        return jsonify("no chats")
    else:
        for i in chats:
            chat_users = chats[i]
            # for each chat_user object - separate the key / values?
            for k,v in chat_users['authorized_users'].items():
                # for each value - get the username
                # print(v['username'])
                if v['username'] == user_name:
                    return jsonify(chats[i]['messages'])
                else: break
        return jsonify("end of for loop")