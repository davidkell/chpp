import React from "react";

interface Props {
  naturesOfControl: string[];
}

const SHARES = {
  "ownership-of-shares-75-to-100-percent": "75-100%",
  "ownership-of-shares-50-to-75-percent": "50-75%",
  "ownership-of-shares-25-to-50-percent": "25-50%",
  "ownership-of-shares-0-to-25-percent": "0-25%",
};

const VOTES = {};

const NaturesOfControl: React.FC<Props> = ({ naturesOfControl }) => {
  if (!naturesOfControl) return null;

  return (
    <span className="pl-2">
      {naturesOfControl.map((noc) => {
        //@ts-ignore

        return SHARES[noc];
      })}
    </span>
  );
};

export default NaturesOfControl;
