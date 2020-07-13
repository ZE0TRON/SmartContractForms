import axios from "axios";
import cheerio from "cheerio";

export async function getFormField(url: string): Promise<Array<string>> {
  const formPage = await getFormPage(url);
  if (!formPage) {
    return [];
  }
  const fields = parseForm(formPage);
  return fields;
}

export async function getFormPage(url: string): Promise<string | null> {
  const response = await axios.get(url);
  //console.log(response);
  const pageData = response.data;
  return pageData;
}

export function parseForm(page: string): Array<string> {
  const $ = cheerio.load(page);
  const labelElems = $(".form-label");
  const fields = new Array<string>();
  //console.log(labelElems);
  labelElems.each(function(this: any, index: number, elem: CheerioElement) {
    fields.push($(this).text());
  });
  return fields;
}
