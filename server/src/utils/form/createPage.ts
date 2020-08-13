import Integration from "../../models/integration.ts";
import Matching from "../../models/matching.ts";
//import cheerio from "https://dev.jspm.io/cheerio";

const getForm = async (url: string) => {
  const res = await fetch(url);
  const text = await res.text();
  const formExp = RegExp(/<!DOCTYPE.*script>\\n\"/, "gms");
  const matches = formExp.exec(text);

  if (!matches) throw Error("No Match");
  const match = matches[0];
  // Strip the " at the end
  let formString = match.slice(0, match.length - 1);
  formString = formString.replaceAll(/\\n/g, "");
  formString = formString.replaceAll("\\/", "/");
  formString = formString.replaceAll('\\"', '"');
};

const createPage = async (
  integration: Integration,
  matchings: Matching[]
): Promise<string> => {
  // Fillerj
  // Make sure that this one is js form url
  //const formHTML = await getForm(integration.form_url);
  //const $ = cheerio.load(formHTML);
  //const labelElems = $(".form-label");
  //const fields = new Array<string>();
  //console.log(labelElems);
  //labelElems.each(function (
  //this: any,
  //index: number,
  //elem: cheerio.CheerioElement
  //) {
  //fields.push($(this).text());
  //});

  //console.log(labelElems);
  return new Promise<string>((resolve) => resolve("a"));
};

export default createPage;
