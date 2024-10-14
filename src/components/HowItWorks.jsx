import React, { useRef } from 'react'
import { frameImg, frameVideo } from '../utils'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap';
import { animateWithGsap } from '../utils/animations';

const HowItWorks = () => {
  const videoRef = useRef();

  useGSAP(() => {
    animateWithGsap('.g_fadeIn', {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power2.inOut'
    })
  }, []);

  return (
    <section className="common-padding">
      <div className="screen-max-width">

        <div className="flex flex-col items-center">
          <h2 className="hiw-title">
            Synchronize
            <br /> your senses, dimensions.
          </h2>

          <p className="hiw-subtitle">Unite your senses, solve the unsolvable.</p>
        </div>

        <div className="mt-10 md:mt-20 mb-14">
          <div className="relative h-full flex-center">
            <div className="overflow-hidden">
              <img
                src={frameImg}
                alt="frame"
                className="bg-transparent relative z-10"
              />
            </div>
            <div className="hiw-video">
              <video className="pointer-events-none" playsInline preload="none" muted loop={true} autoPlay ref={videoRef}>
                <source src={frameVideo} type="video/mp4" />
              </video>
            </div>
          </div>
          <p className="text-gray font-semibold text-center mt-3">Sync Sense: Escaping</p>
        </div>

        <div className="hiw-text-container">
          <div className="flex flex-1 justify-center flex-col">
            <p className="hiw-text g_fadeIn">
              A captivating two-player co-op puzzle game where sight and sound intertwine. {' '}
              <span className="text-white">
                Communicate, collaborate, and synchronize your senses
              </span>.
            </p>

            <p className="hiw-text g_fadeIn">
              Mobile {' '}
              <span className="text-white">
                games will look and feel so immersive
              </span>,
              with incredibly detailed environments and characters.
            </p>
          </div>


          <div className="flex-1 flex justify-center flex-col g_fadeIn">
            <p className="hiw-text">New</p>
            <p className="hiw-bigtext">Unity Engine 6</p>
            <p className="hiw-text">with netcode.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks