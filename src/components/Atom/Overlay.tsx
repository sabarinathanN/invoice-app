import React, { ReactNode } from "react";

interface OverlayProps {
  children: ReactNode;
  onClose: () => void;
}

const Overlay: React.FC<OverlayProps> = ({ children, onClose }) => {
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    if (target.classList.contains("overlay")) {
      onClose();
    }
  };

  return (
   

<div className="overlay fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75 z-50" onClick={handleOverlayClick}>
<div className="bg-white rounded-md p-8 max-w-full overflow-y-auto h-[90%]">
<button className=" p-2 rounded-full bg-gray-300 hover:bg-gray-400" onClick={onClose}>
<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
  </button>
  {children}

</div>
</div>
  );
};

export default Overlay;
