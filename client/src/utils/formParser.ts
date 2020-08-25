import axios from "axios";
import cheerio from "cheerio";
import { FormField } from "./types";
export async function getFormField(url: string): Promise<Array<FormField>> {
  const formPage = await getFormPage(url);
  if (!formPage) {
    return [];
  }
  const fields = parseForm(formPage);
  console.log(fields);
  return fields;
}

export async function getFormPage(url: string): Promise<string | null> {
  const response = await axios.get(url);
  //console.log(response);
  const pageData = response.data;
  return pageData;
}

export function parseForm(page: string): Array<FormField> {
  const $ = cheerio.load(page);
  const labelElems = $(".form-label");
  const fields = new Array<FormField>();
  //console.log(labelElems);
  labelElems.each(function (this: any, index: number, elem: any) {
    const formField = {
      field: $(this).text(),
      id: parseInt($(this).attr("id")?.substr(6) || "0"),
    } as FormField;
    fields.push(formField);
  });
  return fields;
}
