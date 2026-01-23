export default function Graph({ city, images, basePath }) {
  if (!images) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {images.map((img) => {
        const title = img.replace(/\.[^/.]+$/, "").replace(/_/g, " ");

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
