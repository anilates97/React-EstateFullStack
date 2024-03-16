import { Avatar, Menu } from "@mantine/core";
import { replace } from "lodash";
import { useNavigate } from "react-router-dom";

interface Props {
  user: any;
  logout: () => void;
}

function ProfileMenu({ user, logout }: Props) {
  const navigate = useNavigate();
  return (
    <Menu>
      <Menu.Target>
        <Avatar src={user?.picture} alt="user image" radius="xl" />
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item onClick={() => navigate("./favourites", { replace: true })}>
          Favourites
        </Menu.Item>
        <Menu.Item onClick={() => navigate("./bookings", { replace: true })}>
          Bookings
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            localStorage.clear();
            logout();
          }}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export default ProfileMenu;
