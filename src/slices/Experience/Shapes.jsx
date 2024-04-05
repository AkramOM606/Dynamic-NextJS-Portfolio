"use client";

import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Float, Environment } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Shapes() {
  return (
    <div className="absolute top-0 left-0 w-full items-center mx-auto row-start-1 -mt-9 md:col-span-1 md:col-start-1 md:mt-0 h-[200px] md:h-full">
      <Canvas
        className="z-0"
        shadows
        gl={{ antialias: false }}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 25], fov: 30, near: 1, far: 40 }}
      >
        <Suspense fallback={null}>
          <Geometries />
          <ContactShadows
            position={[0, -5, 0]}
            opacity={0.65}
            scale={60}
            blur={1}
            far={9}
          />
          <Environment preset="forest" />
        </Suspense>
      </Canvas>
    </div>
  );
}

function Geometries() {
  const geometries = [
    {
      position: [0, 0, 0],
      r: 0.7,
      geometry: new THREE.IcosahedronGeometry(5),
    },
    {
      position: [0, 0, 0],
      r: 0.7,
      geometry: new THREE.CapsuleGeometry(3, 3, 16, 16),
    },
    {
      position: [0, 0, 0],
      r: 0.7,
      geometry: new THREE.DodecahedronGeometry(5),
    },
    {
      position: [0, 0, 0],
      r: 0.7,
      geometry: new THREE.TorusGeometry(4, 0.75, 16, 32),
    },
    {
      position: [0, 0, 0],
      r: 0.7,
      geometry: new THREE.OctahedronGeometry(5),
    },
    {
      position: [0, 0, 0],
      r: 0.7,
      geometry: new THREE.ConeGeometry(3, 7.5, 10),
    },
    {
      position: [0, 0, 0],
      r: 0.7,
      geometry: new THREE.TetrahedronGeometry(5, 0),
    },
  ];

  const materials = [
    new THREE.MeshNormalMaterial(),
    new THREE.MeshStandardMaterial({ color: 0x2ecc71, roughness: 0 }),
    new THREE.MeshStandardMaterial({ color: 0xf1c40f, roughness: 0.4 }),
    new THREE.MeshStandardMaterial({ color: 0xe74c3c, roughness: 0.1 }),
    new THREE.MeshStandardMaterial({ color: 0x8e44ad, roughness: 0.1 }),
    new THREE.MeshStandardMaterial({ color: 0x1abc9c, roughness: 0.1 }),
    new THREE.MeshStandardMaterial({
      roughness: 0,
      metalness: 0.5,
      color: 0x2980b9,
    }),
    new THREE.MeshStandardMaterial({
      color: 0x2c3e50,
      roughness: 0.1,
      metalness: 0.5,
    }),
  ];

  function getRandomGeometry() {
    const randomIndex = Math.floor(Math.random() * geometries.length);
    return geometries[randomIndex];
  }

  return (
    <Geometry
      key={JSON.stringify(getRandomGeometry().position)}
      position={getRandomGeometry().position.map((p) => p * 2)}
      geometry={getRandomGeometry().geometry}
      materials={materials}
      r={getRandomGeometry().r}
    />
  );
}

function Geometry({ r, position, geometry, materials }) {
  const meshRef = useRef();
  const [visible, setVisible] = useState(false);

  const startingMaterial = getRandomMaterial();

  function getRandomMaterial() {
    return gsap.utils.random(materials);
  }

  function handleClick(e) {
    const mesh = e.object;

    gsap.to(mesh.rotation, {
      x: `+=${gsap.utils.random(0, 2)}`,
      y: `+=${gsap.utils.random(0, 2)}`,
      z: `+=${gsap.utils.random(0, 2)}`,
      duration: 1.3,
      ease: "elastic.out(1,0.3)",
      yoyo: true,
    });

    mesh.material = getRandomMaterial();
  }

  const handlePointerOver = () => {
    document.body.style.cursor = "pointer";
  };

  const handlePointerOut = () => {
    document.body.style.cursor = "default";
  };

  useEffect(() => {
    let ctx = gsap.context(() => {
      setVisible(true);
      gsap.from(meshRef.current.scale, {
        x: 0,
        y: 0,
        z: 0,
        duration: gsap.utils.random(0.8, 1.2),
        ease: "elastic.out(1,0.3)",
        delay: gsap.utils.random(0, 0.5),
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <group position={position} ref={meshRef}>
      <Float speed={5 * r} rotationIntensity={6 * r} floatIntensity={5 * r}>
        <mesh
          geometry={geometry}
          onClick={handleClick}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
          visible={visible}
          material={startingMaterial}
        />
      </Float>
    </group>
  );
}
