// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  EmailAuthProvider,
  GoogleAuthProvider,
  GithubAuthProvider,
  FacebookAuthProvider,
  signOut,
  sendEmailVerification,
  deleteUser,
  reauthenticateWithCredential,
  updatePassword,
  updateEmail,
  sendPasswordResetEmail,
  getRedirectResult
} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "react-ecommerce-71ce3.firebaseapp.com",
  projectId: "react-ecommerce-71ce3",
  storageBucket: "react-ecommerce-71ce3.appspot.com",
  messagingSenderId: "746092208442",
  appId: "1:746092208442:web:00635ef48d43fe014e3003",
  measurementId: "G-K1PW4SWTRB"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const auth = getAuth();

export const emitEmailVerification = () => sendEmailVerification(auth.currentUser)

const googleAuthProvider = new GoogleAuthProvider();
googleAuthProvider.setCustomParameters({
  prompt: 'select_account'
});

const githubAuthProvider = new GithubAuthProvider();
githubAuthProvider.setCustomParameters({
  'allow_signup': 'false'
});

const facebookAuthProvider = new FacebookAuthProvider();
facebookAuthProvider.setCustomParameters({
  'allow_signup': 'false'
});

export const signInWithEmail = (email,password) => signInWithEmailAndPassword(getAuth(),email,password);
// export const signInWithGoogle = () => signInWithPopup(auth,googleAuthProvider);
// export const signInWithGithub = () => signInWithPopup(auth,githubAuthProvider);

export const signUpWithEmail = (email,password) => createUserWithEmailAndPassword(getAuth(),email,password);

export const logOut = () => signOut(getAuth());


function getProvider(providerId) {
  console.log(providerId)
  switch (providerId) {
    case GoogleAuthProvider.PROVIDER_ID:
      return googleAuthProvider;
    case FacebookAuthProvider.PROVIDER_ID:
      return facebookAuthProvider;
    case GithubAuthProvider.PROVIDER_ID:
      return githubAuthProvider;
    default:
      throw new Error(`No provider implemented for ${providerId}`);
  }
}

export const signInWithPopupByPID = (pid) =>signInWithPopup(getAuth(), getProvider(pid))
export const signInWithRedirectByPID = (pid) =>signInWithRedirect(getAuth(), getProvider(pid))

const supportedPopupSignInMethods = [
  GoogleAuthProvider.PROVIDER_ID,
  GithubAuthProvider.PROVIDER_ID,
  FacebookAuthProvider.PROVIDER_ID,
];

const getProviders = async (email) => {
  return await fetchSignInMethodsForEmail(getAuth(), email)
    .then((providers) => providers)
    .catch((err) => []);
}

const getFirstSupportedProvider = async (email) => {
  const providers = await getProviders(email);
  return providers.find(p => supportedPopupSignInMethods.includes(p));
}

export async function signInWithPopupRetry(email,) {
  console.log("next....")
  const firstProvider = await getFirstSupportedProvider(email);
  if (!firstProvider) {
    throw new Error(`Your account is linked to a provider that isn't supported.`);
  }
  signInWithRedirectByPID(firstProvider);
  return getRedirectResult(getAuth());
  // return await signInWithPopupByPID(firstProvider)
  // result.user.linkWithCredential(err.credential);
}

export const newEmailCredential = (password) => EmailAuthProvider.credential(getAuth().currentUser.email,password)

export const deleteAccount = async () => deleteUser(getAuth().currentUser);
export const reauthenticate = async (credential) => reauthenticateWithCredential(getAuth().currentUser, credential)
export const changePassword = async (newPassword) => updatePassword(getAuth().currentUser, newPassword)
export const changeEmail = async (newEmail) => updateEmail(getAuth().currentUser, newEmail)
export const resetPassword = async (email) => sendPasswordResetEmail(getAuth(), email)

export const getUser = () => getAuth().currentUser
export const lastLoginAt = async () => getAuth().currentUser.metadata.lastLoginAt