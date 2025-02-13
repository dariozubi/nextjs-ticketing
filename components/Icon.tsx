// Component to inject the icon created through a symbol element
// Render the svg icon using the href passed as props
export const Icon = ({
  href,
  size = 100,
  text,
}: {
  href: string;
  size: number;
  text?: string;
}) => {
  return (
    <svg className={href} width={size} height={size}>
      <use href={`#${href}`} />
      {text && (
        <text x="50" y="65" fontSize="2.7rem" textAnchor="middle" fill="#fff">
          {text}
        </text>
      )}
    </svg>
  );
};
