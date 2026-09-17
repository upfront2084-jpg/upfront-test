// The real Upfront Idiomas logo (client/public/logo-*.png).
export default function BrandMark({ size = 40 }) {
  return (
    <img
      src="/logo-128.png"
      srcSet="/logo-64.png 64w, /logo-128.png 128w, /logo-256.png 256w"
      sizes={`${size}px`}
      width={size}
      height={size}
      alt="Upfront Idiomas"
      style={{ display: 'block', borderRadius: '50%' }}
    />
  );
}
