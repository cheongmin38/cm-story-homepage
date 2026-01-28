
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.PlaneGeometry(2, 2);
    
    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float uTime;
      uniform vec2 uMouse;
      uniform vec2 uResolution;
      varying vec2 vUv;

      float grid(vec2 st, float res) {
        vec2 grid = fract(st * res);
        return 1.0 - smoothstep(0.0, 0.05, min(grid.x, grid.y));
      }

      void main() {
        vec2 st = vUv;
        vec2 mouse = uMouse;
        float aspect = uResolution.x / uResolution.y;
        st.x *= aspect;
        mouse.x *= aspect;

        float dist = distance(st, mouse);
        
        // 유동체 파동 강도 및 반경 대폭 강화
        float strength = 0.4; 
        float radius = 0.8;
        float ripple = smoothstep(radius, 0.0, dist);
        
        vec2 displacement = normalize(st - mouse) * ripple * strength;
        vec2 distortedSt = st - displacement;

        // 배경 베이스 색상
        vec3 color = vec3(0.015, 0.015, 0.015);

        // 그리드 패턴 명암비
        float g1 = grid(distortedSt, 12.0);
        float g2 = grid(distortedSt, 3.0);
        
        // 발광 하이라이트 및 에너지 라인 시인성 증대
        float highlight = pow(ripple, 2.0) * 0.25;
        float edge = smoothstep(0.15, 0.0, abs(dist - radius * 0.4)) * 0.1;
        
        color += vec3(g1) * 0.05;
        color += vec3(g2) * 0.1;
        // 강렬한 프리미엄 레드 에너지 파동
        color += vec3(1.0, 0.02, 0.15) * (highlight + edge); 

        // 비네팅 처리
        float vignette = 1.0 - distance(vUv, vec2(0.5));
        color *= smoothstep(0.0, 1.1, vignette);

        gl_FragColor = vec4(color, 1.0);
      }
    `;

    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
      },
      vertexShader,
      fragmentShader,
      transparent: true
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let targetMouse = new THREE.Vector2(0.5, 0.5);
    let currentMouse = new THREE.Vector2(0.5, 0.5);

    const handleMouseMove = (event: MouseEvent) => {
      targetMouse.x = event.clientX / window.innerWidth;
      targetMouse.y = 1.0 - (event.clientY / window.innerHeight);
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = (time: number) => {
      requestAnimationFrame(animate);
      currentMouse.lerp(targetMouse, 0.08); 
      material.uniforms.uTime.value = time * 0.001;
      material.uniforms.uMouse.value.copy(currentMouse);
      renderer.render(scene, camera);
    };

    requestAnimationFrame(animate);

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      material.uniforms.uResolution.value.set(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 pointer-events-none z-0 overflow-hidden" />;
};

export default ThreeBackground;
