import React from "react";
import { useEffect, useRef, useState } from 'react';
import './Drawing.css';
export default function Drawing() {
var sr=new Array(10);
var dst=new Array(10);
var did=10;
var sid=10;
var x1=0;
//var y1=0;
var xsrc=0;
var ysrc=0;
var xmid=0;
var xdst=0;
var ydst=0;
var down=true;
for (var i = 0; i < sr.length; i++) {
    sr[i] = new Array(3);
    dst[i]=new Array(3);
};
for ( i = 0; i < 10; i++) {
  for (var j = 0; j < 3; j++) {
      sr[i][j] = 0;

  }
};
var val=0;
let nIntervId;
const canvasRef = useRef(null);
const ctxRef = useRef(null);
const xb=30;
const [xvalue, setXvalue] = useState(0);
const [yvalue,setYvalue]=useState(0);
//const [value,setValue]=useState(true);
const [xv,setXv]=useState(0);
var intervalID=0;
var value=true;
const sources1 = ['MSR1', 'MSR2', 'MSR3',' CG1',' CG2','  FS','  PD','  PD','  WM','  WM'];
const sources2 = ['  HD', '  SD ', 'FEED','  HD','  HD',' OUT','  HD','  HD','  SD','  SD'];                
const sources3 = [' OFC', ' OFC', ' OFC',' OUT',' OUT','  SD',' OUT',' OUT','OUT-1','OUT-2'];
const destinations1=[' CG1',' CG2','FS-IN',' OLD','','  WM','  WM','ENC1'];
const destinations2=['  HD','  HD','  HD','ES','','  SD','  SD','MAIN'];
const destinations3=['  IN','  IN','  IN','  IN','',' IN-1',' IN-2','SD-IN'];
const equipments=['CG1','CG2',' FS',' PD','',' WM',''];
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
  takebutton();
  ctxRef.current.shadowBlur = 0;
  clearInterval(intervalID);
},[]);
function arrow(xa,ya,direction){
  if(direction===1){
  ctxRef.current.moveTo(xa,ya-3);
  ctxRef.current.lineTo(xa-7,ya);
  ctxRef.current.lineTo(xa,ya+3);
  ctxRef.current.stroke();
  }
  else{
    ctxRef.current.moveTo(xa,ya);
  ctxRef.current.lineTo(xa-7,ya-3);
  ctxRef.current.moveTo(xa-7,ya+3);
  ctxRef.current.lineTo(xa,ya);
  ctxRef.current.stroke();
  }
}  
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
        srcbutton();
        neonRect(xc,yc,40,40,252,90,184);
        if(did===10){
          dstbutton();
          for(const [j,vx] of dst.entries()){
            if(vx[2]===i){
              neonRect(vx[0],vx[1],40,40,252,90,184);
            }
          }
        }
        else{
          nIntervId = setInterval(blinker, 500);
          sid=i;
        }
        equbutton();
        return;
      }
    }
  }
  //DESTINATION KEY
  for (const [i, sx] of dst.entries()) {
    const xc=sx[0];
    const yc=sx[1];
    if(offsetX>xc&&offsetX<xc+40){
      if(offsetY>yc&&offsetY<yc+40){
        dstbutton();
        srcbutton();
        equbutton();
        neonRect(xc,yc,40,40,252,90,184);
        did=i;
      return;
    }
    }
  }
  //TAKE KEY
  if(offsetX>xb+200&&offsetX<xb+240){
    if(offsetY>25&&offsetY<65){
      dst[did][2]=sid;
      clearInterval(nIntervId);
      value=true;
      takebutton();
      drawLink();
      return;
    }
  }
}
function drawLink(){
  nIntervId = setInterval(dl, 15);
  xsrc=sr[sid][0]+45;
  ysrc=sr[sid][1]+20;
  xdst=dst[did][0]-5;
  ydst=dst[did][1]+20;
  xmid=(xdst-xsrc)/2;
  x1=0;
  if(ydst>ysrc)
    down=true;
  else
    down=false;
  ctxRef.current.moveTo(xsrc,ysrc);
}
function dl(){
  x1=x1+1;
  if(x1>=xmid ){
    if(down){
      if(ysrc<ydst)
        ysrc=ysrc+1;
      else
        xsrc=xsrc+1;
    }
    else{
      if(ysrc>ydst)
        ysrc=ysrc-1;
      else
        xsrc=xsrc+1;
    }
  }
  else{
    xsrc=xsrc+1;
  }
  ctxRef.current.lineTo(xsrc,ysrc);
  ctxRef.current.stroke();
  if(xsrc===xdst){
    did=10;
    sid=10;
    clearInterval(nIntervId);
  }
}
function blinker()  {
      value=!value;
      takebutton();
};
const equbutton=()=>{
  ctxRef.current.clearRect(xb-10,0,90,600);
  for (const [i, equipment] of equipments.entries()) {
    if(i!=4){
    neonRect(xb,190+i*60,50,40,13,213,252);//cyan
    ctxRef.current.fillStyle='yellow';
    if(i!=3){
    ctxRef.current.moveTo(xb+50,195+i*60);
    ctxRef.current.lineTo(xb+200,195+i*60);
    arrow(xb+80,195+i*60,1);
    }
    ctxRef.current.moveTo(xb+50,225+i*60);
    ctxRef.current.lineTo(xb+100,225+i*60);
    arrow(xb+80,225+i*60,0);
    ctxRef.current.stroke();
    writeText({text:equipment,x:xb+5,y:195+i*60});
  }
  }  
}  
const srcbutton=()=>{
  ctxRef.current.clearRect(xb+80,0,90,650);
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
  ctxRef.current.clearRect(xb+160,180,100,600);
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
const takebutton=()=>{
  ctxRef.current.clearRect(xb+180,15,100,60);
  if(value)
    neonRect(xb+200,25,40,40,13,213,252);//cyan -TAKE BUTTON
  else
    neonRect(xb+200,25,40,40,252,90,184);
  writeText({text:"TAKE",x:xb+205,y:30});
}
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
  ctxRef.current.fillText(text, x, y);
  ctxRef.current.stroke();
};  
  return (
    <div className="Drawing">
      <canvas onMouseDown={clickEffect} ref={canvasRef} />
    </div>
  );
}