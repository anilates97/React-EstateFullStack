import { truncate } from "lodash";
import "./PropertyCard.css";
import { useNavigate } from "react-router-dom";
import Heart from "../components/Heart/Heart";

export interface Props {
  card: {
    id: string;
    title: string;
    price: string;
    description: string;
    image: string;
  };
}

function PropertyCard({ card }: Props) {
  const navigate = useNavigate();
  return (
    <div
      className="flexColStart r-card"
      onClick={() => navigate(`/properties/${card.id}`)}
    >
      <Heart id={card?.id} />
      <img src={card.image} alt="home" />

      <span className="secondaryText r-price">
        <span style={{ color: "orange" }}>$</span>
        <span>{card.price}</span>
      </span>

      <span className="primaryText">
        {truncate(card.title, { length: 15 })}
      </span>
      <span className="secondaryText">
        {truncate(card.description, { length: 80 })}
      </span>
    </div>
  );
}

export default PropertyCard;
