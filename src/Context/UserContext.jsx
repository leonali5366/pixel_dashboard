/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const UserContext = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("pxileClient"))
  );

  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("pxileToken");
  const [refresh, setRefresh] = useState(1);
  const name = user?.name;

  useEffect(() => {
    if (!name && token) {
      setLoading(true);
      fetch(`http://localhost:5000/api/v1/client/user`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success") {
            setUser(data.client);
            localStorage.removeItem("pxileClient");
            localStorage.setItem("pxileClient", JSON.stringify(data.client));
            window.location.reload();
          }
        })
        .catch((error) => console.error("Error fetching user:", error))
        .finally(() => setLoading(false));
    }
  }, [name, token, refresh]);

  const value = { user, setUser, refresh, setRefresh };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default UserContext;
