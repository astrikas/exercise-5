function save_username() {
  let user_name = document.querySelector("#username").value;
  localStorage.setItem("username", user_name);
}
