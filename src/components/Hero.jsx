import { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const Hero = () => {
    const containerRef = useRef(null);

    // GSAP for text animation
    useGSAP(() => {
        gsap.to("#heroText", { opacity: 1, delay: 0.3, y: -20 });
        gsap.to("#cta", { opacity: 1, y: -50, delay: 0.5 });
    }, []);

    // Plexus effect using Three.js with responsive design
    useEffect(() => {
        let scene, camera, renderer, points;

        const init = () => {
            const width = containerRef.current.clientWidth;
            const height = containerRef.current.clientHeight;

            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
            camera.position.z = 400;

            renderer = new THREE.WebGLRenderer();
            renderer.setSize(width, height);
            containerRef.current.appendChild(renderer.domElement);

            const geometry = new THREE.BufferGeometry();
            const vertices = [];

            for (let i = 0; i < 500; i++) {
                const x = THREE.MathUtils.randFloatSpread(800);
                const y = THREE.MathUtils.randFloatSpread(800);
                const z = THREE.MathUtils.randFloatSpread(800);
                vertices.push(x, y, z);
            }

            geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

            const material = new THREE.PointsMaterial({ color: 0xffffff, size: 0.5 });
            points = new THREE.Points(geometry, material);
            scene.add(points);

            animate();
        };

        const animate = () => {
            requestAnimationFrame(animate);
            points.rotation.x += 0.001;
            points.rotation.y += 0.001;
            renderer.render(scene, camera);
        };

        const handleResize = () => {
            const width = containerRef.current.clientWidth;
            const height = containerRef.current.clientHeight;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        };

        init();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            renderer.dispose();
            containerRef.current.removeChild(renderer.domElement);
        };
    }, []);

    return (
        <section className="w-full h-full bg-black relative">
            <div className="h-[50vh] w-full flex-center flex-col">
                {/* Plexus effect container */}
                <div
                    ref={containerRef}
                    className="absolute inset-0 z-0 w-full"
                    style={{ height: "50vh" }} // Height set to half screen
                />

                {/* Hero text */}
                <div
                    className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-10"
                    style={{ height: "50vh" }} // Centering text within the containerRef area
                >
                    <p id="heroText" className="hero-title text-7xl md:text-8xl lg:9xl opacity-0 font-bold">resume.</p>
                </div>
            </div>

            <div id="cta" className="flex flex-col items-center opacity-0 translate-y-20 relative z-10">
                <a href="#highlights" className="btn text-white font-medium">
                    Let's go
                </a>
                <p className="font-normal text-lg text-gray-200 text-center">i'm a game developer.<br></br>from code to art, sound, and beyond.</p>
            </div>
        </section>
    );
};

export default Hero;
