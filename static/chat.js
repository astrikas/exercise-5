window.onload = () => {
  var submit_button = document.getElementById("submit_button");

  submit_button.addEventListener("click", (event) => {
    postMessage(event);
  });

  /* For chat.html */

  // TODO: Fetch the list of existing chat messages.
  // POST to the API when the user posts a new message.
  // Automatically poll for new messages on a regular interval.
  function postMessage(e) {
    e.preventDefault();

    let new_message = document.querySelector("#text_input").value;

    //const urlParams = new URLSearchParams(window.location.search);
    //const pageSize = urlParams.get("pageSize");
    let url = window.location.toString().split("/");

    let user_name = localStorage.getItem("username");
    let room = url[url.length - 1];
    //console.log(typeof room);

    fetch("http://127.0.0.1:5000/messages", {
      method: "POST",
      body: JSON.stringify({ user_name, new_message, room }),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  }

  function addMessagesToScreen(data) {
    let message_box = $(".messages");
    message_box.empty();
    data.forEach((element) => {
      message_box.append(`<message>
        <author>${element.username}</author>
        <content>${element.body}</content>
      </message>`);
    });
    return;
  }

  function startMessagePolling() {
    let url = window.location.toString().split("/");
    let room = url[url.length - 1];

    console.log("polling for new messages");
    setTimeout(startMessagePolling, 3000);
    //let user_name = localStorage.getItem("username");

    fetch("http://127.0.0.1:5000/messagepoll", {
      method: "POST",
      body: JSON.stringify({ room }),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        addMessagesToScreen(data);
      })
      .catch((err) => console.log(err));

    return;
  }
  startMessagePolling();

  function authenticate() {
    let url = window.location.toString().split("/");
    let user_name = localStorage.getItem("username");
    let room = url[url.length - 1];
    fetch("http://127.0.0.1:5000/auth", {
      method: "POST",
      body: JSON.stringify({ user_name, room }),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("This is the auth result");
        console.log(data);
      })
      .catch((err) => console.log(err));
    return;
  }
  authenticate();
};
