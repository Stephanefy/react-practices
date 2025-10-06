export default function CrossSvg() {
  return (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="none"
    viewBox="0 0 16 16"
    className="inline-block align-middle ml-2"
    aria-label="cross"
  >
    <line x1="4" y1="4" x2="12" y2="12" stroke="#888" strokeWidth="2" strokeLinecap="round" />
    <line x1="12" y1="4" x2="4" y2="12" stroke="#888" strokeWidth="2" strokeLinecap="round" />
  </svg>
  );
}