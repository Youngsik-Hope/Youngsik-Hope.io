import React, { useContext, useState } from 'react'
import { ThemeContext } from '../context/ThemeContext'
import dayImg from '../images/day.png'
import nightImg from '../images/night.png'

const IMAGE_WIDTH = 1390
const IMAGE_HEIGHT = 681
const GITHUB_LEFT = 1160
const GITHUB_TOP = 520
const GITHUB_SIZE = 70
const MAX_WIDTH = 900 

const DachshundAnimation = () => {
  const { isDarkMode } = useContext(ThemeContext)
  const [hover, setHover] = useState(false)

  // 반응형: 컨테이너의 실제 width를 기준으로 오버레이 위치 계산
  const containerRef = React.useRef(null)
  const [containerWidth, setContainerWidth] = useState(MAX_WIDTH)

  React.useEffect(() => {
    function handleResize() {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // 비율 계산
  const scale = containerWidth / IMAGE_WIDTH
  const githubLeft = GITHUB_LEFT * scale
  const githubTop = GITHUB_TOP * scale
  const githubSize = GITHUB_SIZE * scale

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: MAX_WIDTH,
        aspectRatio: `${IMAGE_WIDTH} / ${IMAGE_HEIGHT}`,
        margin: '0 auto',
        background: isDarkMode ? '#181c2a' : '#f8f4ef',
        borderRadius: 24,
        overflow: 'hidden',
        boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
      }}
    >
      <img
        src={isDarkMode ? nightImg : dayImg}
        alt={isDarkMode ? '밤 장면' : '낮 장면'}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          display: 'block',
          background: isDarkMode ? '#181c2a' : '#f8f4ef',
        }}
        draggable={false}
      />
      <a
        href="https://github.com/Youngsik-Hope"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: 'absolute',
          left: githubLeft,
          top: githubTop,
          width: githubSize,
          height: githubSize,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 2,
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        aria-label="GitHub로 이동"
      >
        <span
          style={{
            position: 'absolute',
            top: -36 * scale,
            left: '50%',
            transform: 'translateX(-50%)',
            opacity: hover ? 1 : 0,
            transition: 'opacity 0.2s',
            pointerEvents: 'none',
          }}
        >
          <svg width={32 * scale} height={32 * scale} fill="currentColor" viewBox="0 0 24 24">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="#222" strokeWidth={2.5 * scale} strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          </svg>
        </span>
        <span style={{ width: '100%', height: '100%', display: 'block' }} />
      </a>
    </div>
  )
}

export default DachshundAnimation 