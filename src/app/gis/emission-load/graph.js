export default function Graph({ city, images, basePath }) {
  if (!images || images.length === 0) return null;

  // Exact priority order (uppercase match only)
  const PRIORITY_ORDER = ["PM10", "PM2.5", "NOx", "CO"];

  // 1️⃣ Pick priority images in exact sequence
  const priorityImages = [];
  const used = new Set();

  for (const key of PRIORITY_ORDER) {
    const found = images.find(
      (img) => img.includes(key) && !used.has(img)
    );

    if (found) {
      priorityImages.push(found);
      used.add(found);
    }
  }

  // 2️⃣ Remaining images (keep original order)
  const remainingImages = images.filter((img) => !used.has(img));

  // 3️⃣ Final ordered list
  const orderedImages = [...priorityImages, ...remainingImages];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {orderedImages.map((img) => {
        const title = img
          .replace(/\.[^/.]+$/, "")
          .replace(/_/g, " ");

        return (
          <div key={img} className="border rounded-lg p-3">
            <img
              src={`/GIS_DATA/${basePath}/${city}/${img}`}
              alt={title}
              className="w-full max-w-[700px] h-[400px] object-contain mx-auto"
            />
            <p className="text-sm text-center mt-2">
              {title}
            </p>
          </div>
        );
      })}
    </div>
  );
}
