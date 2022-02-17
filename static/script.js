/* For index.html */

// TODO: If a user clicks to create a chat, create a session token for them
// and save it. Redirect the user to /chat/<chat_id>
window.onload = () => {
  var create_button = document.getElementById("create_button");

  create_button.addEventListener("click", () => {
    createChat();
  });

  function generate_sessiontoken() {
    let alpha = "abcdefghijklmnop";
    let token_length = 10;
    let generated_token = "";
    while (generated_token.length < token_length) {
      generated_token += alpha.charAt(Math.random() * alpha.length);
    }
    return generated_token;
  }

  function createChat() {
    let user_name = localStorage.getItem("username");
    if (!user_name) {
      alert("You must register a user name");
      return false;
    }

    let token = generate_sessiontoken();

    fetch("http://127.0.0.1:5000/create", {
      method: "POST",
      body: JSON.stringify({ user_name, token }),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        window.location.href = `http://127.0.0.1:5000/chat/${
          Object.keys(data).length
        }`;
      })
      .catch((err) => console.log(err));
  }

  /* For auth.html */

  // TODO: On page load, pull chat_id and magic_key out of the URL parameters
  // Send them to the auth API endpoint to get a session token
  // If the user authenticaes successfully, save the session token
  // and redirect them to /chat/<chat_id>
  function authenticate() {
    return;
  }
};
