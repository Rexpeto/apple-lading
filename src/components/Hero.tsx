"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useEffect, useState } from "react";
import Link from "next/link";

const Hero = () => {
  const [videoSrc, setVideoSrc] = useState("/videos/hero.mp4");

  useEffect(() => {
    const handleVideoSrcSet = () => {
      setVideoSrc(
        window.innerWidth > 768 ? "/videos/hero.mp4" : "/videos/smallHero.mp4",
      );
    };

    handleVideoSrcSet();

    window.addEventListener("resize", handleVideoSrcSet);

    return () => {
      window.removeEventListener("resize", handleVideoSrcSet);
    };
  }, []);

  useGSAP(() => {
    gsap.to("#hero", {
      opacity: 1,
      delay: 2.5,
    });

    gsap.to("#cta", {
      opacity: 1,
      y: -50,
      delay: 2.5,
    });
  }, []);

  return (
    <section className="nav-height w-full relative">
      <div className="h-5/6 w-full flex-center flex-col">
        <p id="hero" className="hero-title">
          Iphone 15 Pro
        </p>

        <div className="md:w-10/12 w-9/12">
          <video
            autoPlay
            muted
            playsInline
            key={videoSrc}
            className="pointer-events-none"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        </div>
      </div>

      <div
        id="cta"
        className="flex flex-col items-center opacity-0 translate-y-20"
      >
        <Link href="#highlights" className="btn">
          Buy
        </Link>
        <p className="font-normal text-xl">From $999</p>
      </div>
    </section>
  );
};

export default Hero;
