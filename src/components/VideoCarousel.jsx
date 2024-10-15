import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);
import { useEffect, useRef, useState } from "react";

import { hightlightsSlides } from "../constants";
import { pauseImg, playImg, replayImg } from "../utils";

const VideoCarousel = () => {
  const videoRef = useRef([]);
  const videoSpanRef = useRef([]);
  const videoDivRef = useRef([]);

  const [video, setVideo] = useState({
    isEnd: false,
    startPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
  });

  const [loadedData, setLoadedData] = useState([]);
  const { isEnd, isLastVideo, startPlay, videoId, isPlaying } = video;

  const resizeHandler = () => {
    // 화면 크기에 맞춰 비디오 요소들의 크기와 배치 변경
    const screenWidth = window.innerWidth;
    const videoContainer = document.querySelectorAll('.video-carousel_container');

    videoContainer.forEach((container) => {
      if (screenWidth < 640) {
        container.style.height = '50vw'; // 모바일 디바이스 - 비율에 맞춘 비디오 높이
      } else if (screenWidth < 1024) {
        container.style.height = '40vw'; // 태블릿 디바이스
      } else {
        container.style.height = 'auto'; // 데스크탑에서는 높이 대신 종횡비를 유지
      }
    });
  };

  useGSAP(() => {
    gsap.to("#slider", {
      transform: `translateX(${-100 * videoId}%)`,
      duration: 2,
      ease: "power2.inOut",
    });

    gsap.to("#video", {
      scrollTrigger: {
        trigger: "#video",
        toggleActions: "restart none none none",
      },
      onComplete: () => {
        setVideo((pre) => ({
          ...pre,
          startPlay: true,
          isPlaying: true,
        }));
      },
    });
  }, [videoId]);

  useEffect(() => {
    resizeHandler(); // 처음 로드 시 크기 설정
    window.addEventListener('resize', resizeHandler); // 윈도우 리사이즈 시 크기 변경 처리
    return () => window.removeEventListener('resize', resizeHandler); // cleanup
  }, []);

  useEffect(() => {
    let currentProgress = 0;
    const span = videoSpanRef.current[videoId];

    if (span) {
      let anim = gsap.to(span, {
        onUpdate: () => {
          const progress = Math.ceil(
            (videoRef.current[videoId].currentTime /
              hightlightsSlides[videoId].videoDuration) *
              100
          );

          if (progress !== currentProgress) {
            currentProgress = progress;
            gsap.to(videoDivRef.current[videoId], {
              width:
                window.innerWidth < 760
                  ? "10vw"
                  : window.innerWidth < 1200
                  ? "10vw"
                  : "4vw",
            });

            gsap.to(span, {
              width: `${currentProgress}%`,
              backgroundColor: "white",
            });
          }
        },
        onComplete: () => {
          if (isPlaying) {
            gsap.to(videoDivRef.current[videoId], {
              width: "12px",
            });
            gsap.to(span, {
              backgroundColor: "#afafaf",
            });
          }
        },
      });

      anim.restart();

      const animUpdate = () => {
        anim.progress(
          videoRef.current[videoId].currentTime / hightlightsSlides[videoId].videoDuration
        );
      };

      if (isPlaying) {
        gsap.ticker.add(animUpdate);
      } else {
        gsap.ticker.remove(animUpdate);
      }

      return () => {
        gsap.ticker.remove(animUpdate);
      };
    }
  }, [videoId, isPlaying]);

  useEffect(() => {
    if (loadedData.length > 3) {
      if (!isPlaying) {
        videoRef.current[videoId].pause();
      } else {
        startPlay && videoRef.current[videoId].play();
      }
    }
  }, [startPlay, videoId, isPlaying, loadedData]);

  const handleProcess = (type, i) => {
    switch (type) {
      case "video-end":
        setVideo((pre) => ({ ...pre, isEnd: true, videoId: i + 1 }));
        break;

      case "video-last":
        setVideo((pre) => ({ ...pre, isLastVideo: true }));
        break;

      case "video-reset":
        setVideo((pre) => ({ ...pre, videoId: 0, isLastVideo: false }));
        break;

      case "pause":
        setVideo((pre) => ({ ...pre, isPlaying: false }));
        break;

      case "play":
        setVideo((pre) => ({ ...pre, isPlaying: true }));
        break;

      default:
        return video;
    }
  };

  const handleLoadedMetaData = (i, e) => setLoadedData((pre) => [...pre, e]);

  return (
    <>
      <div className="flex items-center">
        {hightlightsSlides.map((list, i) => (
          <div key={list.id} id="slider" className="sm:pr-20 pr-10">
            <div
              className="video-carousel_container w-full flex-center rounded-3xl overflow-hidden bg-black"
              style={{
                aspectRatio: "16/9",
                maxWidth: "1024px", // 비디오의 최대 가로 크기 설정
                maxHeight: "576px", // 비디오의 최대 세로 크기 설정
                margin: "0 auto", // 중앙 정렬
              }}
            >
              <video
                id="video"
                playsInline={true}
                className="pointer-events-none w-full h-full object-cover"
                preload="auto"
                muted
                ref={(el) => (videoRef.current[i] = el)}
                onEnded={() =>
                  i !== 3
                    ? handleProcess("video-end", i)
                    : handleProcess("video-last")
                }
                onPlay={() => setVideo((pre) => ({ ...pre, isPlaying: true }))}
                onLoadedMetadata={(e) => handleLoadedMetaData(i, e)}
              >
                <source src={list.video} type="video/mp4" />
              </video>

              <div className="absolute top-8 left-[5%] z-10">
                {list.textLists.map((text, i) => (
                  <p key={i} className="md:text-2xl text-xl font-bold">
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="relative flex-center mt-10">
        <div className="flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full">
          {videoRef.current.map((_, i) => (
            <span
              key={i}
              className="mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer"
              ref={(el) => (videoDivRef.current[i] = el)}
            >
              <span
                className="absolute h-full w-full rounded-full"
                ref={(el) => (videoSpanRef.current[i] = el)}
              />
            </span>
          ))}
        </div>

        <button className="control-btn">
          <img
            src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
            alt={isLastVideo ? "replay" : !isPlaying ? "play" : "pause"}
            onClick={
              isLastVideo
                ? () => handleProcess("video-reset")
                : !isPlaying
                ? () => handleProcess("play")
                : () => handleProcess("pause")
            }
          />
        </button>
      </div>
    </>
  );
};

export default VideoCarousel;
