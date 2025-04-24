export function Button({ children, onClick, className = "", type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded ${className}`}
    >
      {children}
    </button>
  );
}

