import { useEffect, useRef, useState } from "react";
import { PropertyDetails } from "../AddLocation/AddLocation";
import { AiOutlineCloudUpload } from "react-icons/ai";
import "./UploadImage.css";
import { Button, Center, Group } from "@mantine/core";

interface UploadImageProps {
  nextStep: () => void;
  prevStep: () => void;
  propertyDetails: PropertyDetails;
  setPropertyDetails: React.Dispatch<React.SetStateAction<PropertyDetails>>;
}

function UploadImage({
  nextStep,
  prevStep,
  propertyDetails,
  setPropertyDetails,
}: UploadImageProps) {
  const [imageURL, setImageURL] = useState(propertyDetails.image);
  const cloudinaryRef = useRef<any>();
  const widgetRef = useRef<any>();

  const handleNext = () => {
    setPropertyDetails((prev) => ({ ...prev, image: imageURL }));
    nextStep();
  };

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: import.meta.env.VITE_CLOUDNAME,
        uploadPreset: import.meta.env.VITE_UPLOAD_PRESET,
        maxFiles: 1,
      },
      (result: any) => {
        if (result.event === "success") {
          setImageURL(result.info.secure_url);
        }
      }
    );
  }, []);

  return (
    <div className="flexColCenter uploadWrapper">
      {!imageURL ? (
        <div
          className="flexColCenter uploadZone"
          onClick={() => widgetRef.current?.open()}
        >
          <AiOutlineCloudUpload size={50} color="grey" />
          <span>Upload Image</span>
        </div>
      ) : (
        <div
          className="uploadedImage"
          onClick={() => widgetRef.current?.open()}
        >
          <img src={imageURL} alt="" />
        </div>
      )}

      <Center>
        <Group mt="xl">
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
          <Button onClick={handleNext} disabled={!imageURL}>
            Next
          </Button>
        </Group>
      </Center>
    </div>
  );
}

export default UploadImage;
