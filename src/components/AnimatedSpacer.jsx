"use client";

export default function AnimatedSpacer() {
  return (
    <div
      className="w-full flex-1 bg-repeat-x bg-top bg-transparent"
      style={{
        backgroundImage: "url('/banner.png')",
        backgroundSize: "auto 100%",
      }}
    />
  );
}
