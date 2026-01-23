import fs from "fs";
import path from "path";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type"); 
  // "emission-data" OR "road-network-data"

  const basePath = path.join(
    process.cwd(),
    "public",
    "GIS_DATA",
    type
  );

  const result = {};

  const cities = fs.readdirSync(basePath, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  cities.forEach((city) => {
    const cityPath = path.join(basePath, city);

    const images = fs.readdirSync(cityPath)
      .filter((f) => /\.(png|jpg|jpeg|svg|tif)$/i.test(f));

    result[city] = images;
  });

  return Response.json(result);
}
