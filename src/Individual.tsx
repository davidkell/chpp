import React from "react";
import NaturesOfControl from "./NaturesOfControl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

interface Props {
  psc: any;
}

const Individual: React.FC<Props> = ({ psc }) => {
  return (
    <span className="flex px-2">
      <FontAwesomeIcon icon={faUser} />
      {psc.name}
      <NaturesOfControl naturesOfControl={psc.natures_of_control} />
    </span>
  );
};

export default Individual;
