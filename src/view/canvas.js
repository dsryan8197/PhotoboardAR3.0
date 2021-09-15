import React, { useRef, useEffect } from 'react'

const Canvas = props => {
  window.alert(canvas)
  const canvasRef = useRef(null)
  
    const draw = ctx => {
    ctx.fillStyle = '#000000'
    ctx.drawImage(image, (400 -256) / 2, 40)
// ctx.textAlign = "center"
// ctx.fillText(text, (400 /2), 256 + 40 + 25)
  }
  
  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    // context.fillStyle = '#000000'
   draw(context)
  }, [draw])

  return <canvas ref={canvasRef} {...props}/>
}

export default Canvas