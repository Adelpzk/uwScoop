import React, { useEffect } from "react";
import { auth } from "../Firebase/firebase";
import { ToastContainer, toast } from "material-react-toastify";

const AuthContext = React.createContext();

export function useAuth() {
  return React.useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = React.useState();
  const [loading, setLoading] = React.useState(true);

  const errorEmailExists = (email) =>
    toast.error(email + " already exists", {
      containerId: "error",
    });

  const errorInvalidEmail = (email) =>
    toast.error(email + " is Invalid", {
      containerId: "error",
    });

  const errorInvalidEmailType = (email) =>
    toast.error("email: " + `"` + email + `"` + " is Invalid", {
      containerId: "signin",
    });

  const errorUserNotFound = (email) =>
    toast.error(email + " doesn't exist", {
      containerId: "signin",
    });

  const errorWrongPassword = (email) =>
    toast.error("Incorrect Password for " + email, {
      containerId: "signin",
    });

  const errorPassEmpty = () =>
    toast.error("Please enter your password", {
      containerId: "signin",
    });

  const errorTooManyReqs = () =>
    toast.error(
      "Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.",
      {
        containerId: "signin",
      }
    );

    const errorFPEmptyEmail = () =>
    toast.error(
      "Please enter your email",
      {
        containerId: "FP",
      }
    );

    const errorFPEmailNotFound = (email) =>
    toast.error(
      email + " Not Found, try again",
      {
        containerId: "FP",
      }
    );

    const successCreated = (email) =>
    toast.success(
       "Account with following email was created successfully" + email,
      {
        containerId: "error",
      }
    );

    const SuccessFP = (email) =>
    toast.success(
      "An email was sent to " + email + " reset your password",
      {
        containerId: "FP",
      }
    );

  async function signup(email, password, redirectHome) {
    try{
      await auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => successCreated())
    }
    catch(error){
      switch (error.code) {
        case "auth/email-already-in-use":
          errorEmailExists(email);
          break;
        case "auth/invalid-email":
          errorInvalidEmail(email);
          break;
        case "auth/operation-not-allowed":
          console.log(`Error during sign up.`);
          break;
        case "auth/weak-password":
          console.log(
            "Password is not strong enough. Add additional characters including special characters and numbers."
          );
          break;
        default:
          console.log(error.message);
          break;
      }
    }
  }

  async function login(email, password, redirectHome) {
    try {
      await auth
        .signInWithEmailAndPassword(email, password)
        .then(() => redirectHome());
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-email":
          errorInvalidEmailType(email);
          break;
        case "auth/user-not-found":
          errorUserNotFound(email);
          break;
        case "auth/wrong-password":
          errorWrongPassword(email);
          break;
        case "auth/internal-error":
          errorPassEmpty();
          break;
        case "auth/too-many-requests":
          errorTooManyReqs();
          break;
        default:
          console.log(error.message);
          break;
      }
    }
  }

  async function resetPassword(email) {
    try{
      await auth.sendPasswordResetEmail(email)
      SuccessFP(email);
    }
    catch (error){
      switch (error.code) {
        case "auth/missing-email":
          errorFPEmptyEmail();
          break;
        case "auth/user-not-found":
          errorFPEmailNotFound(email);
          break;
        default:
          console.log(error.message);
          break;
      }
    }
  }

  function logout() {
    return auth.signOut();
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    logout,
    signup,
    resetPassword,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
