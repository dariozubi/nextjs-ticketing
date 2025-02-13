import styled from "styled-components";
import SVGIcons from "./SVGIcons";
import IconAvailable from "./IconAvailable";
import IconReserved from "./IconReserved";
import IconSelected from "./IconSelected";

type Props = {
  available: number;
  selected: number;
};

export const Legend = ({ available, selected }: Props) => {
  return (
    <>
      <div style={{ display: "none" }}>
        <SVGIcons />
      </div>
      <LegendContainer>
        <LegendItem>
          <IconAvailable size={16} number={available} />
          <LegendItemName>Available</LegendItemName>
        </LegendItem>
        <LegendItem>
          <IconReserved size={16} />
          <LegendItemName>Reserved</LegendItemName>
        </LegendItem>
        <LegendItem>
          <IconSelected size={16} number={selected} />
          <LegendItemName>Selected</LegendItemName>
        </LegendItem>
      </LegendContainer>
    </>
  );
};

// display the legend items side by side, prefaced by a matching icon
const LegendContainer = styled.div`
  display: flex;
  margin: 1.25rem 0;
  justify-content: center;
`;
const LegendItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0.35rem;

  svg {
    margin-right: 0.2rem;
    border-radius: 50%;
    width: 16px;
    height: 16px;
  }
`;
const LegendItemName = styled.span`
  text-transform: capitalize;
  color: hsl(0, 0%, 75%);
  letter-spacing: 0.05rem;
  font-weight: 700;
  font-size: 0.6rem;
`;
