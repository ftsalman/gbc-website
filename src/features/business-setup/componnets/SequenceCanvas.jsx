import React from "react";

export const SequenceCanvas = ({ canvasRef, overlay = "hero" }) => (
  <>
    <canvas ref={canvasRef} className="block h-full w-full" />
    {overlay === "hero" && (
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.86) 0%, rgba(0,0,0,0.45) 32%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0) 100%)",
        }}
      />
    )}
    {overlay === "journey" && (
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/90 via-black/35 to-black/10" />
    )}
    {overlay === "process" && (
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/90 via-black/35 to-black/5" />
    )}
  </>
);
