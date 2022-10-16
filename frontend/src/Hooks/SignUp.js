import {auth} from '../Utils/Firebase';
import {createUserWithEmailAndPassword} from 'firebase/auth';

export const signup = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password).catch((err) => {
    throw new Error(err);
  });
};
