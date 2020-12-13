import {
  faChartPie,
  faSitemap,
  faVoteYea,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface Props {
  naturesOfControl: string[];
}

const SHARES = {
  "ownership-of-shares-75-to-100-percent": "75-100%",
  "ownership-of-shares-50-to-75-percent": "50-75%",
  "ownership-of-shares-25-to-50-percent": "25-50%",
  "significant-influence-or-control": "Significant",
};

const VOTES = {
  "voting-rights-75-to-100-percent": "75-100%",
  "voting-rights-50-to-75-percent": "50-75%",
  "voting-rights-25-to-50-percent": "25-50%",
};

const NaturesOfControl: React.FC<Props> = ({ naturesOfControl }) => {
  if (!naturesOfControl) return null;

  return (
    <span className="pl-2 relative flex space-x-2">
      {naturesOfControl
        .filter((noc) => noc in SHARES)
        .map((noc) => {
          return (
            <div className="bg-gray-200 text-gray-700 text-lg font-semibold p-1 px-3 rounded tooltip">
              <FontAwesomeIcon className="mr-2" icon={faChartPie} />
              {
                //@ts-ignore
                SHARES[noc]
              }
              <p className="absolute bg-black text-white p-1 tooltip-text rounded">
                Ownership of shares
              </p>
            </div>
          );
        })}
      {naturesOfControl
        .filter((noc) => noc in VOTES)
        .map((noc) => {
          return (
            <div className="bg-gray-200 text-gray-700 text-lg font-semibold p-1 px-3 rounded tooltip">
              <FontAwesomeIcon className="mr-2" icon={faVoteYea} />
              {
                //@ts-ignore
                VOTES[noc]
              }
              <p className="absolute bg-black text-white p-1 tooltip-text rounded">
                Voting rights
              </p>
            </div>
          );
        })}
      {naturesOfControl.filter(
        (noc) => noc === "right-to-appoint-and-remove-directors"
      ).length > 0 && (
        <div className="bg-gray-200 text-gray-700 text-lg font-semibold p-1 px-3 rounded tooltip">
          <FontAwesomeIcon className="mr-2" icon={faSitemap} />
          <p className="absolute bg-black text-white p-1 tooltip-text rounded">
            Right to appoint and remove directors
          </p>
        </div>
      )}
    </span>
  );
};

export default NaturesOfControl;
