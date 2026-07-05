'use client';

import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform, type OGLRenderingContext } from 'ogl';
import { useEffect, useRef } from 'react';

import './CircularGallery.css';

// eslint-disable-next-line no-unused-vars
function debounce<T extends (...p: unknown[]) => void>(func: T, wait: number) {
  let timeout: ReturnType<typeof setTimeout>;
  return function (this: unknown, ...args: Parameters<T>) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

function lerp(p1: number, p2: number, t: number) {
  return p1 + (p2 - p1) * t;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function autoBind(instance: any) {
  const proto = Object.getPrototypeOf(instance);
  Object.getOwnPropertyNames(proto).forEach(key => {
    if (key !== 'constructor' && typeof instance[key] === 'function') {
      // eslint-disable-next-line no-unused-vars
      instance[key] = (instance[key] as (...p: unknown[]) => unknown).bind(instance);
    }
  });
}

interface MediaData {
  image: string;
  text: string;
  desc?: string;
  time?: string;
  route?: string;
}

interface MediaParams {
  geometry: Plane;
  gl: OGLRenderingContext;
  image: string;
  index: number;
  length: number;
  renderer: Renderer;
  scene: Transform;
  screen: { width: number; height: number };
  text: string;
  viewport: { width: number; height: number };
  bend: number;
  textColor: string;
  borderRadius: number;
  font: string;
}

interface ScrollState {
  ease: number;
  current: number;
  target: number;
  last: number;
  position: number;
}

class Media {
  extra = 0;
  geometry: Plane;
  gl: OGLRenderingContext;
  image: string;
  index: number;
  length: number;
  renderer: Renderer;
  scene: Transform;
  screen: { width: number; height: number };
  text: string;
  viewport: { width: number; height: number };
  bend: number;
  textColor: string;
  borderRadius: number;
  font: string;
  program!: Program;
  plane!: Mesh;
  scale!: number;
  padding!: number;
  width!: number;
  widthTotal!: number;
  x!: number;
  speed = 0;
  isBefore = false;
  isAfter = false;

  constructor({
    geometry, gl, image, index, length, renderer, scene, screen, text, viewport, bend, textColor, borderRadius, font
  }: MediaParams) {
    this.extra = 0;
    this.geometry = geometry;
    this.gl = gl;
    this.image = image;
    this.index = index;
    this.length = length;
    this.renderer = renderer;
    this.scene = scene;
    this.screen = screen;
    this.text = text;
    this.viewport = viewport;
    this.bend = bend;
    this.textColor = textColor;
    this.borderRadius = borderRadius;
    this.font = font;
    this.createShader();
    this.createMesh();
    this.onResize();
  }
  createShader() {
    const texture = new Texture(this.gl, {
      generateMipmaps: true
    });
    this.program = new Program(this.gl, {
      depthTest: false,
      depthWrite: false,
      vertex: `
        precision highp float;
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        uniform float uTime;
        uniform float uSpeed;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec3 p = position;
          p.z = (sin(p.x * 4.0 + uTime) * 1.5 + cos(p.y * 2.0 + uTime) * 1.5) * (0.1 + uSpeed * 0.5);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform vec2 uImageSizes;
        uniform vec2 uPlaneSizes;
        uniform sampler2D tMap;
        uniform float uBorderRadius;
        varying vec2 vUv;
        
        float roundedBoxSDF(vec2 p, vec2 b, float r) {
          vec2 d = abs(p) - b;
          return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r;
        }
        
        void main() {
          vec2 ratio = vec2(
            min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
            min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
          );
          vec2 uv = vec2(
            vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
            vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
          );
          vec4 color = texture2D(tMap, uv);
          
          float d = roundedBoxSDF(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius);
          
          float edgeSmooth = 0.002;
          float alpha = 1.0 - smoothstep(-edgeSmooth, edgeSmooth, d);
          
          gl_FragColor = vec4(color.rgb, alpha);
        }
      `,
      uniforms: {
        tMap: { value: texture },
        uPlaneSizes: { value: [0, 0] },
        uImageSizes: { value: [0, 0] },
        uSpeed: { value: 0 },
        uTime: { value: 100 * Math.random() },
        uBorderRadius: { value: this.borderRadius }
      },
      transparent: true
    });
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = this.image;
    img.onload = () => {
      texture.image = img;
      this.program.uniforms.uImageSizes.value = [img.naturalWidth, img.naturalHeight];
    };
  }
  createMesh() {
    this.plane = new Mesh(this.gl, {
      geometry: this.geometry,
      program: this.program
    });
    this.plane.setParent(this.scene);
  }
  update(scroll: ScrollState, direction: string) {
    this.plane.position.x = this.x - scroll.current - this.extra;

    const x = this.plane.position.x;
    const H = this.viewport.width / 2;

    if (this.bend === 0) {
      this.plane.position.y = 0;
      this.plane.rotation.z = 0;
    } else {
      const B_abs = Math.abs(this.bend);
      const R = (H * H + B_abs * B_abs) / (2 * B_abs);
      const effectiveX = Math.min(Math.abs(x), H);

      const arc = R - Math.sqrt(R * R - effectiveX * effectiveX);
      if (this.bend > 0) {
        this.plane.position.y = -arc;
        this.plane.rotation.z = -Math.sign(x) * Math.asin(effectiveX / R);
      } else {
        this.plane.position.y = arc;
        this.plane.rotation.z = Math.sign(x) * Math.asin(effectiveX / R);
      }
    }

    this.speed = scroll.current - scroll.last;
    this.program.uniforms.uTime.value += 0.04;
    this.program.uniforms.uSpeed.value = this.speed;

    const planeOffset = this.plane.scale.x / 2;
    const viewportOffset = this.viewport.width / 2;
    this.isBefore = this.plane.position.x + planeOffset < -viewportOffset;
    this.isAfter = this.plane.position.x - planeOffset > viewportOffset;
    if (direction === 'right' && this.isBefore) {
      this.extra -= this.widthTotal;
      this.isBefore = this.isAfter = false;
    }
    if (direction === 'left' && this.isAfter) {
      this.extra += this.widthTotal;
      this.isBefore = this.isAfter = false;
    }
  }
  onResize({ screen, viewport }: { screen?: { width: number; height: number }; viewport?: { width: number; height: number } } = {}) {
    if (screen) this.screen = screen;
    if (viewport) {
      this.viewport = viewport;
      if (this.plane.program.uniforms.uViewportSizes) {
        this.plane.program.uniforms.uViewportSizes.value = [this.viewport.width, this.viewport.height];
      }
    }
    this.scale = this.screen.height / 1500;
    this.plane.scale.y = (this.viewport.height * (1200 * this.scale)) / this.screen.height;
    this.plane.scale.x = (this.viewport.width * (700 * this.scale)) / this.screen.width;
    this.plane.program.uniforms.uPlaneSizes.value = [this.plane.scale.x, this.plane.scale.y];
    this.padding = 2;
    this.width = this.plane.scale.x + this.padding;
    this.widthTotal = this.width * this.length;
    this.x = this.width * this.index;
  }
}

class App {
  private container: HTMLElement;
  private scrollSpeed: number;
  private scroll: ScrollState;
  private onCheckDebounce: () => void;
  private renderer!: Renderer;
  private gl!: OGLRenderingContext;
  private camera!: Camera;
  private scene!: Transform;
  private planeGeometry!: Plane;
  private mediasImages!: MediaData[];
  private medias!: Media[];
  private screen!: { width: number; height: number };
  private viewport!: { width: number; height: number };
  private isDown = false;
  private start = 0;
  private raf = 0;

  private boundOnResize!: () => void;
  // eslint-disable-next-line no-unused-vars
  private boundOnWheel!: (ev: WheelEvent) => void;
  // eslint-disable-next-line no-unused-vars
  private boundOnTouchDown!: (ev: MouseEvent | TouchEvent) => void;
  // eslint-disable-next-line no-unused-vars
  private boundOnTouchMove!: (ev: MouseEvent | TouchEvent) => void;
  private boundOnTouchUp!: () => void;
  // eslint-disable-next-line no-unused-vars
  private boundOnKeyDown!: (ev: KeyboardEvent) => void;

  private onIndexChange?: (index: number) => void;
  private activeIndex: number = -1;
  private isControlled: boolean;
  private onUpdatePositions?: (positions: any[]) => void;

  constructor(
    container: HTMLElement,
    {
      items,
      bend,
      textColor = '#ffffff',
      borderRadius = 0,
      font = 'bold 30px Figtree',
      scrollSpeed = 2,
      scrollEase = 0.05,
      isControlled = false,
      onUpdatePositions,
      onIndexChange
    }: {
      items?: MediaData[];
      bend?: number;
      textColor?: string;
      borderRadius?: number;
      font?: string;
      scrollSpeed?: number;
      scrollEase?: number;
      isControlled?: boolean;
      onUpdatePositions?: (positions: any[]) => void;
      onIndexChange?: (index: number) => void;
    } = {}
  ) {
    this.container = container;
    this.scrollSpeed = scrollSpeed;
    this.isControlled = isControlled;
    this.onUpdatePositions = onUpdatePositions;
    this.onIndexChange = onIndexChange;
    this.scroll = { ease: scrollEase, current: 0, target: 0, last: 0, position: 0 };
    this.onCheckDebounce = debounce(this.onCheck, 200);
    this.createRenderer();
    this.createCamera();
    this.createScene();
    this.onResize();
    this.createGeometry();
    this.createMedias(items, bend, textColor, borderRadius, font);
    this.update();
    this.addEventListeners();
  }
  createRenderer() {
    this.renderer = new Renderer({
      alpha: true,
      antialias: true,
      dpr: Math.min(window.devicePixelRatio || 1, 2)
    });
    this.gl = this.renderer.gl;
    this.gl.clearColor(0, 0, 0, 0);
    this.container.appendChild(this.gl.canvas as HTMLCanvasElement);
  }
  createCamera() {
    this.camera = new Camera(this.gl);
    this.camera.fov = 45;
    this.camera.position.z = 20;
  }
  createScene() {
    this.scene = new Transform();
  }
  createGeometry() {
    this.planeGeometry = new Plane(this.gl, {
      heightSegments: 50,
      widthSegments: 100
    });
  }
  createMedias(items?: MediaData[], bend = 1, textColor?: string, borderRadius?: number, font?: string) {
    const defaultItems: MediaData[] = [
      { image: `https://picsum.photos/seed/1/800/600?grayscale`, text: 'Bridge' },
      { image: `https://picsum.photos/seed/2/800/600?grayscale`, text: 'Desk Setup' },
      { image: `https://picsum.photos/seed/3/800/600?grayscale`, text: 'Waterfall' },
      { image: `https://picsum.photos/seed/4/800/600?grayscale`, text: 'Strawberries' },
      { image: `https://picsum.photos/seed/5/800/600?grayscale`, text: 'Deep Diving' },
      { image: `https://picsum.photos/seed/16/800/600?grayscale`, text: 'Train Track' },
      { image: `https://picsum.photos/seed/17/800/600?grayscale`, text: 'Santorini' },
      { image: `https://picsum.photos/seed/8/800/600?grayscale`, text: 'Blurry Lights' },
      { image: `https://picsum.photos/seed/9/800/600?grayscale`, text: 'New York' },
      { image: `https://picsum.photos/seed/10/800/600?grayscale`, text: 'Good Boy' },
      { image: `https://picsum.photos/seed/21/800/600?grayscale`, text: 'Coastline' },
      { image: `https://picsum.photos/seed/12/800/600?grayscale`, text: 'Palm Trees' }
    ];
    const galleryItems = items && items.length ? items : defaultItems;
    this.mediasImages = galleryItems.concat(galleryItems);
    this.medias = this.mediasImages.map((data, index) => {
      return new Media({
        geometry: this.planeGeometry,
        gl: this.gl,
        image: data.image,
        index,
        length: this.mediasImages.length,
        renderer: this.renderer,
        scene: this.scene,
        screen: this.screen,
        text: data.text,
        viewport: this.viewport,
        bend: bend || 1,
        textColor: textColor || '#ffffff',
        borderRadius: borderRadius || 0,
        font: font || 'bold 30px Figtree'
      });
    });
  }
  onTouchDown(e: MouseEvent | TouchEvent) {
    this.isDown = true;
    this.scroll.position = this.scroll.current;
    this.start = 'touches' in e ? e.touches[0].clientX : e.clientX;
  }
  onTouchMove(e: MouseEvent | TouchEvent) {
    if (!this.isDown) return;
    const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const distance = (this.start - x) * (this.scrollSpeed * 0.025);
    this.scroll.target = this.scroll.position + distance;
  }
  onTouchUp() {
    this.isDown = false;
    this.onCheck();
  }
  onWheel(e: WheelEvent) {
    const delta = e.deltaY || (e as WheelEvent & { wheelDelta?: number }).wheelDelta || (e as WheelEvent & { detail?: number }).detail || 0;
    this.scroll.target += (delta > 0 ? this.scrollSpeed : -this.scrollSpeed) * 0.2;
    this.onCheckDebounce();
  }
  onKeyDown(e: KeyboardEvent) {
    switch (e.key) {
      case 'ArrowRight':
        e.preventDefault();
        this.scroll.target += this.scrollSpeed * 5;
        this.onCheckDebounce();
        break;

      case 'ArrowLeft':
        e.preventDefault();
        this.scroll.target -= this.scrollSpeed * 5;
        this.onCheckDebounce();
        break;

      case 'Home':
        e.preventDefault();
        this.scroll.target = 0;
        this.onCheckDebounce();
        break;

      default:
        break;
    }
  }

  onCheck() {
    if (!this.medias || !this.medias[0]) return;
    const width = this.medias[0].width;
    const itemIndex = Math.round(Math.abs(this.scroll.target) / width);
    const item = width * itemIndex;
    
    if (!this.isControlled) {
      this.scroll.target = this.scroll.target < 0 ? -item : item;
    }

    if (this.onIndexChange) {
      const originalLength = this.mediasImages.length / 2;
      const normalizedIndex = itemIndex % originalLength;
      if (normalizedIndex !== this.activeIndex) {
        this.activeIndex = normalizedIndex;
        this.onIndexChange(normalizedIndex);
      }
    }
  }

  setScrollProgress(progress: number) {
    if (!this.medias || !this.medias[0]) return;
    const totalWidth = this.medias[0].width * (this.mediasImages.length / 2);
    this.scroll.target = progress * totalWidth;
    this.onCheck();
  }
  onResize() {
    this.screen = {
      width: this.container.clientWidth,
      height: this.container.clientHeight
    };
    this.renderer.setSize(this.screen.width, this.screen.height);
    this.camera.perspective({
      aspect: this.screen.width / this.screen.height
    });
    const fov = (this.camera.fov * Math.PI) / 180;
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
    const width = height * this.camera.aspect;
    this.viewport = { width, height };
    if (this.medias) {
      this.medias.forEach(media => media.onResize({ screen: this.screen, viewport: this.viewport }));
    }
  }
  update() {
    this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);
    const direction = this.scroll.current > this.scroll.last ? 'right' : 'left';
    
    const positions: any[] = [];
    
    if (this.medias) {
      this.medias.forEach((media, i) => {
        media.update(this.scroll, direction);
        positions.push({
          x: media.plane.position.x,
          y: media.plane.position.y,
          rotationZ: media.plane.rotation.z,
          width: media.plane.scale.x,
          height: media.plane.scale.y,
          isBefore: media.isBefore,
          isAfter: media.isAfter,
          index: i
        });
      });
    }
    
    if (this.onUpdatePositions && this.viewport && this.screen) {
      const screenPositions = positions.map(p => ({
        ...p,
        screenX: (p.x / (this.viewport.width / 2)) * (this.screen.width / 2) + this.screen.width / 2,
        screenY: -(p.y / (this.viewport.height / 2)) * (this.screen.height / 2) + this.screen.height / 2,
        widthPx: (p.width / this.viewport.width) * this.screen.width,
        heightPx: (p.height / this.viewport.height) * this.screen.height,
        visible: !p.isBefore && !p.isAfter
      }));
      this.onUpdatePositions(screenPositions);
    }
    
    this.renderer.render({ scene: this.scene, camera: this.camera });
    this.scroll.last = this.scroll.current;
    this.raf = window.requestAnimationFrame(this.update.bind(this));
  }
  addEventListeners() {
    this.boundOnResize = this.onResize.bind(this);
    this.boundOnWheel = this.onWheel.bind(this);
    this.boundOnTouchDown = this.onTouchDown.bind(this);
    this.boundOnTouchMove = this.onTouchMove.bind(this);
    this.boundOnTouchUp = this.onTouchUp.bind(this);
    this.boundOnKeyDown = this.onKeyDown.bind(this);

    window.addEventListener('resize', this.boundOnResize);
    
    if (!this.isControlled) {
      window.addEventListener('mousewheel' as keyof WindowEventMap, this.boundOnWheel as EventListener);
      window.addEventListener('wheel', this.boundOnWheel);
      window.addEventListener('mousedown', this.boundOnTouchDown);
      window.addEventListener('mousemove', this.boundOnTouchMove);
      window.addEventListener('mouseup', this.boundOnTouchUp);
      window.addEventListener('touchstart', this.boundOnTouchDown);
      window.addEventListener('touchmove', this.boundOnTouchMove);
      window.addEventListener('touchend', this.boundOnTouchUp);
      this.container?.addEventListener('keydown', this.boundOnKeyDown);
    }
  }
  destroy() {
    window.cancelAnimationFrame(this.raf);
    window.removeEventListener('resize', this.boundOnResize);
    if (!this.isControlled) {
      window.removeEventListener('mousewheel' as keyof WindowEventMap, this.boundOnWheel as EventListener);
      window.removeEventListener('wheel', this.boundOnWheel);
      window.removeEventListener('mousedown', this.boundOnTouchDown);
      window.removeEventListener('mousemove', this.boundOnTouchMove);
      window.removeEventListener('mouseup', this.boundOnTouchUp);
      window.removeEventListener('touchstart', this.boundOnTouchDown);
      window.removeEventListener('touchmove', this.boundOnTouchMove);
      window.removeEventListener('touchend', this.boundOnTouchUp);
      if (this.container) {
        this.container.removeEventListener('keydown', this.boundOnKeyDown);
      }
    }
    if (this.renderer && this.renderer.gl && (this.renderer.gl.canvas as HTMLCanvasElement).parentNode) {
      (this.renderer.gl.canvas as HTMLCanvasElement).parentNode!.removeChild(this.renderer.gl.canvas as HTMLCanvasElement);
    }
  }
}

export default function CircularGallery({
  items,
  bend = 3,
  textColor = '#ffffff',
  borderRadius = 0.05,
  font = 'bold 30px Figtree',
  fontUrl,
  scrollSpeed = 2,
  scrollEase = 0.05,
  scrollProgress,
  onIndexChange
}: {
  items?: MediaData[];
  bend?: number;
  textColor?: string;
  borderRadius?: number;
  font?: string;
  fontUrl?: string;
  scrollSpeed?: number;
  scrollEase?: number;
  scrollProgress?: number;
  onIndexChange?: (index: number) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<App | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // WebGL appends a duplicate of the items array to allow infinite scrolling
  const defaultItems: MediaData[] = [];
  const galleryItems = items && items.length ? items : defaultItems;
  const mediasImages = galleryItems.concat(galleryItems);

  const handleUpdatePositions = (positions: any[]) => {
    positions.forEach((pos, i) => {
      const el = cardsRef.current[i];
      if (el) {
        if (pos.visible) {
          el.style.display = 'flex';
          el.style.transform = `translate(-50%, -50%) translate3d(${pos.screenX}px, ${pos.screenY}px, 0) rotateZ(${-pos.rotationZ}rad)`;
          el.style.width = `${pos.widthPx}px`;
          el.style.height = `${pos.heightPx}px`;
          el.style.zIndex = Math.round(100 - Math.abs(pos.rotationZ) * 100).toString();
        } else {
          el.style.display = 'none';
        }
      }
    });
  };

  const handleIndexChange = (index: number) => {
    setActiveIndex(index);
    if (onIndexChange) onIndexChange(index);
  };

  useEffect(() => {
    if (!containerRef.current) return;
    let isMounted = true;
    
    // Create the App directly, skipping the font loader since text is in HTML now
    const app = new App(containerRef.current, {
      items,
      bend,
      textColor,
      borderRadius,
      scrollSpeed,
      scrollEase,
      isControlled: scrollProgress !== undefined,
      onUpdatePositions: handleUpdatePositions,
      onIndexChange: handleIndexChange
    });
    appRef.current = app;

    return () => {
      isMounted = false;
      if (appRef.current) {
        appRef.current.destroy();
        appRef.current = null;
      }
    };
  }, [items, bend, textColor, borderRadius, scrollSpeed, scrollEase]);

  useEffect(() => {
    if (appRef.current && scrollProgress !== undefined) {
      appRef.current.setScrollProgress(scrollProgress);
    }
  }, [scrollProgress]);

  return (
    <div className="circular-gallery" style={{ position: 'relative' }}>
      <div
        ref={containerRef}
        className="circular-gallery-canvas-container"
        style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
        tabIndex={0}
        role="region"
        aria-label="Circular image gallery. Use left and right arrow keys to navigate."
      />
      <div className="circular-gallery-html-container">
        {mediasImages.map((data, index) => {
          const isRealActive = activeIndex === (index % galleryItems.length);
          return (
            <div
              key={index}
              ref={el => { cardsRef.current[index] = el; }}
              className="circular-gallery-card"
              data-active={isRealActive}
            >
              <div className="circular-gallery-card-details">
                <h3>{data.text}</h3>
                {data.desc && <p>{data.desc}</p>}
                {data.time && (
                  <div className="circular-gallery-card-time">
                    <strong>Travel Time:</strong> {data.time}
                  </div>
                )}
                {data.route && (
                  <a href={data.route} className="circular-gallery-card-btn">
                    View Route
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
