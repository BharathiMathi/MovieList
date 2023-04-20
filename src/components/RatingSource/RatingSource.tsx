import { Ratings } from "../../models/movieModel";

const RatingSource = ({ Source, Value }: Ratings) => {
  return (
    <div
      style={{
        borderRadius: "10px",
        border: "1px solid #0000ff6e",
        padding: "4px 10px",
        marginRight: "10px",
      }}
    >
      <div style={{ color: "#0000ffc7" }}>{`${Source}: ${Value}`}</div>
    </div>
  );
};

export default RatingSource;
