chats = {1: {"authorized_users": {
"as3215jhkg231hjgkl4123": {"username": "Tom", "expires": "2020-02-15T20:53:15Z"},
            "session_token_1": {"username": "Bob", "expires": "2020-02-15T20:57:22Z"}
        },
        "magic_key": "some_really_long_key_value"},
        "messages": [
            {"username": "Alice", "body": "Hi Bob!"},
            {"username": "Bob", "body": "Hi Alice!"},
            {"username": "Alice", "body": "Knock knock"},
            {"username": "Bob", "body": "Who's there?"},
        ]
    }





print(len(chats))
i=1
while(i<len(chats)):
    for key, value in (chats[i]["authorized_users"]).items():
        if value["username"] == "Alice":
            print("alice is hit") 
        else:
            break
    print("con while")
    i+=1