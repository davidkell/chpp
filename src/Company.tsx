import React, { useEffect, useState } from "react";
import NaturesOfControl from "./NaturesOfControl";
import Ownership from "./Ownership";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding } from "@fortawesome/free-solid-svg-icons";

interface Props {
  psc: any;
  parents: string[];
}

const Company: React.FC<Props> = ({ psc, parents }) => {
  const [corporatePsc, setCorporatePsc] = useState<any>();

  useEffect(() => {
    // CORS requests need to happen via background tasks
    // https://www.chromium.org/Home/chromium-security/extension-content-script-fetches
    //@ts-ignore
    chrome.runtime.sendMessage(
      { contentScriptQuery: "queryCorporatePSC", companyName: psc.name },
      (new_psc: any) => setCorporatePsc(new_psc)
    );
  }, []);

  return (
    <div>
      {!corporatePsc ? (
        <span>{psc.name}</span>
      ) : (
        <>
          <div className="flex px-2">
            <FontAwesomeIcon icon={faBuilding} />{" "}
            <a className="font-bold mx-2" href={corporatePsc.links.self}>
              {corporatePsc.title}
            </a>
            <NaturesOfControl
              naturesOfControl={corporatePsc.natures_of_control}
            />
          </div>
          {!parents.includes(corporatePsc.company_number) ? (
            <div className="ml-8">
              <Ownership
                companyNumber={corporatePsc.company_number}
                parents={[...parents, corporatePsc.company_number]}
              />
            </div>
          ) : (
            "Loop"
          )}
        </>
      )}
    </div>
  );
};

export default Company;
