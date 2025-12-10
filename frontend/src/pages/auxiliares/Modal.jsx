import { createPortal } from "react-dom";

export default function Modal({ open, onClose, children }) {
  if (!open) return null;

  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return createPortal(
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={handleOutsideClick}
    >
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg">
        {children}
      </div>
    </div>,
    document.body
  );
}