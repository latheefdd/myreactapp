import React from "react";
import { useEffect, useRef, useState } from 'react';
import './Drawing.css';
export default function Drawing() {
    var sr=new Array(10);
    var dst=new Array(10);
    var did=0;
    var sid=0;
    for (var i = 0; i < sr.length; i++) {
        sr[i] = new Array(3);
        dst[i]=new Array(3);
    };

  for ( i = 0; i < 10; i++) {
    for (var j = 0; j < 3; j++) {
        sr[i][j] = 0;

    }
};
const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const xb=30;
  const [xvalue, setXvalue] = useState(0);
  const [yvalue,setYvalue]=useState(0);
  const [xlimit,setXlimit]=useState(0);
  const [xv,setXv]=useState(0);
  
  var intervalID=0;
  const sources1 = ['MSR1', 'MSR2', 'MSR3','CG1','CG2','FS','WM','WM'];
    const sources2 = ['HD', 'OFC', 'FEED','HD','HD','OUT','OUT1','OUT2'];                
    const sources3 = ['OFC', 'OFC', 'OFC','OUT','OUT','','',''];
    const destinations1=['CG1','CG2','FS-IN','WATER','WATER','ENC1'];
    const destinations2=['IN','IN','FS','MARK','MARK','M'];
    const destinations3=['HD','HD','IN','IN-1','IN-2','IN'];
    const equipments=['CG1','CG2','FS','WM'];
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
  }
  const clickEffect=({nativeEvent})=>{
    const {offsetX,offsetY}=nativeEvent;
    for (const [i, sx] of sr.entries()) {
      const xc=sx[0];
      const yc=sx[1];
      //SOURCE KEY
    if(offsetX>xc&&offsetX<xc+40){
      if(offsetY>yc&&offsetY<yc+40){
        ctxRef.current.clearRect(20,0,300,600);
        srcbutton();
        neonRect(xc,yc,40,40,252,90,184);
        sid=i;
        //ctxRef.current.clearRect(xb+190,120,70,600);
        dstbutton();
        for(const [j,vx] of dst.entries()){
          if(vx[2]===i){
            neonRect(vx[0],vx[1],40,40,252,90,184);
            //writeText({text:vx[2],x:400,y:10});
          }
        }
        equbutton();
      //intervalID=setInterval(() => {
      //setXvalue( xvalue + 1);
   // }, 30);
      return;}
    }
  }
  //DESTINATION KEY
    for (const [i, sx] of dst.entries()) {
      const xc=sx[0];
      const yc=sx[1];
    if(offsetX>xc&&offsetX<xc+40){
      if(offsetY>yc&&offsetY<yc+40){
        dstbutton();
      neonRect(xc,yc,40,40,252,90,184);
      did=i;
      return;}
    }
  }
  //TAKE KEY
  if(offsetX>330&&offsetX<370){
    if(offsetY>60&&offsetY<100){
      //dstbutton();
      neonRect(xb+300,60,40,40,252,90,184);
      dst[did][2]=sid;
      return;
    }
  }
    //setXlimit(offsetX);
    //setXvalue(0);
    //setYvalue(offsetY);
    //setXv(0);
    //ctxRef.current.moveTo(0,yvalue);
    //intervalID=setInterval(() => {
      //setXvalue( xvalue + 1);
    //}, 30);
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
  const srcbutton=()=>{
    for (const [i, source] of sources1.entries()) {
      neonRect(xb+100,25+i*60,40,40,13,213,252);//cyan
      sr[i][0]=xb+100;
      sr[i][1]=25+i*60;
      ctxRef.current.fillStyle='yellow';
      writeText({text:sources1[i],x:xb+105,y:30+i*60});
      writeText({text:sources2[i],x:xb+105,y:40+i*60});
      writeText({text:sources3[i],x:xb+105,y:50+i*60});
    }
  }
  const dstbutton=()=>{
    for (const [i, destination] of destinations1.entries()) {
      neonRect(xb+200,190+i*60,40,40,13,213,252);//cyan
      dst[i][0]=xb+200;
      dst[i][1]=190+i*60;
      ctxRef.current.fillStyle='yellow';
      writeText({text:destinations1[i],x:xb+205,y:195+i*60});
      writeText({text:destinations2[i],x:xb+205,y:205+i*60});
      writeText({text:destinations3[i],x:xb+205,y:215+i*60});
    }
  }
  const equbutton=()=>{
    for (const [i, equipment] of equipments.entries()) {
      neonRect(xb,190+i*60,50,40,13,213,252);//cyan
      ctxRef.current.fillStyle='yellow';
      ctxRef.current.moveTo(80,195+i*60);
      ctxRef.current.lineTo(xb+200,195+i*60);
      ctxRef.current.moveTo(80,225+i*60);
      ctxRef.current.lineTo(xb+100,225+i*60);
      ctxRef.current.stroke();
      writeText({text:equipment,x:xb+5,y:195+i*60});
    }  
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
    srcbutton();
    dstbutton();
    equbutton();
    neonRect(xb+300,60,40,40,13,213,252);//cyan -TAKE BUTTON
    writeText({text:"TAKE",x:xb+305,y:65});
    ctxRef.current.shadowBlur = 0;
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
    const { fontSize = 10, fontFamily = 'Arial', color = 'yellow', textAlign = 'left', textBaseline = 'top' } = style;
 
    ctxRef.current.beginPath();
    ctxRef.current.font = fontSize + 'px ' + fontFamily;
    ctxRef.current.textAlign = textAlign;
    ctxRef.current.textBaseline = textBaseline;
    ctxRef.current.shadowBlur = 0;
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