export function Input({ className = "", ...props }) {
  return (
    <input
      {...props}
      className={`border rounded px-3 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 ${className}`}
    />
  );
}
