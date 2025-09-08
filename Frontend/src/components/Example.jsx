import React, { useState } from "react";

export default function Example() {
  const [review, setreview] = useState(0)
  const [hovered, sethovered] = useState(0)

  return (
    <>
    <div style={{ fontSize: "2rem", cursor: "pointer", textAlign: "center" }}>
      <h2>Star Rating Example</h2>
      {Array.from({ length: 5 }, (_, i) => i + 1).map((star) => (
        <span
        key={star}
          onClick={() => setreview(star)}
          onMouseEnter={() => sethovered(star)}
          onMouseLeave={() => sethovered(0)}
          style={{ color: star <= (hovered || review) ? "gold" : "grey" }}
        >
          ★
        </span>
      ))}


      <p>{review ? `You rated ${review}/5` : "Click a star to rate"}</p>

    </div>
    </>
  );
}


