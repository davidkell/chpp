const CH_URL = "https://api.company-information.service.gov.uk";
const headers = {
  Authorization: "hcgHBMyoQKYEo3KhQXHIO0d_akc5yGaT8JVYMW-2",
};

const fetchPsc = async (companyNumber: string) => {
  const result = await fetch(
    `${CH_URL}/company/${companyNumber}/persons-with-significant-control`,
    { headers }
  );
  const pscs = await result.json();

  if (pscs.errors) {
    const result = await fetch(
      `${CH_URL}/company/${companyNumber}/persons-with-significant-control-statements`,
      { headers }
    );

    const statements = await result.json();

    if (statements.errors) {
      return [
        {
          kind: "none",
        },
      ];
    }
    return statements.items;
  }

  return pscs.items;
};

const searchCorporate = async (pscName: string) => {
  const result = await fetch(
    `${CH_URL}/search/companies?q=${encodeURI(pscName)}`,
    { headers }
  );
  const search = await result.json();
  return search.items[0];
};

const searchIndividual = async (pscName: string) => {
  const result = await fetch(
    `${CH_URL}/search/officers?q=${encodeURI(pscName)}`,
    { headers }
  );
  const search = await result.json();
  return search.items[0];
};

//@ts-ignore
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.contentScriptQuery == "queryPSCs") {
    fetchPsc(request.companyNumber).then(sendResponse);
    return true;
  }
  if (request.contentScriptQuery == "queryCorporatePSC") {
    searchCorporate(request.companyName).then(sendResponse);
    return true;
  }
  if (request.contentScriptQuery == "queryIndividualPSC") {
    searchIndividual(request.companyName).then(sendResponse);
    return true;
  }
});
