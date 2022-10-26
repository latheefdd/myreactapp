import React from "react";
import { useEffect, useRef, useState } from 'react';

export default function Drawing() {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  
  const [xvalue, setXvalue] = useState(0);
  const [yvalue,setYvalue]=useState(0);
  const [xlimit,setXlimit]=useState(0);
  const [xv,setXv]=useState(0);
  
  var intervalID=0;
  const products = ['MSR1OFC', 'MSR2OFC', 'MSROFC-FEED','CG1OUT','CG2OUT',
                    'FSOUT','WMOUT1','WMOUT2'];
  const startDraw = ({nativeEvent}) => {
    const {offsetX,offsetY}=nativeEvent;
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(offsetX, offsetY); 
  };
  const stopDraw = () => {
    ctxRef.current.closePath();

  };
  const drawRectangle =function(x,y,w,h,border){
    const ctx=ctxRef.current;
    ctx.beginPath();
    ctx.moveTo(x+border, y);
    ctx.lineTo(x+w-border, y);
    ctx.quadraticCurveTo(x+w-border, y, x+w, y+border);
    ctx.lineTo(x+w, y+h-border);
    ctx.quadraticCurveTo(x+w, y+h-border, x+w-border, y+h);
    ctx.lineTo(x+border, y+h);
    ctx.quadraticCurveTo(x+border, y+h, x, y+h-border);
    ctx.lineTo(x, y+border);
    ctx.quadraticCurveTo(x, y+border, x+border, y);
    ctx.closePath();
    ctx.stroke();
  };
  var neonRect = function(x,y,w,h,r,g,b){
    const ctx=ctxRef.current;
    ctx.shadowColor = "rgb("+r+","+g+","+b+")";
    ctx.shadowBlur = 10;
    ctx.strokeStyle= "rgba("+r+","+g+","+b+",0.2)";
    ctx.lineWidth=7.5;
    drawRectangle(x,y,w,h,1.5);
    ctx.strokeStyle= "rgba("+r+","+g+","+b+",0.2)";
ctx.lineWidth=6;
drawRectangle(x,y,w,h,1.5);
ctx.strokeStyle= "rgba("+r+","+g+","+b+",0.2)";
ctx.lineWidth=4.5;
drawRectangle(x,y,w,h,1.5);
ctx.strokeStyle= "rgba("+r+","+g+","+b+",0.2)";
ctx.lineWidth=3;
drawRectangle(x,y,w,h,1.5);
ctx.strokeStyle= '#fff';
ctx.lineWidth=1.5;
drawRectangle(x,y,w,h,1.5);
//ctx.shadowBlur=0;
  }
  const clickEffect=({nativeEvent})=>{
    const {offsetX,offsetY}=nativeEvent;
    setXlimit(offsetX);
    setXvalue(0);
    setYvalue(offsetY);
    setXv(0);
    ctxRef.current.moveTo(0,yvalue);
    intervalID=setInterval(() => {
      setXvalue( xvalue + 1);
    }, 20);
  }
  const moveEffect=({nativeEvent})=>{
    const {offsetX,offsetY}=nativeEvent;
    if(offsetX>25&&offsetX<75){
      if(offsetY>25&&offsetY<75){
      neonRect(25,25,50,50,252,90,184);
      return;}
    }
    neonRect(25,25,50,50,243,243,21);
  }
  const draw = () => {
    
    if(xv<xlimit)
    {
      setXv((xv)=>xv+1);
      ctxRef.current.lineTo(xv, yvalue);
      ctxRef.current.stroke();
    }
    else{
      setXv(0);
      clearInterval(intervalID);
    }
 
  };
  const clear = () => {
    ctxRef.current.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
  };
  // Import, state and ref events
  const updateCanvas=()=> {
    var imageObj1 = new Image();
    imageObj1.src = 'https://drive.google.com/file/d/0B2w98I0ki2qdSmJLaDdhY2RDQWs/view?usp=sharing&resourcekey=0-dp7Ktx-m2AnfCXKTX-NRFg'
 imageObj1.onload = function() {
        ctxRef.current.drawImage(imageObj1,0,0);
}

}
  useEffect(() => {
    const canvas = canvasRef.current;
    // For supporting computers with higher screen densities, we double the screen density
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    const ctx = canvas.getContext('2d');
    ctx.scale(2, 2);
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'yellow';
    ctx.lineWidth = 2;
    ctxRef.current = ctx;
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(0,100);
    
    for (const [i, product] of products.entries()) {
      neonRect(98,25+i*25,80,20,13,213,252);//cyan
      ctxRef.current.fillStyle='red';
      ctxRef.current.fillRect(100,25+i*25,70, (12 * 1.2) );
      writeText({text:product,x:100,y:23+i*25});
    }
    //neonRect(25,25,50,50,243,243,21);
    //neonRect(80,25,50,50,193,253,51);
    //neonRect(25,85,50,50,255,153,51);
    //neonRect(80,85,50,50,252,90,184);//orange
    //neonRect(140,25,50,50,13,213,252);//cyan
  },[]); 

  useEffect(()=>{
   //writeText({text:xvalue,x:100,y:30});
   if(xv<xlimit)
    {
      setXv((xv)=>xv+1);
      ctxRef.current.lineTo(xv, yvalue);
      ctxRef.current.stroke();
    }
    else{
      setXv(0);
      clearInterval(intervalID);
    }
  },[xvalue]);

  const writeText = (info, style = {}) => {
    const { text, x, y } = info;
    const { fontSize = 12, fontFamily = 'Arial', color = 'yellow', textAlign = 'left', textBaseline = 'top' } = style;
 
    ctxRef.current.beginPath();
    ctxRef.current.font = fontSize + 'px ' + fontFamily;
    ctxRef.current.textAlign = textAlign;
    ctxRef.current.textBaseline = textBaseline;
    ctxRef.fillStyle = 'yellow';
    ctxRef.current.strokeStyle = 'red';
    //ctx.fillStyle = "RGBA(255, 255, 255, 0.8)";
        
    ctxRef.current.fillText(text, x, y);
    ctxRef.current.stroke();
  };
  return (
    <div className="Drawing">
      <h1>{xvalue}</h1>
      <canvas
       onMouseDown={clickEffect}
      ref={canvasRef}
      />
      
    </div>
  );

}