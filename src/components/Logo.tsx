import Image from 'next/image';

export default function Logo({ variant = 'dark', height = 80 }: { variant?: 'dark' | 'light', height?: number }) {
  // Use the specific PNG files requested by the user
  const src = variant === 'light' ? '/logo-light.png' : '/logo-dark.png';
  const alt = "LookRides Logo";
  
  // Aspect ratio adjustment for the square images with horizontal content
  const width = height * 4.5; 

  // Blending modes to handle the non-transparent backgrounds of the PNGs
  const blendMode = variant === 'light' ? 'screen' : 'multiply';

  return (
    <div style={{ 
      position: 'relative', 
      height: `${height}px`, 
      width: `${width}px`,
      mixBlendMode: blendMode as any,
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
          width={1024}
          height={1024}
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
