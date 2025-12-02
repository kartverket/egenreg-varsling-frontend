import { useRef } from 'react';

const HtmlPreview = ({ html, title }: { html: string; title: string }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  if (!html) {
    return null
  }

  const handleLoad = () => {
    const iframe = iframeRef.current
    const doc = iframe?.contentDocument

    if (!iframe || !doc) {
      return
    }

    const height = doc.documentElement?.scrollHeight ?? doc.body?.scrollHeight ?? 0
    iframe.style.height = `${Math.max(height, 200)}px`
  }

  return (
    <iframe
      ref={iframeRef}
      srcDoc={html}
      title={title}
      sandbox="allow-same-origin"
      onLoad={handleLoad}
      style={{ width: "100%", border: "none" }}
    />
  )
}

export default HtmlPreview