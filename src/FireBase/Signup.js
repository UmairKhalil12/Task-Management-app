import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { db, auth } from "./FireBase";
import { collection, doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";



function Signup({ email, password, name, gender }) {
  const navigate = useNavigate();
  const handleSignup = async () => {
    try {
      if (email === '' && password === '' && name === '') {
        window.alert('All fields are required');
      } else if (email === '') {
        window.alert("Email is Required");
      } else if (password === '') {
        window.alert("Password is Required");
      } else if (name === '') {
        window.alert("Name is Required");
      }
      else {
        const usersCollection = collection(db, 'users');
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const userId = userCredential.user.uid;


        const detailsDocRef = doc(usersCollection, userId);

        await setDoc(detailsDocRef, {
          name: name,
          email: userCredential.user.email,
          tasksAssigned: [
            {
              task: '',
              statusOfTask: '',
              taskStartDate: '',
              taskEndDate: '',
              taskDescription: '',
            }
          ],
          phone: "",
          speciality: ""
        });

        console.log("User created successfully:", userCredential.user);
        console.log("Details added successfully. Document ID:", detailsDocRef.id);
        window.alert("User has been registered successfully: " + userCredential.user.email);
        const user = auth.currentUser;
        console.log('auth.currentusr', user);
        sendEmailVerification(user)
          .then(() => {
            console.log('Verification email sent');
            window.alert('Verification Email was sent');
          })
          .catch((error) => {
            console.error('Error sending verification email', error);
            window.alert('Error sending verification email', error.message);
          });
        console.log("User ID:", userId);
        navigate('/home')

      }
    } catch (error) {
      console.error("Error creating user:", error.message);
      window.alert("Error creating user :", error.message);
      console.log(error);
      navigate('/login');
    };

  }
  return handleSignup;
}

export default Signup;
