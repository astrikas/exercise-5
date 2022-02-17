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

    const urlParams = new URLSearchParams(window.location.search);
    const pageSize = urlParams.get("pageSize");

    fetch("http://127.0.0.1:5000/messages", {
      method: "POST",
      body: JSON.stringify({ new_message }),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // window.location.href = `http://127.0.0.1:5000/chat/${
        //   Object.keys(data).length
        // }`;
      })
      .catch((err) => console.log(err));
  }

  function getMessages() {
    return;
  }

  function startMessagePolling() {
    return;
  }
};
