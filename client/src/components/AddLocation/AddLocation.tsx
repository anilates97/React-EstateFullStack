import { useForm } from "@mantine/form";
import { validateString } from "../../utils/common";
import { Button, Center, Group, Select, TextInput } from "@mantine/core";
import useCountries from "../../hooks/useCountries";
import Map from "../Map/Map";
import { FormEvent } from "react";

export interface PropertyDetails {
  title: string;
  description: string;
  price: number;
  country: string;
  city: string;
  address: string;
  image: null;
  facilities: {
    bedrooms: number;
    parkings: number;
    bathrooms: number;
  };
  userEmail: string | undefined;
}

interface AddLocationProps {
  nextStep: () => void;
  propertyDetails: PropertyDetails;
  setPropertyDetails: React.Dispatch<React.SetStateAction<PropertyDetails>>;
}

function AddLocation({
  nextStep,
  propertyDetails,
  setPropertyDetails,
}: AddLocationProps) {
  const { getAll } = useCountries();
  const form = useForm({
    initialValues: {
      country: propertyDetails?.country,
      city: propertyDetails?.city,
      address: propertyDetails?.address,
    },
    validate: {
      country: (value) => validateString(value),
      city: (value) => validateString(value),
      address: (value) => validateString(value),
    },
  });

  const { country, city, address } = form.values;

  const handleSubmit = () => {
    const { hasErrors } = form.validate();
    if (!hasErrors) {
      setPropertyDetails((prev) => ({ ...prev, city, address, country }));
      nextStep();
    }
  };
  return (
    <form
      onSubmit={(e: FormEvent) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <div
        className="flexCenter"
        style={{
          justifyContent: "space-between",
          gap: "3rem",
          marginTop: "3rem",
        }}
      >
        {/* Left Side */}

        {/* inputs */}

        <div className="flexColStart" style={{ flex: 1 }}>
          <Select
            w="100%"
            withAsterisk
            label="Country"
            searchable
            data={getAll()}
            {...form.getInputProps("country", { type: "input" })}
          />

          <TextInput
            w="100%"
            withAsterisk
            label="City"
            {...form.getInputProps("city", { type: "input" })}
          />

          <TextInput
            w="100%"
            withAsterisk
            label="Address"
            {...form.getInputProps("address", { type: "input" })}
          />
        </div>

        {/* Right Side */}

        <div style={{ flex: 1 }}>
          <Map address={address} city={city} country={country} />
        </div>
      </div>

      <Center>
        <Group mt="xl">
          <Button type="submit">Next Step</Button>
        </Group>
      </Center>
    </form>
  );
}

export default AddLocation;
