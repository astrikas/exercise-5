const magic = new Magic("pk_live_3D63FE264F919CD8");

if (window.location.pathname === "/confirm") {
  try {
    /* Complete the "authentication callback" */
    await magic.auth.loginWithCredential();

    /* Get user metadata including email */
    const userMetadata = await magic.user.getMetadata();
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
