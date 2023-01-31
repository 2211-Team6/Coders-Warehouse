// import React, { useRef, useEffect, useState } from "react";
// import { Canvas, useFrame } from "@react-three-fiber";
// import * as THREE from "three";
// import { a, useSpring } from 'react-spring/three';

// const Particles = () => {
//   const meshRef = useRef();

//   useFrame((state) => {
//     meshRef.current.rotation.x = meshRef.current.rotation.y += 0.01;
//   });

//   return (
//     <a.mesh ref={meshRef}>
//       <boxGeometry />
//       <a.meshLambertMaterial color={"hotpink"} />
//     </a.mesh>
//   );
// };

// const InteractiveParticles = () => {
//   const raycasterRef = useRef();
//   const [intersects, setIntersects] = useState([]);
//   const [pointer, setPointer] = useSpring(() => ({
//     position: [0, 0, 0],
//   }));

//   useFrame((state) => {
//     raycasterRef.current.setFromCamera(state.mouse, state.camera);
//     const intersects = raycasterRef.current.intersectObjects(state.scene.children);
//     setIntersects(intersects);
//   });

//   useEffect(() => {
//     if (intersects.length) {
//       setPointer({ position: intersects[0].point });
//     }
//   }, [intersects]);

//   return (
//     <>
//       <pointLight position={pointer.position} />
//       <a.mesh position={pointer.position}>
//         <sphereGeometry />
//         <a.meshLambertMaterial color={"hotpink"} />
//       </a.mesh>
//       <raycaster ref={raycasterRef} />
//     </>
//   );
// };

// const test = () => {
//   return (
//     <Canvas>
//       <ambientLight />
//       <Particles />
//       <InteractiveParticles />
//     </Canvas>
//   );
// };

// export default test;
