import Integration from "../../models/integration.ts";
import Matching from "../../models/matching.ts";
const createPage = async (
  integration: Integration,
  matchings: Matching[]
): Promise<string> => {
  // Filler;
  return new Promise<string>((resolve) => resolve("a"));
};

export default createPage;
