
import { useEffect, useRef } from "react"
import { calculateRowsandColumnsToDisplay, resizeCanvas } from './Sheet.utils'
export const Sheet = () => {
    const canvasRef = useRef(null);
    const canavaWidth = window.innerWidth;
    const canvasHeight = window.innerHeight;
    const cellWidth = 100;
    const cellHight = 22;
    const { visible: visibleColumns, start: columnStart, end: coulumnEnd } = calculateRowsandColumnsToDisplay(cellWidth, canavaWidth);
    const { visible: visibleRows, start: rowStart, end: rowEnd } = calculateRowsandColumnsToDisplay(cellHight, canvasHeight);
    console.log('visibleColumns', visibleColumns, columnStart, coulumnEnd, "Visible rows", rowStart, rowEnd);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        //based physical pixel size it  will resize the canavas
        resizeCanvas(canvas);
        context.fillStyle = 'white';
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
        //drowth lines for rows
        //drowth lines for rows
        let startY = 0
        for (const row of visibleRows) {
            context.beginPath();
            context.moveTo(0, startY);//where to start
            context.lineTo(context.canvas.width, startY);// where to end
            context.stroke();// fill the color
            startY+=cellHight;
        }
        //Drawing the line or column
        let startX = 0
        for (const col of visibleColumns) {
            context.beginPath();
            context.moveTo(startX, 0);//where to start
            context.lineTo(startX, context.canvas.height);// where to end
            context.stroke();// fill the color
            startX += cellWidth;
        }


    }, [])

    return <div style={{ height: '100vh', width: '100vw' }}>
        <canvas ref={canvasRef} style={{ height: '100vh', width: '100vw' }} />
    </div>
}