/**
 * 날짜를 포맷팅하는 함수
 * @param {string} dateString - ISO 형식의 날짜 문자열
 * @returns {string} 포맷팅된 날짜 문자열
 */
export const formatDate = (dateString) => {
  const date = new Date(dateString)
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    timeZone: 'Asia/Seoul'
  }
  return date.toLocaleDateString('ko-KR', options)
}

/**
 * 문자열을 slug 형식으로 변환하는 함수
 * @param {string} str - 변환할 문자열
 * @returns {string} slug 형식의 문자열
 */
export const slugify = (str) => {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * HTML 문자열에서 첫 번째 이미지 URL을 추출하는 함수
 * @param {string} html - HTML 문자열
 * @returns {string|null} 이미지 URL 또는 null
 */
export const getFirstImageFromHtml = (html) => {
  const match = html.match(/<img[^>]+src="([^">]+)"/)
  return match ? match[1] : null
}

/**
 * 문자열을 지정된 길이로 자르고 말줄임표를 추가하는 함수
 * @param {string} str - 원본 문자열
 * @param {number} length - 최대 길이
 * @returns {string} 잘린 문자열
 */
export const truncate = (str, length = 100) => {
  if (str.length <= length) return str
  return str.slice(0, length) + '...'
} 