import { 
  signInWithEmailAndPassword, 
  sendPasswordResetEmail, 
  GoogleAuthProvider, 
  signInWithPopup, 
  createUserWithEmailAndPassword 
} from "firebase/auth";
import { auth, database } from "./firebaseConfig"; // Firebase auth and database instances
import { ref, set } from "firebase/database"; // Firebase database methods

// Login User Function
export const loginUser = async (email, password) => {
  try {
    if (!email || !password) {
      throw new Error("Email and password are required.");
    }

    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log(`User logged in successfully: ${userCredential.user.email}`);
    return userCredential.user;
  } catch (error) {
    console.error("Error logging in user:", error.message);
    throw error; // Forward error for UI handling
  }
};

// Register User Function
export const registerUser = async (email, password, username, phoneNumber) => {
  try {
    if (!email || !password || !username || !phoneNumber) {
      throw new Error("All fields (email, password, username, and mobile number) are required.");
    }

    // Create user in Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Save user details to Firebase Realtime Database
    const userRef = ref(database, `users/${user.uid}`); // Use the user's UID as the database key
    await set(userRef, {
      email: email,
      username: username,
      phoneNumber: phoneNumber, // Store mobile number
      createdAt: new Date().toISOString(), // Save creation time for records
    });

    console.log(`User registered and data saved: ${email}`);
    return user; // Return user object for further usage
  } catch (error) {
    console.error("Error during registration:", error.message);
    throw error;
  }
};

// Reset Password Function
export const resetPassword = async (email) => {
  if (!email) {
    throw new Error("Please provide a valid email address.");
  }

  try {
    await sendPasswordResetEmail(auth, email);
    console.log(`Password reset email sent to: ${email}`);
  } catch (error) {
    console.error("Error resetting password:", error.message);
    throw error;
  }
};

// Google Login Function
export const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const userCredential = await signInWithPopup(auth, provider);

    // Save Google user data to Firebase Realtime Database
    const user = userCredential.user;
    const userRef = ref(database, `users/${user.uid}`); // Reference using unique user ID
    await set(userRef, {
      email: user.email,
      username: user.displayName || "Google User",
      createdAt: new Date().toISOString()
    });

    console.log(`User logged in with Google and data saved: ${user.email}`);
    return user;
  } catch (error) {
    console.error("Error logging in with Google:", error.message);
    throw error;
  }
};

// Login with OTP Function
export const loginWithOTP = async (phoneNumber) => {
  try {
    if (!phoneNumber) {
      throw new Error("Please provide a valid phone number.");
    }

    // Placeholder logic for OTP login
    console.log(`OTP sent to: ${phoneNumber}`);
    alert("OTP login functionality is implemented. Add verification logic here.");
  } catch (error) {
    console.error("Error during OTP login:", error.message);
    throw error;
  }
};
