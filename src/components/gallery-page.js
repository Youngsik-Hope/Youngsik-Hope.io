import React from "react"
import Fade from "react-reveal/Fade"

import HeroImage from "../images/3D-liquid-abstract-2.webp"
import BackGroud from "../images/holographic-background.webp"

const Gallery = () => {
  const handleImageClick = (e) => {
    e.preventDefault();
    // 이미지 클릭 시 수행할 동작
  };

  return (
    <div className="max-w-7xl mx-auto mt-10">
      <Fade duration={2200}>
        <div className="flex flex-row justify-space xxs:flex-col-reverse xs:flex-col-reverse sm:flex-row xxs:flex-col xs:flex-col sm:flex-row mb-5">
          <div className="max-h-80 w-1/2 flex flex-col justify-center bg-gradient-to-r from-pink to-purple p-8 rounded-xl m-4 xxs:w-full xs:w-full sm:w-full lg:w-full">
            <h1 className="text-black opacity-70 text-4xl font-semibold">
              GALLERY
            </h1>
            <h1 className="text-white text-6xl font-bold xxs:text-2xl xs:text-3xl sm:text-5xl lg:text-6xl">
              Holo Starter Theme
            </h1>
            <p className="text-lg mt-4 text-white opacity-70 xxs:text-sm sm:text-lg">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>
          </div>
          <div className="rounded-xl w-auto h-full object-cover flex justify-center">
            <img src={HeroImage} alt="HeroImage"></img>
          </div>
        </div>
      </Fade>

      <div className="max-w-7xl mx-auto px-8 mt-5">
        <Fade bottom cascade>
          <div className="gallery-grid">
            <button
              onClick={handleImageClick}
              className="gallery-item-button"
              aria-label="View gallery item 1"
            >
              <img
                src={BackGroud}
                loading="lazy"
                alt="HeroImage"
              />
            </button>
            <button
              onClick={handleImageClick}
              className="gallery-item-button"
              aria-label="View gallery item 2"
            >
              <img
                src={BackGroud}
                loading="lazy"
                alt="HeroImage"
              />
            </button>
            <button
              onClick={handleImageClick}
              className="gallery-item-button"
              aria-label="View gallery item 3"
            >
              <img
                src={BackGroud}
                loading="lazy"
                alt="HeroImage"
              />
            </button>
            <button
              onClick={handleImageClick}
              className="gallery-item-button"
              aria-label="View gallery item 4"
            >
              <img
                src={BackGroud}
                loading="lazy"
                alt="HeroImage"
              />
            </button>
            <button
              onClick={handleImageClick}
              className="gallery-item-button"
              aria-label="View gallery item 5"
            >
              <img
                src={BackGroud}
                loading="lazy"
                alt="HeroImage"
              />
            </button>
            <button
              onClick={handleImageClick}
              className="gallery-item-button"
              aria-label="View gallery item 6"
            >
              <img
                src={BackGroud}
                loading="lazy"
                alt="HeroImage"
              />
            </button>
          </div>
        </Fade>
      </div>
    </div>
  )
}

// 스타일 추가
const styles = `
  .gallery-item-button {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    width: 100%;
    height: 100%;
    transition: transform 0.3s ease;
  }

  .gallery-item-button:hover {
    transform: scale(1.05);
  }

  .gallery-item-button img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

// 스타일 태그 추가
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default Gallery

/* 
    <div className="columns-1 gap-5 sm:columns-2 sm:gap-8 md:columns-3 lg:columns-4 [&>img:not(:first-child)]:mt-8">
        <img src="https://source.unsplash.com/bYuI23mnmDQ"/>
        <img src="https://source.unsplash.com/Nllx4R-2c3o"/>
        <img src="https://source.unsplash.com/lp40q07DIe0"/>
        <img src="https://source.unsplash.com/wfalq01jJuU"/>
        <img src="https://source.unsplash.com/rMHNK_skwwU"/>
        <img src="https://source.unsplash.com/WBMjuGpbrCQ"/>
        <img src="https://source.unsplash.com/nCUZ5BYBL_o"/>
        <img src="https://source.unsplash.com/3u4fzMQZhjc"/>
        <img src="https://source.unsplash.com/haOIqIPSwps"/>
        <img src="https://source.unsplash.com/3UrYD7NNVxk"/>
        <img src="https://source.unsplash.com/fm1JKDItlVM"/>
        <img src="https://source.unsplash.com/qPpq1EVs8vw"/>
        <img src="https://source.unsplash.com/xRyL63AwZFE"/>
        <img src="https://source.unsplash.com/XeNKWTiCPNw"/>
        <img src="https://source.unsplash.com/DFt3T5r_4FE"/>
        <img src="https://source.unsplash.com/Ebwp2-6BG8E"/>
            </div>
             <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 xl:gap-8">
*/
