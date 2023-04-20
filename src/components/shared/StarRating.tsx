import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faSoildStar } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";

import { range } from "../../utils/util";

const width = 169;

interface classesType {
  [className: string]: React.CSSProperties;
}

const styles: classesType = {
  starsInner: {
    width: `${width}px`,
  },
  starsEmptyInner: {
    position: "absolute",
    width: `${width}px`,
    color: "gray",
  },
  starsOuter: {
    overflow: "hidden",
  },
  star: {
    padding: "1px",
  },
  starFilled: {
    color: "#ffd700",
    padding: "2.25px 0 0 0",
    zIndex: "1",
  },
};

const cropWidth = (rating: number) => {
  return Math.floor((rating * width) / 10);
};

interface StarRatingProps {
  rating: number;
}

export const StarRating = (props: StarRatingProps) => {
  const { rating } = props;
  const containerStyle = {
    width: `${cropWidth(rating)}px`,
    display: "inline-flex",
    overflow: "hidden",
  };

  return (
    <div>
      <div style={styles.starsOuter}>
        <div id="rate-container" style={containerStyle}>
          <div style={styles.starsEmptyInner}>
            {range(10, 1).map((i) => (
              <FontAwesomeIcon key={i} icon={faStar} fontSize={"15px"} />
            ))}
          </div>
          <div style={containerStyle}>
            {range(10, 1).map((i) => (
              <FontAwesomeIcon
                key={i}
                icon={faSoildStar}
                fontSize={"15px"}
                style={{ ...styles.star, ...styles.starFilled }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
