import { useState } from "react";

export default function PhotoCard({ photo, onClick }) {
  const [isOpen, setIsOpen] = useState(false);

  const imageUrl = photo?.imageUrl?.startsWith("http")
    ? photo.imageUrl
    : `http://localhost:5000${photo?.imageUrl}`;

  const handleOpen = () => {
    setIsOpen(true);

    // Parent component ka onClick bhi chalega
    if (onClick) {
      onClick(photo);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Photo Card */}
      <button
        type="button"
        onClick={handleOpen}
        className="group relative overflow-hidden rounded-md bg-charcoal-lighter aspect-[4/5] w-full text-left cursor-pointer"
      >
        <img
          src={imageUrl}
          alt={photo?.title || "Studio Photo"}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/0 to-charcoal/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Photo Information */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <p className="font-display text-lg text-ivory">
            {photo?.title}
          </p>

          <p className="text-xs text-gold tracking-wide">
            {photo?.category}
          </p>
        </div>
      </button>

      {/* Full Screen Image Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 p-4"
          onClick={handleClose}
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={handleClose}
            className="absolute right-5 top-5 z-[10000] flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-3xl text-white hover:bg-white/20 transition"
            aria-label="Close image"
          >
            ×
          </button>

          {/* Image Container */}
          <div
            className="relative flex max-h-[95vh] max-w-[95vw] flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={imageUrl}
              alt={photo?.title || "Studio Photo"}
              className="max-h-[88vh] max-w-[95vw] object-contain rounded-md shadow-2xl"
            />

            {/* Image Details */}
            <div className="mt-3 text-center">
              <p className="font-display text-xl text-white">
                {photo?.title}
              </p>

              <p className="mt-1 text-sm text-yellow-400">
                {photo?.category}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}