import { Box, Button, Center, Group, NumberInput } from "@mantine/core";
import { PropertyDetails } from "../components/AddLocation/AddLocation";
import { FormEvent, useContext } from "react";
import { useForm } from "@mantine/form";

import { useAuth0 } from "@auth0/auth0-react";
import UserDetailContext from "../context/UserDetailContext";
import useProperties from "../hooks/useProperties";

import { toast } from "react-toastify";
import { createResidency } from "../utils/api";
import { useMutation } from "react-query";

interface FacilitiesProps {
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  prevStep: () => void;
  propertyDetails: PropertyDetails;
  setPropertyDetails: React.Dispatch<React.SetStateAction<PropertyDetails>>;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}

function Facilities({
  setOpened,
  prevStep,
  propertyDetails,
  setPropertyDetails,
  setActiveStep,
}: FacilitiesProps) {
  const form = useForm({
    initialValues: {
      bedrooms: propertyDetails.facilities.bedrooms,
      parkings: propertyDetails.facilities.parkings,
      bathrooms: propertyDetails.facilities.bathrooms,
    },
    validate: {
      bedrooms: (value) => (value < 1 ? "Must have at least one room" : null),
      bathrooms: (value) =>
        value < 1 ? "Must have at least one bathroom" : null,
    },
  });

  const { bedrooms, parkings, bathrooms } = form.values;
  const handleSubmit = () => {
    const { hasErrors } = form.validate();
    if (!hasErrors) {
      setPropertyDetails((prev) => ({
        ...prev,
        facilities: {
          bedrooms,
          parkings,
          bathrooms,
        },
      }));
      mutate();
    }
  };

  // UPLOAD LOGIC

  const { user } = useAuth0();
  const {
    userDetails: { token },
  } = useContext(UserDetailContext);
  const { refetch: refetchProperties } = useProperties();

  const { mutate, isLoading } = useMutation({
    mutationFn: () =>
      createResidency(
        {
          ...propertyDetails,
          facilities: { bedrooms, parkings, bathrooms },
        },
        token
      ),
    onError({ response }) {
      toast.error(response.data.message, { position: "bottom-right" });
    },
    onSettled: () => {
      toast.success("Added Succesfully", { position: "bottom-right" });
      setPropertyDetails({
        title: "",
        description: "",
        price: 0,
        country: "",
        city: "",
        address: "",
        image: null,
        facilities: {
          bedrooms: 0,
          parkings: 0,
          bathrooms: 0,
        },
        userEmail: user?.email,
      });
      setOpened(false);
      setActiveStep(0);
      refetchProperties();
    },
  });

  return (
    <Box maw="30%" mx="auto" my="sm">
      <form
        onSubmit={(e: FormEvent) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <NumberInput
          withAsterisk
          label="No of Bedrooms"
          min={0}
          {...form.getInputProps("bedrooms")}
        />
        <NumberInput
          label="No of Parkings"
          {...form.getInputProps("parkings")}
        />
        <NumberInput
          label="No of Bathrooms"
          withAsterisk
          {...form.getInputProps("bathrooms")}
        />

        <Center>
          <Group mt="xl">
            <Button variant="default" onClick={prevStep}>
              Back
            </Button>
            <Button type="submit" color="green" disabled={isLoading}>
              {isLoading ? "Submitting" : "Add Property"}
            </Button>
          </Group>
        </Center>
      </form>
    </Box>
  );
}

export default Facilities;
