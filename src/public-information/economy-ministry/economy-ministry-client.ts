import publicInformation from "./public-information";

export class EconomyMinistryClient {
  protected host = "https://www.mineco.gob.gt";

  getCategories = publicInformation.getCategories;
  getCategoryInformation = publicInformation.getCategoryInformation;
}

export default EconomyMinistryClient;
