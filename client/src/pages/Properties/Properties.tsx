import { PuffLoader } from "react-spinners";
import SearchBar from "../../components/SearchBar/SearchBar";
import useProperties from "../../hooks/useProperties";
import "./Properties.css";
import PropertyCard from "../../PropertyCard/PropertyCard";

export interface Card {
  id: string;
  title: string;
  price: string;
  description: string;
  image: string;
}

function Properties() {
  const { data, isError, isLoading } = useProperties();

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
        <SearchBar />

        <div className="paddings flexCenter properties">
          {data.residencies.map((card: Card, i: number) => (
            <PropertyCard card={card} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Properties;
