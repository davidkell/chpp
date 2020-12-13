import "chrome-extension-async";

const CH_URL = "https://api.company-information.service.gov.uk";
const headers = {
  Authorization: "hcgHBMyoQKYEo3KhQXHIO0d_akc5yGaT8JVYMW-2",
};

const fetchCache = async (path: string) => {
  // chrome.storage.sync maximum bytes per item is ~8kb
  const cached = await chrome.storage.local.get({ [path]: null });

  if (cached[path] !== null) {
    return cached[path];
  }

  const result = fetch(`${CH_URL}/${path}`, { headers });
  const json = await (await result).json();

  chrome.storage.local.set({ [path]: json });
  return json;
};

const fetchPsc = async (companyNumber: string) => {
  const pscs = await fetchCache(
    `/company/${companyNumber}/persons-with-significant-control`
  );

  if (pscs.errors) {
    const statements = await fetchCache(
      `/company/${companyNumber}/persons-with-significant-control-statements`
    );

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
  const search = await fetchCache(
    `/search/companies?q=${encodeURI(pscName.toUpperCase())}`
  );
  return search.items[0];
};

const searchIndividual = async (pscName: string) => {
  const search = await fetchCache(
    `/search/officers?q=${encodeURI(pscName).toUpperCase()}`
  );
  return search.items[0];
};

chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
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
  return false;
});
