import { collection, db } from '../../FireBase/FireBase';
import { getDocs } from 'firebase/firestore';

const getUsers = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'users'));
    const userData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));
    return userData;
  } catch (error) {
    console.error('Error fetching users:', error.message);
    return [];
  }
};

export default getUsers;
