import cheerio from "https://dev.jspm.io/cheerio";

import Integration from "../../models/integration.ts";
import Matching from "../../models/matching.ts";

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
  return formString;
};
const createPage = async (
  integration: Integration,
  matchings: Matching[]
): Promise<string> => {
  //console.log(labelElems);

  // Make sure that this one is js form url
  //
  const jotFormID = integration.form_url.split("/")[3];
  console.log(jotFormID);
  const form_url = "https://form.jotform.com/jsform/" + jotFormID;
  try {
    const formHTML = await getForm(form_url);
    console.log(formHTML);
    //@ts-ignore
    const $ = cheerio.load(formHTML);
    // Script Start

    const matchingsString = matchings.reduce((str: string, matching) => {
      return `${str}{param:"${matching.contract_parameter}",field:"${matching.form_field}"},`;
    }, "");
    const dataScript = `
    <script>
      const CONTRACT_ADDRESS = "${integration.contract.address}";
      const CONTRACT_ABI =${integration.contract.abi};
      const CONTRACT_METHOD_NAME = "${integration.contract.method}";
      const Matchings = [${matchingsString}];
    </script>
  `;

    console.log(dataScript);
    $("head").append(dataScript);

    const decoder = new TextDecoder("utf-8");
    const readFileStr = async (file: string) =>
      decoder.decode(await Deno.readFile(file));
    let jsScript;
    jsScript = await readFileStr("./src/utils/form/injected.js");
    console.log("File read");

    $("head").append("<script>" + jsScript + "</script>");
    const submitButton = $(".form-submit-button");
    submitButton.attr("onClick", "submitClick(event)");
    submitButton.attr("type", "button");
    console.log("Page Created");
    return $.html();
  } catch (err) {
    console.log(err);
    return "";
  }
};
export default createPage;
