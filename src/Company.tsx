import React, { useEffect, useState } from "react";
import NaturesOfControl from "./NaturesOfControl";
import Ownership from "./Ownership";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding } from "@fortawesome/free-solid-svg-icons";

interface Props {
  psc: any;
  level: number;
}

const Company: React.FC<Props> = ({ psc, level }) => {
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

  if (level > 5) return <span>Possible loop?</span>;

  return (
    <div>
      {!corporatePsc ? (
        <span>{psc.name}</span>
      ) : (
        <>
          <div className="flex px-2">
            <FontAwesomeIcon icon={faBuilding} />{" "}
            <a href={corporatePsc.links.self}>{corporatePsc.title}</a>{" "}
            <NaturesOfControl
              naturesOfControl={corporatePsc.natures_of_control}
            />
          </div>
          <div className="ml-8">
            <Ownership
              companyNumber={corporatePsc.company_number}
              level={level + 1}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Company;
