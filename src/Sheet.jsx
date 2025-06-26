
import { useEffect, useRef, useState } from "react"
import { calculateRowsandColumnsToDisplay, resizeCanvas, getEncodedCharacter } from './Sheet.utils'
export const Sheet = () => {
    const canvasRef = useRef(null);
    const [canavaWidth, setCanavaWidth] = useState(window.innerWidth);
    const [canvasHeight, setCanvasHeight] = useState(window.innerHeight);
    const cellWidth = 100;
    const cellHight = 22;
    const rowHeaderWidth = 50;
    const cloumnHeaderHeight = 22;
    const headerColor = '#f8f9fa';
    const gridLineColor = '#e2e3e3';
    const headerTextColor = "#666666"
    const { visible: visibleColumns, start: columnStart, end: coulumnEnd } = calculateRowsandColumnsToDisplay(cellWidth, canavaWidth, rowHeaderWidth);
    const { visible: visibleRows, start: rowStart, end: rowEnd } = calculateRowsandColumnsToDisplay(cellHight, canvasHeight, cloumnHeaderHeight);
    console.log('visibleColumns', visibleColumns, columnStart, coulumnEnd, "Visible rows", rowStart, rowEnd);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        //based physical pixel size it  will resize the canavas
        resizeCanvas(canvas);
        context.fillStyle = 'white';
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
        //drowth lines for rows

        let startY = cloumnHeaderHeight;
        context.strokeStyle = gridLineColor;
        for (const row of visibleRows) {
            context.beginPath();
            context.moveTo(rowHeaderWidth, startY);//where to start
            context.lineTo(context.canvas.width, startY);// where to end
            context.stroke();// fill the color
            startY += cellHight;
        }
        //Drawing the line or column
        let startX = rowHeaderWidth;
        for (const col of visibleColumns) {
            context.beginPath();
            context.moveTo(startX, cloumnHeaderHeight);//where to start
            context.lineTo(startX, context.canvas.height);// where to end
            context.stroke();// fill the color
            startX += cellWidth;
        }

        //Draw row header
        startY = cloumnHeaderHeight;
        context.fillStyle = headerColor;
        context.fillRect(0, 0, rowHeaderWidth, context.canvas.height)
        for (const row of visibleRows) {
            context.beginPath();
            context.moveTo(0, startY);//where to start
            context.lineTo(rowHeaderWidth, startY);// where to end
            context.stroke();// fill the color
            startY += cellHight;
        }
        //draw column header
        startX = rowHeaderWidth;
        startY = cloumnHeaderHeight;
        context.fillStyle = headerColor;
        context.fillRect(0, 0, context.canvas.width, cloumnHeaderHeight);
        for (const col of visibleColumns) {
            context.beginPath();
            context.moveTo(startX, 0);//where to start
            context.lineTo(startX, cloumnHeaderHeight);// where to end
            context.stroke();// fill the color
            startX += cellWidth;
        }
        //write col header text
        startX = rowHeaderWidth;
        //keeping in the center in canvas for that write the text below
        context.textAlign = 'center'//horizontally
        context.textBaseline = 'middle';


        context.font = '13 px sans-serif';
        context.fillStyle = headerTextColor;
        for (const col of visibleColumns) {
            const centerX = startX + (cellWidth * 0.5);
            const centerY = cloumnHeaderHeight * 0.5;
            const content = getEncodedCharacter(col + 1);
            context.fillText(content, centerX, centerY);
            startX += cellWidth;
        }
        //write row header number
        startY = cloumnHeaderHeight;
        for (const row of visibleRows) {
            const centerY = startY + (cellHight * 0.5);
            const centerX = rowHeaderWidth * 0.5;
            const content = row + 1;
            context.fillText(content, centerX, centerY);
            startY += cellHight;
        }
    }, [])

    useEffect(() => {
        const resizeCanvas = () => {
            setCanavaWidth(window.innerWidth);
            setCanvasHeight(window, innerHeight);
        }
        window.addEventListener('resize', resizeCanvas);
        return () => {
            window.removeEventListener('resize', resizeCanvas)
        }
    }, [])
    const onScroll = (e) => {
       const scrollX=e.target.scrollLeft;
       const scrollY=e.target.scrollTop;
       const cellOffsetInXdirection=Math.floor(scrollX/cellWidth);
        const cellOffsetInYdirection=Math.floor(scrollY/cellHight);
    }

    return <div style={{ height: '100vh', width: '100vw', position: 'relative' }}>
        <canvas ref={canvasRef} style={{ height: '100vh', width: '100vw' }} />

        {/* this below div is a overley element which will be show above the canvas element */}
        <div
            onScroll={onScroll}
            style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                top: 0,
                left: 0,
                overflow: 'scroll'
            }} >

            {/* for horizontal scrolling content to verflow horizontal */}
            <div style={{
                width: '5000px',
                height: '1px',
                position: 'absolute'
            }}>
                {/* for vertical scalling  content to verflow vertically*/}
            </div>
            <div style={{
                width: '1px',
                height: '5000px',
                position: 'absolute'
            }}>
                {/* for vertical scalling */}
            </div>

        </div>
    </div>
}