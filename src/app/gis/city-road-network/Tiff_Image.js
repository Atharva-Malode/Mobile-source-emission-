"use client";

import { useEffect, useState } from "react";
import * as UTIF from "utif";

export default function TiffImage({ src, alt }) {
  const [pngUrl, setPngUrl] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function convertTiff() {
      try {
        const res = await fetch(src);
        const buffer = await res.arrayBuffer();

        // Decode TIFF
        const ifds = UTIF.decode(buffer);
        UTIF.decodeImage(buffer, ifds[0]);

        const rgba = UTIF.toRGBA8(ifds[0]);
        const { width, height } = ifds[0];

        // Draw to canvas
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        const imageData = ctx.createImageData(width, height);
        imageData.data.set(rgba);

        ctx.putImageData(imageData, 0, 0);

        // Convert to PNG
        const png = canvas.toDataURL("image/png");

        if (!cancelled) {
          setPngUrl(png);
        }
      } catch (err) {
        console.error("TIFF conversion failed:", err);
        if (!cancelled) setError(true);
      }
    }

    convertTiff();

    return () => {
      cancelled = true;
    };
  }, [src]);

  if (error) {
    return (
      <div className="h-[400px] flex items-center justify-center text-sm text-red-600">
        Failed to load TIFF image
      </div>
    );
  }

  if (!pngUrl) {
    return (
      <div className="h-[400px] flex items-center justify-center text-sm text-gray-500">
        Loading image…
      </div>
    );
  }

  return (
    <img
      src={pngUrl}
      alt={alt}
      className="w-full max-w-[700px] h-[400px] object-contain mx-auto"
    />
  );
}
