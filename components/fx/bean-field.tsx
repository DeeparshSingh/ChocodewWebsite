'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { prefersReducedMotion } from '@/lib/gsap';

/**
 * Procedurally-built coffee beans (no external 3D assets): an ellipsoid with
 * a gaussian crease carved along its flat face.
 */
function createBeanGeometry() {
  const geo = new THREE.SphereGeometry(1, 42, 30);
  const pos = geo.attributes.position as THREE.BufferAttribute;
  const v = new THREE.Vector3();

  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    let x = v.x;
    let y = v.y * 0.66;
    let z = v.z * 0.46;

    if (z > 0) {
      const taper = Math.max(0, 1 - (x / 1.02) ** 2);
      const groove = Math.exp(-((y / 0.14) ** 2)) * 0.34 * taper;
      z -= groove * z * 2.2;
      const lip = Math.exp(-(((Math.abs(y) - 0.2) / 0.1) ** 2)) * 0.045 * taper;
      z += lip;
    }
    pos.setXYZ(i, x, y, z);
  }
  geo.computeVertexNormals();
  return geo;
}

interface BeanState {
  position: THREE.Vector3;
  axis: THREE.Vector3;
  speed: number;
  angle: number;
  scale: number;
  bobPhase: number;
  bobAmp: number;
}

function easeOutExpo(t: number) {
  return t >= 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

function Beans({ count, animate }: { count: number; animate: boolean }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const progressRef = useRef(animate ? 0 : 1);
  const armedRef = useRef(!animate);

  const geometry = useMemo(createBeanGeometry, []);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const beans = useMemo<BeanState[]>(() => {
    const rng = (min: number, max: number) => min + Math.random() * (max - min);
    const list: BeanState[] = [];
    let guard = 0;
    while (list.length < count && guard++ < count * 40) {
      const x = rng(-6.2, 6.2);
      const y = rng(-3, 3);
      if (Math.abs(x) < 2.4 && Math.abs(y) < 1.5 && Math.random() < 0.75) continue;
      list.push({
        position: new THREE.Vector3(x, y, rng(-3.2, 0.8)),
        axis: new THREE.Vector3(rng(-1, 1), rng(-1, 1), rng(-1, 1)).normalize(),
        speed: rng(0.08, 0.3) * (Math.random() < 0.5 ? -1 : 1),
        angle: rng(0, Math.PI * 2),
        scale: rng(0.22, 0.62),
        bobPhase: rng(0, Math.PI * 2),
        bobAmp: rng(0.08, 0.22),
      });
    }
    return list;
  }, [count]);

  // arm the appear animation shortly after mount (no preloader on this site)
  useEffect(() => {
    if (!animate) return;
    const t = setTimeout(() => {
      armedRef.current = true;
    }, 250);
    return () => clearTimeout(t);
  }, [animate]);

  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const base = new THREE.Color('#4a3121');
    const c = new THREE.Color();
    for (let i = 0; i < beans.length; i++) {
      const m = 0.82 + Math.random() * 0.42;
      c.setRGB(base.r * m, base.g * m, base.b * m);
      mesh.setColorAt(i, c);
    }
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [beans]);

  useFrame((state, delta) => {
    const mesh = meshRef.current;
    const group = groupRef.current;
    if (!mesh || !group) return;

    if (armedRef.current && progressRef.current < 1) {
      progressRef.current = Math.min(1, progressRef.current + delta / 1.4);
    }
    const appear = easeOutExpo(progressRef.current);
    const t = state.clock.elapsedTime;

    if (animate) {
      group.position.x += (state.pointer.x * 0.5 - group.position.x) * 0.035;
      group.position.y += (state.pointer.y * 0.3 - group.position.y) * 0.035;
      group.rotation.y += (state.pointer.x * 0.06 - group.rotation.y) * 0.03;
    }

    for (let i = 0; i < beans.length; i++) {
      const b = beans[i];
      if (animate) b.angle += b.speed * delta;
      const bob = animate ? Math.sin(t * 0.55 + b.bobPhase) * b.bobAmp : 0;
      dummy.position.set(b.position.x, b.position.y + bob, b.position.z);
      dummy.quaternion.setFromAxisAngle(b.axis, b.angle);
      dummy.scale.setScalar(b.scale * appear);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <group ref={groupRef}>
      <instancedMesh
        ref={meshRef}
        args={[geometry, undefined, beans.length]}
        frustumCulled={false}
      >
        <meshStandardMaterial roughness={0.48} metalness={0.08} />
      </instancedMesh>
    </group>
  );
}

export interface BeanFieldProps {
  className?: string;
  count?: number;
}

export function BeanField({ className, count = 26 }: BeanFieldProps) {
  const reduced = prefersReducedMotion();

  return (
    <div className={className} aria-hidden="true">
      <Canvas
        dpr={[1, 1.75]}
        camera={{ fov: 32, position: [0, 0, 9] }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        frameloop={reduced ? 'demand' : 'always'}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.55} color="#f4e3cd" />
        <directionalLight position={[4, 6, 5]} intensity={1.5} color="#ffd9a8" />
        <pointLight position={[-6, -3, -4]} intensity={9} color="#c88a4e" />
        <Beans count={count} animate={!reduced} />
      </Canvas>
    </div>
  );
}

export default BeanField;
