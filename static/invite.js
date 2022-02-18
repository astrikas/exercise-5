function invite() {
  let email = document.querySelector("#invite_email");
  const redirectURI = `${window.location.origin}/confirm`;
  if (email) {
    /* One-liner login 🤯 */
    await magic.auth.loginWithMagicLink({ email, redirectURI });
  }
}
