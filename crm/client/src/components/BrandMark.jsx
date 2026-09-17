// Placeholder brand mark in the school's colors (navy/blue + orange),
// standing in for the real Upfront Idiomas logo until we have it as a
// file we can embed directly.
export default function BrandMark({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="brandGrad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#1E2A5C" />
          <stop offset="1" stopColor="#2F6FED" />
        </linearGradient>
      </defs>
      <circle cx="20" cy="20" r="19" fill="url(#brandGrad)" stroke="#F5A524" strokeWidth="1.5" />
      <path d="M12 12v10a8 8 0 0 0 16 0V12" stroke="#fff" strokeWidth="3.2" fill="none" strokeLinecap="round" />
      <path d="M22 10 L30 10 L30 18" stroke="#F5A524" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M30 10 L20 20" stroke="#F5A524" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}
