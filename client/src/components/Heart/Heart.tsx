import { useContext, useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import useAuthCheck from "../../hooks/useAuthCheck";
import { useMutation } from "react-query";
import { useAuth0 } from "@auth0/auth0-react";
import UserDetailContext from "../../context/UserDetailContext";
import { toFav } from "../../utils/api";
import { checkFavourites, updatefavourites } from "../../utils/common";

interface PropsHeart {
  id: string;
}

function Heart({ id }: PropsHeart) {
  const [heartColor, setHeartColor] = useState("white");
  const { validateLogin } = useAuthCheck();
  const { user } = useAuth0();
  const {
    userDetails: { favourites, token },
    setUserDetails,
  } = useContext(UserDetailContext);

  useEffect(() => {
    setHeartColor(() => checkFavourites(id, favourites));
  }, [favourites]);

  const { mutate } = useMutation({
    mutationFn: () => toFav(id, user?.email || "", token),
    onSuccess: () => {
      setUserDetails((prev: any) => ({
        ...prev,
        favourites: updatefavourites(id, prev.favourites),
      }));
    },
  });

  const handleLike = () => {
    if (validateLogin()) {
      mutate();
      setHeartColor((prev) => (prev === "#fa3e5f" ? "white" : "#fa3e5f"));
    }
  };

  return (
    <AiFillHeart
      size={24}
      color={heartColor}
      onClick={(e: SubmitEvent) => {
        e.stopPropagation();
        handleLike();
      }}
    />
  );
}

export default Heart;
