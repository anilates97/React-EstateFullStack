import { Button, Modal } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useContext, useState } from "react";
import { useMutation } from "react-query";
import UserDetailContext from "../../context/UserDetailContext";
import { bookVisit } from "../../utils/api";
import { toast } from "react-toastify";
import dayjs from "dayjs";

interface Props {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  email?: string;
  propertyId?: string;
}

function BookingModal({ opened, setOpened, email, propertyId }: Props) {
  const [value, setValue] = useState<any>(null);
  const {
    userDetails: { token },
    setUserDetails,
  } = useContext(UserDetailContext);

  const handleBookingSuccess = () => {
    toast.success("You have booked your visit", {
      position: "bottom-right",
    });
    setUserDetails((prev: any) => ({
      ...prev,
      bookings: [
        ...prev.bookings,
        {
          id: propertyId,
          date: dayjs(value).format("DD/MM/YYYY"),
        },
      ],
    }));
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: () => bookVisit(value, propertyId, email, token),
    onSuccess: () => handleBookingSuccess(),
    onError({ res }) {
      toast.error(res.data.message);
    },
    onSettled: () => setOpened(false),
  });

  return (
    <div>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Select your date of visit"
        centered
      >
        <div className="flexColCenter" style={{ gap: "1rem" }}>
          <DatePicker value={value} onChange={setValue} minDate={new Date()} />
          <Button disabled={!value || isLoading} onClick={() => mutate()}>
            Book visit
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default BookingModal;
