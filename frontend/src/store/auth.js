import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const Authprovider = ({children })=>{
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState("");
    const [services, setServices]= useState("");
    const AuthorizationToken = `Bearer ${token}`;


    const  storeTokenInLS =(ServerToken) =>{
        setToken(ServerToken);
        return localStorage.setItem("token", ServerToken);
    }

    let isLoggedIn = !!token;

    // tackling logout functionality
    const LogoutUser =()=>{
        setToken("")
        return localStorage.removeItem('token');
    }

// jwt athentication - to get the currently logedin user
const userAthentication = async() =>{
    try {
        const response = await fetch(`http://localhost:5000/user`, {method: "GET", headers: {Authorization: AuthorizationToken  }})
        if(response.ok){
            const data = await response.json();
            // console.log("user data:", data.userData)
            setUser(data.userData);

        }
    } catch (error) {
        console.error("Error fetching user data")
    }
}

// to fetch the service data form data base
// const getServices= async()=>{
//      try {
//         const response = await fetch("http://localhost:5000/api/data/service",{method: "GET", });

//         if(response.ok){
//             const data = await response.json();
//             console.log(data.msg);
//             setServices(data.msg);
//         }


//      } catch (error) {
//         console.log(`services frontend error: ${error}`)
        
//      }
// }

useEffect(()=>{
    // getServices();
    userAthentication();
}, [])


         return <AuthContext.Provider value={{ storeTokenInLS, LogoutUser, isLoggedIn, user, AuthorizationToken }}>
            {children}
         </AuthContext.Provider>
}
export const useAuth =() =>{
    const authContextValue = useContext(AuthContext);

    if(!authContextValue){
         throw new Error("useAuth used outside of the provider");
    }
   return authContextValue;
}

