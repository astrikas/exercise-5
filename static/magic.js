const magic = new Magic("pk_live_3D63FE264F919CD8");
function generate_sessiontoken() {
  let alpha = "abcdefghijklmnop";
  let token_length = 10;
  let generated_token = "";
  while (generated_token.length < token_length) {
    generated_token += alpha.charAt(Math.random() * alpha.length);
  }
  return generated_token;
}

if (window.location.pathname === "/confirm") {
  try {
    /* Complete the "authentication callback" */
    await magic.auth.loginWithCredential();

    /* Get user metadata including email */
    const userMetadata = await magic.user.getMetadata();
    if (userMetadata) {
      let new_token = generate_sessiontoken();
      localStorage.setItem("user_token", new_token);
      window.location.href = "http://127.0.0.1:5000/username";
    }
    console.log(`Welcome ${userMetadata.email}`);
  } catch {
    /* In the event of an error, we'll go back to the login page */
    window.location.href = window.location.origin;
  }
} else {
  const isLoggedIn = await magic.user.isLoggedIn();

  if (!isLoggedIn) {
    window.location.href = `${window.location.origin}`;
  }
}
