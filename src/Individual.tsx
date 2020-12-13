import React, { useEffect, useState } from "react";
import NaturesOfControl from "./NaturesOfControl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

interface Props {
  psc: any;
}

const Individual: React.FC<Props> = ({ psc }) => {
  const [individualPsc, setIndividualPsc] = useState<any>();

  useEffect(() => {
    // CORS requests need to happen via background tasks
    // https://www.chromium.org/Home/chromium-security/extension-content-script-fetches
    //@ts-ignore
    chrome.runtime.sendMessage(
      { contentScriptQuery: "queryIndividualPSC", companyName: psc.name },
      (newPsc: any) => setIndividualPsc(newPsc)
    );
  }, []);

  console.log(individualPsc);

  return (
    <span className="flex">
      <FontAwesomeIcon icon={faUser} />
      {!individualPsc ? (
        <span className="font-bold ml-4 mr-2">{psc.name}</span>
      ) : (
        <a className="font-bold ml-4 mr-2" href={individualPsc.links.self}>
          {individualPsc.title}
        </a>
      )}
      <NaturesOfControl naturesOfControl={psc.natures_of_control} />
    </span>
  );
};

export default Individual;
