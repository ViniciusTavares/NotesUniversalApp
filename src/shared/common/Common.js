/** @module common/common */

export const getBaseUrl = () => {
  if(isServerRendering()) {
    return process.env.API_URL
  } else {
    // As we've been using localhost for development, base url is blank.
    return ''
  }
}

export  const isServerRendering = () => {
  return !(typeof window !== 'undefined' && window.document)
}
