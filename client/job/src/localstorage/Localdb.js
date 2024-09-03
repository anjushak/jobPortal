import { jwtDecode } from "jwt-decode"

export const setToken=(token)=>{
    localStorage.setItem("_token_",token)
}

export const removeToken=()=>{
    localStorage.removeItem("_token_")
}

export const getToken=()=>{
    const token=localStorage.getItem("_token_")
    return token
}
export const getUser = () => {
    const token = getToken();
    if (!token) return null;
  
    try {
      const decoded = jwtDecode(token);
      return decoded;
    } catch (error) {
      console.error("Failed to decode token:", error);
      return null;
    }
  };

  export const setUserInStorage = (user) => {
    if (user) {
      localStorage.setItem('userData', JSON.stringify(user));
    } else {
      console.error('Attempted to save undefined user data');
    }
  };
  
  export const getUserFromStorage = () => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      try {
        return JSON.parse(userData);
      } catch (e) {
        console.error('Failed to parse userData:', e);
        return null;
      }
    }
    return null;
  };