// import firebaseui from "firebaseui";
// import firebase from "firebase/compat/app";

// export default function Login() {
//     var uiConfig = {
//         signInSuccessUrl: '/Dashboard',
//         signInOptions: [
//           // Leave the lines as is for the providers you want to offer your users.
//           firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//           firebase.auth.FacebookAuthProvider.PROVIDER_ID,
//           firebase.auth.TwitterAuthProvider.PROVIDER_ID,
//           firebase.auth.GithubAuthProvider.PROVIDER_ID,
//           firebase.auth.EmailAuthProvider.PROVIDER_ID,
//           firebase.auth.PhoneAuthProvider.PROVIDER_ID,
//           firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
//         ],
//         // tosUrl and privacyPolicyUrl accept either url string or a callback
//         // function.
//         // Terms of service url/callback.
//         tosUrl: '<your-tos-url>',
//         // Privacy policy url/callback.
//         privacyPolicyUrl: function() {
//           window.location.assign('<your-privacy-policy-url>');
//         }
//       };

//       var ui = new firebaseui.auth.AuthUI(firebase.auth());

//     return <>
//     Login
//     {
//         ui.start('#firebaseui-auth-container', uiConfig)
//     }
//     </>
// }

import { useEffect } from "react";
// imported from firebase auth sdk
// ensures compatibility with the older versions of firebase
import firebase from "firebase/compat/app";
// imports pre-built UI for firebase authentication
import * as firebaseui from "firebaseui";
// imports the firebaseui styles using the CDN
import "firebaseui/dist/firebaseui.css";
export default function Login() {
  useEffect(() => {
    const ui = new firebaseui.auth.AuthUI(firebase.auth());

    ui.start("#firebaseui-auth-container", {
      signInSuccessUrl: "/home",
      signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        {
          provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          clientId:
            "1006672558365-p6jpr3b7r76kng93j6mrirh9pua5k2at.apps.googleusercontent.com",
        },
        {
          provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        },
        // leave for ANOTHER video
        // firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID,
      ],
      // required to enable one-tap sign-up credential helper
      credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO,
    });
  }, []);

  return <div id="firebaseui-auth-container"></div>;
}