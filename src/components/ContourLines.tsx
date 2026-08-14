type Props = {
  className?: string;
  tone?: "moss" | "sage";
};

// A set of nested, hand-tuned contour paths — a nod to the township's site
// plan and the "Prakruthi" (nature) in the association's name. Used as a
// quiet backdrop element, never as decoration competing with content.
export default function ContourLines({ className = "", tone = "moss" }: Props) {
  const stroke = tone === "moss" ? "#26392c" : "#eef1e8";
  return (
    <svg
      viewBox="0 0 800 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M-20 250 C 120 210, 180 290, 300 240 C 420 190, 480 260, 620 220 C 720 190, 780 230, 840 200"
        stroke={stroke}
        strokeOpacity="0.15"
        strokeWidth="1.5"
      />
      <path
        d="M-20 200 C 100 160, 200 230, 320 190 C 440 150, 500 210, 640 170 C 730 145, 790 180, 850 150"
        stroke={stroke}
        strokeOpacity="0.22"
        strokeWidth="1.5"
      />
      <path
        d="M-20 150 C 110 115, 190 175, 310 140 C 430 105, 510 155, 630 120 C 720 95, 780 125, 850 100"
        stroke={stroke}
        strokeOpacity="0.32"
        strokeWidth="1.5"
      />
      <path
        d="M-20 100 C 100 70, 210 120, 330 90 C 440 65, 520 105, 630 75 C 710 55, 780 80, 850 55"
        stroke={stroke}
        strokeOpacity="0.45"
        strokeWidth="1.5"
      />
    </svg>
  );
}
