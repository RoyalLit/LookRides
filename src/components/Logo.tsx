import Image from 'next/image';

type BlendMode = 'screen' | 'multiply';

export default function Logo({ variant = 'dark', height = 80 }: { variant?: 'dark' | 'light', height?: number }) {
  const src = variant === 'light' ? '/logo-light.png' : '/logo-dark.png';
  const alt = "LookRides Logo";
  const width = height * 4.5; 
  const blendMode: BlendMode = variant === 'light' ? 'screen' : 'multiply';

  return (
    <div style={{ 
      position: 'relative', 
      height: `${height}px`, 
      width: `${width}px`,
      mixBlendMode: blendMode,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'relative',
        width: '100%',
        height: '180%',
        transform: 'translateY(-2%)'
      }}>
        <Image
          src={src}
          alt={alt}
          width={160}
          height={60}
          style={{ 
            position: 'absolute',
            objectFit: 'contain',
            width: '250%',
            height: '250%',
            left: '-75%',
            top: '-75%',
            maxWidth: 'none'
          }}
          unoptimized
          priority
        />
      </div>
    </div>
  );
}
