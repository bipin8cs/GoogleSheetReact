
import { useRef } from "react"
export const Sheet = () => {
    const canvasRef = useRef(null);
    const canavaWidth=window.innerWidth;
    const canvasHeight=window.innerHeight;

    return <div style={{ height: '100vh', width: '100vw' }}>
        <canvas ref={canvasRef} style={{ height: '100vh', width: '100vw' }}/>
    </div>
}