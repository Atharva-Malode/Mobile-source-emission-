"use client";

import TiffImage from "./Tiff_Image";

/* IMAGE DISPLAY ORDER */
const ORDER = [
  { key: "location", label: "Location" },
  { key: "grid", label: "Grid" },
  { key: "road", label: "Road" },
  { key: "rail", label: "Railway" },
];

export default function Graph({ city, images, basePath }) {
  if (!images || images.length === 0) return null;

  const orderedImages = ORDER.flatMap(({ key }) =>
    images.filter((img) => img.toLowerCase().includes(key))
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {orderedImages.map((img) => {
        const isTiff = /\.(tif|tiff)$/i.test(img);
        const title = img.replace(/\.[^/.]+$/, "").replace(/_/g, " ");
        const src = `/GIS_DATA/${basePath}/${city}/${img}`;

        return (
          <div key={img} className="border rounded-lg p-3 bg-white">
            {isTiff ? (
              <TiffImage src={src} alt={title} />
            ) : (
              <img
                src={src}
                alt={title}
                className="w-full max-w-[700px] h-[400px] object-contain mx-auto"
              />
            )}

            <p className="text-sm text-center mt-2 font-medium">
              {title}
            </p>
          </div>
        );
      })}
    </div>
  );
}
