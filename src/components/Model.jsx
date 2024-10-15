import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useFBX } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

const CharacterModel = ({ setLoading }) => {
  const fbx = useFBX('./models/character.fbx'); // Path to your FBX model
  const mixer = useRef();

  useEffect(() => {
    if (fbx.animations.length > 0) {
      mixer.current = new THREE.AnimationMixer(fbx);
      const action = mixer.current.clipAction(fbx.animations[0]);
      action.play();
    }
    // 모델 로딩이 완료되면 로딩 상태를 false로 변경
    setLoading(false);
  }, [fbx, setLoading]);

  useFrame((state, delta) => {
    mixer.current?.update(delta);
  });

  return (
    <primitive 
      object={fbx} 
      scale={0.05} // Scale down the model to fit inside the section
      position={[0, -4, 0]} // Adjust position if needed
      castShadow 
      receiveShadow 
    />
  );
};

const Model = () => {
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    gsap.to('#heading', { y: 0, opacity: 1 });
  }, []);

  return (
    <section className="common-padding">
      <div className="screen-max-width">
        <h1 id="heading" className="section-heading flex-center">three-dimensional.</h1>

        <div className="flex flex-col items-center mt-5">
          <div className="w-full h-[60vh] overflow-hidden relative">
            {loading && (
              <div className="absolute inset-0 flex justify-center items-center z-10">
                <span className="text-white text-lg">loading something special...</span>
              </div>
            )}

            <Canvas
              className="w-full h-full"
              style={{
                position: 'relative',  // Ensure the canvas stays inside the section
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                overflow: 'hidden',
              }}
              shadows
              camera={{ position: [0, 2, 15], fov: 45 }} // Set camera position and field of view
            >
              <ambientLight intensity={2} />
              <directionalLight 
                intensity={1} 
                position={[5, 5, 5]} 
                castShadow
              />
              <CharacterModel setLoading={setLoading} />  {/* The 3D model component */}
              <OrbitControls enableZoom={false} /> {/* Optional controls for model rotation */}
            </Canvas>

            {/* Adding the text/SVG indicating mouse orbit control */}
            <div
              className="absolute bottom-0 left-0 w-full text-center p-3 text-neutral-400 flex justify-center items-center"
              style={{ pointerEvents: 'none' }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 1.5C6.75 1.5 1.5 6.75 1.5 12C1.5 17.25 6.75 22.5 12 22.5C17.25 22.5 22.5 17.25 22.5 12C22.5 6.75 17.25 1.5 12 1.5Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 12C7.5 14.75 9.75 17.25 12 17.25C14.25 17.25 16.5 14.75 16.5 12C16.5 9.25 14.25 6.75 12 6.75C9.75 6.75 7.5 9.25 7.5 12Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5L12 12" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 12H9.75" />
              </svg>
              <span>Use your mouse to orbit around.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Model;
