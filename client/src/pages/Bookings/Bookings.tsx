import { PuffLoader } from "react-spinners";
import SearchBar from "../../components/SearchBar/SearchBar";
import useProperties from "../../hooks/useProperties";
import "../Properties/Properties.css";
import PropertyCard from "../../PropertyCard/PropertyCard";
import { useContext, useState } from "react";
import { PropertyDetails } from "../../components/AddLocation/AddLocation";
import { Card } from "../Properties/Properties";
import UserDetailContext from "../../context/UserDetailContext";

function Bookings() {
  const { data, isError, isLoading } = useProperties();
  const [filter, setFilter] = useState("");
  const {
    userDetails: { bookings },
  } = useContext(UserDetailContext);

  if (isError) {
    return (
      <div className="wrapper">
        <span>Error while fetching data</span>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="wrapper flexCenter" style={{ height: "60vh" }}>
        <PuffLoader color="#4066ff" aria-label="puff-loading" />
      </div>
    );
  }

  console.log("residencies", data);

  return (
    <div className="wrapper">
      <div className="flexColCenter paddings innerWidth properties-container">
        <SearchBar filter={filter} setFilter={setFilter} />

        <div className="paddings flexCenter properties">
          {data.residencies

            .filter((property: PropertyDetails) =>
              bookings.map((bookings: any) => bookings.id).includes(property.id)
            )

            .filter(
              (property: PropertyDetails) =>
                property.title.toLowerCase().includes(filter.toLowerCase()) ||
                property.city.toLowerCase().includes(filter.toLowerCase()) ||
                property.country.toLowerCase().includes(filter.toLowerCase())
            )
            .map((card: Card, i: number) => (
              <PropertyCard card={card} key={i} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Bookings;
