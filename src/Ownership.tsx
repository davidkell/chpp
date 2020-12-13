import React, { useEffect, useState } from "react";
import Company from "./Company";
import Individual from "./Individual";

interface Props {
  companyNumber: string;
  level: number;
}

const Ownership: React.FC<Props> = ({ companyNumber, level }) => {
  const [pscs, setPscs] = useState<any[]>();

  useEffect(() => {
    // CORS requests need to happen via background tasks
    // https://www.chromium.org/Home/chromium-security/extension-content-script-fetches
    //@ts-ignore
    chrome.runtime.sendMessage(
      { contentScriptQuery: "queryPSCs", companyNumber },
      (new_psc: any) => setPscs(new_psc)
    );
  }, []);

  return (
    <>
      {!pscs ? (
        "Loading..."
      ) : (
        <div>
          <div className="flex flex-col">
            {pscs
              .filter(
                (psc) =>
                  psc.kind ===
                  "corporate-entity-person-with-significant-control"
              )
              .map((psc) => (
                <Company psc={psc} level={level} />
              ))}
          </div>
          <div className="flex flex-col">
            {pscs
              .filter(
                (psc) =>
                  ![
                    "corporate-entity-person-with-significant-control",
                    "persons-with-significant-control-statement",
                    "none",
                  ].includes(psc.kind)
              )
              .map((psc) => (
                <div className="px-2">
                  <Individual psc={psc} />
                </div>
              ))}
          </div>
          <div className="flex flex-col">
            {pscs
              .filter(
                (psc) =>
                  psc.kind === "persons-with-significant-control-statement"
              )
              .map((psc) => (
                <span className="px-2">{psc.statement}</span>
              ))}
          </div>
          <div className="flex flex-col">
            {pscs
              .filter((psc) => psc.kind === "none")
              .map((_) => (
                <span className="px-2">
                  There are no persons with significant control or statements
                  available for this company.
                </span>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Ownership;
