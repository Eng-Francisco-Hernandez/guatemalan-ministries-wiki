import publicInformation from "./public-information";

export class PublicFinancesMinistryClient {
  protected host = "https://capaportaldatosabiertos.mingob.gob.gt";
  
  getPublicItems = publicInformation.getPublicItems;
  getDataAndResources = publicInformation.getDataAndResources;
}

export default PublicFinancesMinistryClient;
