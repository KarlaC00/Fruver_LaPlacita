import React from "react";
import "../../styles/FrutasScroll.css";

const frutas = [
  "🍎", "🍌", "🍇", "🥑", "🍉", "🥦", "🍊", "🍓", "🍍", "🥕", "🥬", "🥭",
  "🍅", "🥒", "🍈", "🫐", "🌽", "🍐"
];

const FrutasScroll = () => {
  return (
    <div className="scroll-container">
      <div className="scroll-track">
        {[...frutas, ...frutas].map((fruta, index) => (
          <span className="fruta-icon" key={index}>{fruta}</span>
        ))}
      </div>
    </div>
  );
};

export default FrutasScroll;
