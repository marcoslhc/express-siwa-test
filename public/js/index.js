(function (global, name, factory) {
  console.log(global);
  global[name] = factory(global);
})(window, "bg", function (global) {
  return {
    init: async function (config) {
      const { apple: appleConfig } = config;

      if (global.AppleID) {
        global.AppleID.auth.init(appleConfig);
        document.addEventListener("AppleIDSignInOnSuccess", async (event) => {
          const {
            detail: { authorization }
          } = event;

          const { authorized } = await fetch(appleConfig.redirectURI, {
            method: "POST",
            headers: {
              "content-type": "application/json"
            },
            body: JSON.stringify(authorization)
          }).then(async (res) => {
            return await res.json();
          });

          if (authorized) window.location = "/loggedIn";
        });
        document.addEventListener("AppleIDSignInOnFailure", (event) => {
          console.log(event);
        });
      }
      return true;
    }
  };
});
