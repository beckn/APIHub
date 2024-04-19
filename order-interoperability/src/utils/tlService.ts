import jsonata from "jsonata";
import path from "path";
import fs from "fs";

export async function transform(data?: any, action?: string): Promise<any> {
  try {
    const expression = jsonata(
      fs.readFileSync(
        path.join(__dirname, `../mapping/${action}.jsonata`),
        "utf8"
      )
    );
    console.log("Transforming %s data: \n%o", action, JSON.stringify(data));
    let transformed: string = await expression.evaluate(data);
    console.log(
      "Transformed %s data: \n%o",
      action,
      JSON.stringify(transformed)
    );
    return transformed;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
}
