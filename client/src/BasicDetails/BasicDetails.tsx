import { useForm } from "@mantine/form";
import { PropertyDetails } from "../components/AddLocation/AddLocation";
import { validateString } from "../utils/common";
import {
  Box,
  Button,
  Center,
  Group,
  NumberInput,
  TextInput,
  Textarea,
} from "@mantine/core";
import { FormEvent } from "react";

interface BasicDetailsProps {
  nextStep: () => void;
  prevStep: () => void;
  propertyDetails: PropertyDetails;
  setPropertyDetails: React.Dispatch<React.SetStateAction<PropertyDetails>>;
}

function BasicDetails({
  nextStep,
  prevStep,
  propertyDetails,
  setPropertyDetails,
}: BasicDetailsProps) {
  const form = useForm({
    initialValues: {
      title: propertyDetails.title,
      description: propertyDetails.description,
      price: propertyDetails.price,
    },
    validate: {
      title: (value) => validateString(value),
      description: (value) => validateString(value),
      price: (value) =>
        value < 1000 ? "Must be greater than 999 dolars" : null,
    },
  });

  const { title, description, price } = form.values;
  const handleSubmit = () => {
    const { hasErrors } = form.validate();
    if (!hasErrors) {
      setPropertyDetails((prev) => ({ ...prev, title, description, price }));
      nextStep();
    }
  };

  return (
    <Box maw="50%" mx="auto" my="md">
      <form
        onSubmit={(e: FormEvent) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <TextInput
          withAsterisk
          label="Title"
          placeholder="Property Name"
          {...form.getInputProps("title")}
        />
        <Textarea
          placeholder="Description"
          label="Description"
          withAsterisk
          {...form.getInputProps("description")}
        />
        <NumberInput
          placeholder="1000"
          label="Price"
          withAsterisk
          {...form.getInputProps("price")}
        />
        <Center>
          <Group mt="xl">
            <Button variant="default" onClick={prevStep}>
              Back
            </Button>
            <Button type="submit">Next</Button>
          </Group>
        </Center>
      </form>
    </Box>
  );
}

export default BasicDetails;
