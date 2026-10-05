import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface Hero3DCanvasProps {
  interactive?: boolean;
}

export const Hero3DCanvas: React.FC<Hero3DCanvasProps> = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeShape, setActiveShape] = useState<'network' | 'torus' | 'icosahedron'>('network');
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const isRotatingRef = useRef(true);
  const activeShapeRef = useRef<'network' | 'torus' | 'icosahedron'>('network');

  useEffect(() => {
    isRotatingRef.current = isRotating;
  }, [isRotating]);

  useEffect(() => {
    activeShapeRef.current = activeShape;
  }, [activeShape]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsRotating(false);
      isRotatingRef.current = false;
    }

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 600;

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x07090e, 0.0018);

    // Camera
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 240;

    // WebGL Renderer
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    } catch {
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x07090e, 0);
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Context loss safety
    const handleContextLost = (e: Event) => {
      e.preventDefault();
    };
    renderer.domElement.addEventListener('webglcontextlost', handleContextLost, false);

    // Group for all rotating objects
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Constellation Network: Nodes and connecting lines
    const particleCount = 70;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities: { x: number; y: number; z: number }[] = [];

    const radius = 95;
    for (let i = 0; i < particleCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.cbrt(Math.random()) * radius;
      const sinPhi = Math.sin(phi);

      const x = r * sinPhi * Math.cos(theta);
      const y = r * sinPhi * Math.sin(theta);
      const z = r * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      velocities.push({
        x: (Math.random() - 0.5) * 0.25,
        y: (Math.random() - 0.5) * 0.25,
        z: (Math.random() - 0.5) * 0.25,
      });
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Particle nodes
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 3.2,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(geometry, particleMaterial);
    mainGroup.add(particleSystem);

    // Connection lines
    const maxConnections = 120;
    const linePositions = new Float32Array(maxConnections * 2 * 3);
    const lineColors = new Float32Array(maxConnections * 2 * 3);
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });
    const lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    mainGroup.add(lineMesh);

    // 2. Wireframe Central Icosahedron (Geometric Core)
    const icoGeo = new THREE.IcosahedronGeometry(45, 1);
    const icoWireMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const icosahedron = new THREE.Mesh(icoGeo, icoWireMat);
    mainGroup.add(icosahedron);

    // 3. Torus Knot (Data Loop)
    const torusGeo = new THREE.TorusKnotGeometry(40, 6, 80, 16);
    const torusMat = new THREE.MeshBasicMaterial({
      color: 0x6366f1,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });
    const torusKnot = new THREE.Mesh(torusGeo, torusMat);
    torusKnot.visible = false;
    mainGroup.add(torusKnot);

    // Subtle Ambient Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    // Mouse Tracking
    let targetRotationX = 0;
    let targetRotationY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      mouseX = (x / rect.width) * 2;
      mouseY = -(y / rect.height) * 2;
      targetRotationY = mouseX * 0.6;
      targetRotationX = -mouseY * 0.4;
    };

    window.addEventListener('mousemove', onMouseMove);

    // Resize Handler
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || 600;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', onResize);

    // Animation Loop
    let animationFrameId: number;
    let time = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      time += 0.01;

      // Update shape visibility
      const currentShape = activeShapeRef.current;
      particleSystem.visible = currentShape === 'network';
      lineMesh.visible = currentShape === 'network';
      icosahedron.visible = currentShape === 'network' || currentShape === 'icosahedron';
      torusKnot.visible = currentShape === 'torus';

      if (isRotatingRef.current) {
        mainGroup.rotation.y += 0.003;
        mainGroup.rotation.x += 0.001;
      }

      // Smooth mouse lerping
      mainGroup.rotation.y += (targetRotationY - mainGroup.rotation.y) * 0.04;
      mainGroup.rotation.x += (targetRotationX - mainGroup.rotation.x) * 0.04;

      // Pulse icosahedron
      if (icosahedron.visible) {
        icosahedron.rotation.y += 0.004;
        icosahedron.rotation.z += 0.002;
        const scale = 1 + Math.sin(time * 1.5) * 0.06;
        icosahedron.scale.set(scale, scale, scale);
      }

      // Rotate torus knot
      if (torusKnot.visible) {
        torusKnot.rotation.x += 0.006;
        torusKnot.rotation.y += 0.008;
      }

      // Particle physics & connecting lines for network
      if (particleSystem.visible) {
        const posAttr = particleSystem.geometry.attributes.position as THREE.BufferAttribute;
        const posArray = posAttr.array as Float32Array;

        for (let i = 0; i < particleCount; i++) {
          posArray[i * 3] += velocities[i].x;
          posArray[i * 3 + 1] += velocities[i].y;
          posArray[i * 3 + 2] += velocities[i].z;

          // Boundary bounce
          const distSq =
            posArray[i * 3] * posArray[i * 3] +
            posArray[i * 3 + 1] * posArray[i * 3 + 1] +
            posArray[i * 3 + 2] * posArray[i * 3 + 2];

          if (distSq > radius * radius) {
            velocities[i].x = -velocities[i].x;
            velocities[i].y = -velocities[i].y;
            velocities[i].z = -velocities[i].z;
          }
        }
        posAttr.needsUpdate = true;

        // Recalculate line connections
        let lineIdx = 0;
        const connectDistance = 45;
        const linePos = lineMesh.geometry.attributes.position as THREE.BufferAttribute;
        const lineCol = lineMesh.geometry.attributes.color as THREE.BufferAttribute;
        const lPositions = linePos.array as Float32Array;
        const lColors = lineCol.array as Float32Array;

        for (let i = 0; i < particleCount && lineIdx < maxConnections; i++) {
          for (let j = i + 1; j < particleCount && lineIdx < maxConnections; j++) {
            const dx = posArray[i * 3] - posArray[j * 3];
            const dy = posArray[i * 3 + 1] - posArray[j * 3 + 1];
            const dz = posArray[i * 3 + 2] - posArray[j * 3 + 2];
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

            if (dist < connectDistance) {
              const alpha = 1.0 - dist / connectDistance;
              const idx1 = lineIdx * 6;
              const idx2 = idx1 + 3;

              lPositions[idx1] = posArray[i * 3];
              lPositions[idx1 + 1] = posArray[i * 3 + 1];
              lPositions[idx1 + 2] = posArray[i * 3 + 2];

              lPositions[idx2] = posArray[j * 3];
              lPositions[idx2 + 1] = posArray[j * 3 + 1];
              lPositions[idx2 + 2] = posArray[j * 3 + 2];

              // Colors cyan to indigo gradient
              lColors[idx1] = 0.2;
              lColors[idx1 + 1] = 0.75 * alpha;
              lColors[idx1 + 2] = 0.95;

              lColors[idx2] = 0.35;
              lColors[idx2 + 1] = 0.5 * alpha;
              lColors[idx2 + 2] = 0.95;

              lineIdx++;
            }
          }
        }

        // Clear remaining lines
        for (let i = lineIdx * 6; i < maxConnections * 6; i++) {
          lPositions[i] = 0;
          lColors[i] = 0;
        }

        linePos.needsUpdate = true;
        lineCol.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.domElement.removeEventListener('webglcontextlost', handleContextLost);
      geometry.dispose();
      particleMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      icoGeo.dispose();
      icoWireMat.dispose();
      torusGeo.dispose();
      torusMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div ref={mountRef} className="w-full h-full" />
      
      {/* 3D Interactive Floating Controls (HUD) */}
      <div className="absolute bottom-6 right-6 pointer-events-auto flex items-center gap-2 p-1.5 bg-[#0f172a]/75 backdrop-blur-md rounded-xl border border-cyan-500/20 shadow-lg text-xs font-mono text-slate-300">
        <span className="px-2 text-cyan-400 font-semibold uppercase tracking-wider text-[10px]">3D Model:</span>
        <button
          type="button"
          onClick={() => setActiveShape('network')}
          className={`px-2.5 py-1 rounded-lg transition-colors ${
            activeShape === 'network'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
              : 'hover:text-white hover:bg-slate-800/60'
          }`}
        >
          Data Network
        </button>
        <button
          type="button"
          onClick={() => setActiveShape('icosahedron')}
          className={`px-2.5 py-1 rounded-lg transition-colors ${
            activeShape === 'icosahedron'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
              : 'hover:text-white hover:bg-slate-800/60'
          }`}
        >
          Core Geo
        </button>
        <button
          type="button"
          onClick={() => setActiveShape('torus')}
          className={`px-2.5 py-1 rounded-lg transition-colors ${
            activeShape === 'torus'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
              : 'hover:text-white hover:bg-slate-800/60'
          }`}
        >
          Algorithm Knot
        </button>
        <button
          type="button"
          title={isRotating ? 'Pause Rotation' : 'Resume Rotation'}
          onClick={() => setIsRotating(!isRotating)}
          className="ml-1 px-2 py-1 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-slate-800/60 transition-colors"
        >
          {isRotating ? '⏸' : '▶'}
        </button>
      </div>
    </div>
  );
};
