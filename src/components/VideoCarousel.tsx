"use client";
import { highlightsSlides } from "@/constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const VideoCarousel = () => {
  const [video, setVideo] = useState({
    isEnd: false,
    startPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
  });
  const [loadedData, setLoadedData] = useState([]);

  const { isEnd, startPlay, videoId, isLastVideo, isPlaying } = video;

  useGSAP(() => {
    gsap.to("#slider", {
      transform: `translateX(-${videoId * 100}%)`,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#slider",
        pin: true,
        scrub: 1,
        snap: 1 / (highlightsSlides.length - 1),
        end: "+=1000",
      },
    });

    gsap.to("#video", {
      scrollTrigger: {
        trigger: "#video",
        toggleActions: "restart none none none",
      },
      onComplete: () => {
        setVideo((prev: any) => ({
          ...prev,
          startPlay: true,
          isPlaying: true,
        }));
      },
    });
  }, [isEnd, videoId]);

  const videoRef = useRef([]);
  const videoSpanRef = useRef([]);
  const videoDivRef = useRef([]);

  useEffect(() => {
    if (loadedData.length > 3) {
      if (!isPlaying) {
        videoRef.current[videoId]?.pause();
      } else {
        startPlay && videoRef.current[videoId]?.play();
      }
    }
  }, [startPlay, videoId, isPlaying, loadedData]);

  const handleLoadedMetaData = (i: number, e: any) =>
    setLoadedData((prev: any[]) => [...prev, e]);

  useEffect(() => {
    let currentProgress = 0;
    let span = videoSpanRef.current;

    if (span[videoId]) {
      // animate the progress of the video
      let anim = gsap.to(span[videoId], {
        onUpdate: () => {
          const progress = Math.ceil(anim.progress() * 100);

          if (progress !== currentProgress) {
            currentProgress = progress;

            gsap.to(videoDivRef.current[videoId], {
              width:
                window.innerWidth < 768
                  ? `10vw`
                  : window.innerWidth < 1200
                    ? `10vw`
                    : `4vw`,
            });

            gsap.to(span[videoId], {
              width: `${currentProgress}%`,
              backgroundColor: "white",
            });
          }
        },
        onComplete: () => {
          if (isPlaying) {
            gsap.to(videoDivRef.current[videoId], {
              width: `12px`,
            });

            gsap.to(span[videoId], {
              backgroundColor: "#afafaf",
            });
          }
        },
      });

      if (videoId === 0) {
        anim.restart();
      }

      const animUpdate = () => {
        anim.progress(
          videoRef.current[videoId].currentTime /
            highlightsSlides[videoId].videoDuration,
        );
      };

      if (isPlaying) {
        gsap.ticker.add(animUpdate);
      } else {
        gsap.ticker.remove(animUpdate);
      }
    }
  }, [startPlay, videoId, isPlaying]);

  const handleProgress = (type: string, i: number) => {
    switch (type) {
      case "play": {
        setVideo((prev: any) => ({ ...prev, isPlaying: !prev.isPlaying }));
        break;
      }
      case "pause": {
        setVideo((prev: any) => ({ ...prev, isPlaying: !prev.isPlaying }));
        break;
      }
      case "video-end": {
        setVideo((prev: any) => ({ ...prev, isEnd: true, videoId: i + 1 }));
        break;
      }
      case "video-last": {
        setVideo((prev: any) => ({ ...prev, isLastVideo: true }));
        break;
      }
      case "video-reset": {
        setVideo((prev: any) => ({ ...prev, isLastVideo: false, videoId: 0 }));
        break;
      }
      default:
        return video;
    }
  };

  return (
    <>
      <div className="flex items-center">
        {highlightsSlides.map((list, i) => (
          <div key={list.id} id="slider" className="sm:pr-20 pr-10">
            <div className="video-carousel_container">
              <div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
                <video
                  ref={(el) => (videoRef.current[i] = el)}
                  id="video"
                  className={`${list.id === 2 && "translate-x-44"} pointer-events-none`}
                  autoPlay
                  muted
                  playsInline
                  preload="auto"
                  onEnded={() => {
                    i !== 3
                      ? handleProgress("video-end", i)
                      : handleProgress("video-last", i);
                  }}
                  onPlay={() =>
                    setVideo((prev: any) => ({ ...prev, isPlaying: true }))
                  }
                  onLoadedMetadata={(e) => handleLoadedMetaData(i, e)}
                >
                  <source src={list.video} type="video/mp4" />
                </video>
              </div>

              <div className="absolute top-12 left-[5%] z-10">
                {list.textLists.map((text) => (
                  <p key={text} className="text-xl font-medium md:text-2xl">
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
              ref={(el) => (videoDivRef.current[i] = el)}
              className="relative mx-2 w-3 h-3 rounded-full cursor-pointer bg-gray-200"
            >
              <span
                className="absolute h-full w-full rounded-full"
                ref={(el) => (videoSpanRef.current[i] = el)}
              />
            </span>
          ))}
        </div>

        <button
          className="control-btn"
          onClick={
            isLastVideo
              ? () => handleProgress("video-reset", videoId)
              : !isPlaying
                ? () => handleProgress("play", videoId)
                : () => handleProgress("pause", videoId)
          }
        >
          <Image
            src={
              isLastVideo
                ? "/images/replay.svg"
                : !isPlaying
                  ? "/images/play.svg"
                  : "/images/pause.svg"
            }
            alt={isLastVideo ? "replay" : isPlaying ? "pause" : "play"}
            width={15}
            height={15}
          />
        </button>
      </div>
    </>
  );
};

export default VideoCarousel;
