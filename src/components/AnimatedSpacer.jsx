"use client";

export default function AnimatedSpacer({ height = 200 }) {
  return (
    <div
      className="relative w-full overflow-hidden bg-gray-50"
      style={{ height }}
    >
      {/* Moving Circle */}
      <div className="circle" />

      {/* Component-scoped animation */}
      <style jsx>{`
        .circle {
          position: absolute;
          top: 50%;
          left: -40px;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: rgba(59, 130, 246, 0.4);
          transform: translateY(-50%);
          animation: moveCircle 6s linear infinite;
        }

        @keyframes moveCircle {
          from {
            transform: translate(-40px, -50%);
          }
          to {
            transform: translate(calc(100vw + 40px), -50%);
          }
        }
      `}</style>
    </div>
  );
}
