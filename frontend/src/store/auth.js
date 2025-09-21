

// import { createContext, useContext, useEffect, useState } from "react";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     const [token, setToken] = useState(localStorage.getItem('token'));
//     const [user, setUser] = useState("");
//     const [services, setServices] = useState([]);
//     const [servicesLoading, setServicesLoading] = useState(false);
//     const [servicesError, setServicesError] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const AuthorizationToken = `Bearer ${token}`;
//     const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

//     const storeTokenInLS = (ServerToken) => {
//         setToken(ServerToken);
//         return localStorage.setItem("token", ServerToken);
//     }

//     let isLoggedIn = !!token;

//     const LogoutUser = () => {
//         setToken("")
//         return localStorage.removeItem('token');
//     }

//     const userAthentication = async () => {
//         try {
//             const response = await fetch(`${API_URL}/user`, {
//                 method: "GET",
//                 headers: { Authorization: AuthorizationToken }
//             })
//             if (response.ok) {
//                 const data = await response.json();
//                 setUser(data.userData);
//             }
//         } catch (error) {
//             console.error("Error fetching user data")
//         }
//     }

//     // Add this function to fetch services
//     const fetchServices = async () => {
//         setServicesLoading(true);
//         setServicesError(null);
//         try {
//             const response = await fetch(`${API_URL}/api/services`, {
//                 method: "GET",
//                 headers: {
//                     'Content-Type': 'application/json',
//                 }
//             });
            
//             if (response.ok) {
//                 const data = await response.json();
//                 setServices(data.services || data);
//                 return data.services || data;
//             } else {
//                 throw new Error('Failed to fetch services');
//             }
//         } catch (error) {
//             console.error("Error fetching services:", error);
//             setServicesError(error.message);
//             throw error;
//         } finally {
//             setServicesLoading(false);
//         }
//     };

//     // Add this function to get a single service by ID
//     const fetchServiceById = async (id) => {
//         try {
//             const response = await fetch(`${API_URL}/api/services/${id}`, {
//                 method: "GET",
//                 headers: {
//                     'Content-Type': 'application/json',
//                 }
//             });
            
//             if (response.ok) {
//                 const data = await response.json();
//                 return data.service || data;
//             } else {
//                 throw new Error('Failed to fetch service');
//             }
//         } catch (error) {
//             console.error("Error fetching service:", error);
//             throw error;
//         }
//     };

//     const updateUserProfile = async (formData) => {
//         setLoading(true);
//         try {
//             const response = await fetch(`${API_URL}/api/user/profile`, {
//                 method: 'PUT',
//                 headers: {
//                     'Authorization': AuthorizationToken,
//                 },
//                 body: formData,
//             });

//             const data = await response.json();

//             if (response.ok) {
//                 setUser(data.user);
//                 localStorage.setItem('user', JSON.stringify(data.user));
//                 return data;
//             } else {
//                 throw new Error(data.message || 'Failed to update profile');
//             }
//         } catch (error) {
//             console.error('Profile update error:', error);
//             throw error;
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         userAthentication();
//     }, [])

//     return (
//         <AuthContext.Provider value={{
//             storeTokenInLS,
//             LogoutUser,
//             isLoggedIn,
//             user,
//             AuthorizationToken,
//             updateUserProfile,
//             loading,
//             // Add these to the context value
//             services,
//             servicesLoading,
//             servicesError,
//             fetchServices,
//             fetchServiceById
//         }}>
//             {children}
//         </AuthContext.Provider>
//     );
// }

// export const useAuth = () => {
//     const authContextValue = useContext(AuthContext);
//     if (!authContextValue) {
//         throw new Error("useAuth used outside of the provider");
//     }
//     return authContextValue;
// }











import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState("");
    const [services, setServices] = useState([]);
    const [servicesLoading, setServicesLoading] = useState(false);
    const [servicesError, setServicesError] = useState(null);
    const [loading, setLoading] = useState(false);
    const AuthorizationToken = `Bearer ${token}`;
    const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

    const storeTokenInLS = (ServerToken) => {
        setToken(ServerToken);
        return localStorage.setItem("token", ServerToken);
    }

    let isLoggedIn = !!token;

    const LogoutUser = () => {
        setToken("")
        setUser(""); // Also clear user state on logout
        return localStorage.removeItem('token');
    }

    const userAthentication = async () => {
        try {
            const response = await fetch(`${API_URL}/user`, {
                method: "GET",
                headers: { Authorization: AuthorizationToken }
            })
            if (response.ok) {
                const data = await response.json();
                setUser(data.userData);
            }
        } catch (error) {
            console.error("Error fetching user data")
        }
    }

    // Add this function to fetch services
    const fetchServices = async () => {
        setServicesLoading(true);
        setServicesError(null);
        try {
            const response = await fetch(`${API_URL}/api/services`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                setServices(data.services || data);
                return data.services || data;
            } else {
                throw new Error('Failed to fetch services');
            }
        } catch (error) {
            console.error("Error fetching services:", error);
            setServicesError(error.message);
            throw error;
        } finally {
            setServicesLoading(false);
        }
    };

    // Add this function to get a single service by ID
    const fetchServiceById = async (id) => {
        try {
            const response = await fetch(`${API_URL}/api/services/${id}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                return data.service || data;
            } else {
                throw new Error('Failed to fetch service');
            }
        } catch (error) {
            console.error("Error fetching service:", error);
            throw error;
        }
    };

    const updateUserProfile = async (formData) => {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/api/user/profile`, {
                method: 'PUT',
                headers: {
                    'Authorization': AuthorizationToken,
                },
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                setUser(data.user);
                localStorage.setItem('user', JSON.stringify(data.user));
                return data;
            } else {
                throw new Error(data.message || 'Failed to update profile');
            }
        } catch (error) {
            console.error('Profile update error:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        userAthentication();
    }, [])

    return (
        <AuthContext.Provider value={{
            storeTokenInLS,
            LogoutUser,
            isLoggedIn,
            user,
            setUser, // ADD THIS LINE - EXPOSE setUser TO CONTEXT
            AuthorizationToken,
            updateUserProfile,
            loading,
            services,
            servicesLoading,
            servicesError,
            fetchServices,
            fetchServiceById
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    if (!authContextValue) {
        throw new Error("useAuth used outside of the provider");
    }
    return authContextValue;
};