import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

import { useMutation } from "react-query";
import { createUser } from "../../utils/api";
import useFavourites from "../../hooks/useFavourites";
import useBookings from "../../hooks/useBookings";

function Layout() {
  const { isAuthenticated, user } = useAuth0();

  useFavourites();
  useBookings();

  const { mutate } = useMutation({
    mutationKey: [user?.email],
    mutationFn: () => createUser(user?.email || ""),
  });

  // useEffect(() => {
  //   const getTokenAndRegister = async () => {
  //     const res = await getAccessTokenWithPopup({
  //       authorizationParams: {
  //         audience: "http://localhost:8000",
  //         scope: "openid profile email",
  //       },
  //     });
  //     localStorage.setItem("access_token", res!);
  //     setUserDetails((prev: any) => ({ ...prev, token: res }));
  //     mutate(res!);
  //   };

  //   isAuthenticated && getTokenAndRegister();
  // }, [isAuthenticated]);

  useEffect(() => {
    mutate();

    isAuthenticated;
  }, [isAuthenticated]);

  return (
    <>
      <div style={{ background: "var(--black)", overflow: "hidden" }}>
        <Header />
        <Outlet />
      </div>
      ;
      <Footer />
    </>
  );
}

export default Layout;
