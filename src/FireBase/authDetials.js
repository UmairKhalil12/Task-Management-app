import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../FireBase/FireBase";

const useAuthDetails = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });

        // Cleanup function
        return () => unsubscribe(); 

    }, []); 

    return user;
};

export default useAuthDetails;
