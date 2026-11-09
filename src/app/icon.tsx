import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

const petals = Array.from({ length: 8 }, (_, i) => 45 * i);

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#eae2cd",
          borderRadius: 8,
        }}
      >
        <svg width="28" height="28" viewBox="0 0 100 100">
          {petals.map((angle) => (
            <ellipse
              key={angle}
              cx="50"
              cy="28"
              rx="19"
              ry="23"
              fill="#e28a89"
              transform={`rotate(${angle} 50 50)`}
            />
          ))}
          <circle cx="50" cy="50" r="26" fill="#e28a89" />
          <circle cx="50" cy="50" r="9" fill="#0b0a08" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
