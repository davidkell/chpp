const CH_URL = "https://api.company-information.service.gov.uk";
const headers = {
  Authorization: "hcgHBMyoQKYEo3KhQXHIO0d_akc5yGaT8JVYMW-2",
};

const fetch_psc = async (companyNumber: string) => {
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

const search_corporate = async (psc_name: string) => {
  const result = await fetch(
    `${CH_URL}/search/companies?q=${encodeURI(psc_name)}`,
    { headers }
  );
  const search = await result.json();
  return search.items[0];
};

//@ts-ignore
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.contentScriptQuery == "queryPSCs") {
    fetch_psc(request.companyNumber).then(sendResponse);
    return true;
  }
  if (request.contentScriptQuery == "queryCorporatePSC") {
    search_corporate(request.companyName).then(sendResponse);
    return true;
  }
});
