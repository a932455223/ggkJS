;(function(){
var mousedown = false;
var mouseup = false;
var canvas = document.getElementById('myCanvas'); 
var context = canvas.getContext('2d'); 
var box,w,h;
var options = {};
var default_option={
  container:'gglBox',
  text:'thanks',
  backFont:'bold 26px 幼圆',
  areaPercent:50,
  frontPosition:{
    x:function(_w,_h){
    return 2;
  },
    y:function(_w,_h){
      return (_h/2)+4;
    }
},
  frontText:'刮开下面的图层'

};


function init(){
  box = document.querySelector('#'+options.container);
  w = canvas.width;
  h = canvas.height
}
function offsetLeft(elem){
  return elem.offsetParent ? elem.offsetLeft + offsetLeft(elem.offsetParent) : elem.offsetLeft;
}

function offsetTop(elem){
  return elem.offsetParent ? elem.offsetTop + offsetTop(elem.offsetParent) : elem.offsetTop;
}
function eventDown(e){
  e.preventDefault();
  mousedown = true;
}

function getPercent(){
  var img = context.getImageData(0,0,w,h).data;
  var len = img.length,k = 0;
  for(var i = 0; i < len; i += 4){
    if(img[i]=== 0 && img[i+1]===0 && img[i+2]===0 && img[i+3]===0){
      k++;
    }
  }
  return (k*100/(w*h)).toFixed(2);
}

function eventUp(e){
  e.preventDefault();
  mousedown = false;
  var p = getPercent();
  if(parseFloat(p) > options.areaPercent){
    if(typeof options.complete == 'function'){
      options.complete(getPercent);
    }
  }
}

function eventMove(e){
  e.preventDefault();
  if(e.changedTouches){
    e = e.changedTouches[e.changedTouches.length - 1];
  }
  if(mousedown){
    var x = (e.clientX +　document.body.scrollLeft || e.pageX) - offsetLeft(canvas) || 0;
    var y = (e.clientY +　document.body.scrollTop || e.pageY) - offsetTop(canvas) || 0;
    context.beginPath();
    context.arc(x, y, 15, 0, Math.PI * 2);
    context.fill();
  }else{
    console.log('move');
  }
}

function extend(target,source){
  for(var val in source){
    if(!target[val]){
      target[val] = source[val];
    }
  }
  return target;
}

function clear(){
  context.globalCompositeOperation='destination-out';
  context.fillRect(0,0,w,h);
}

/****重新绘制刮刮卡*****/
function renderText(str){
  var text = document.createElement('canvas');
  text.width = w;
  text.height = h;
  var txtCtx = text.getContext('2d');
  txtCtx.font = options.backFont;
  txtCtx.textBaseline = 'middle';
  txtCtx.textAlign = 'center';
  txtCtx.fillText(str,w/2,h/2);
  canvas.style.background = 'url('+ text.toDataURL() +') no-repeat';
  context.globalCompositeOperation='source-over';
  context.fillStyle='gray';
  context.fillRect(0,0,w,h);
  context.fillStyle = 'white';
  context.font = 'bold 18px 幼圆';
  context.fillText(options.frontText,options.frontPosition.x(w,h),options.frontPosition.y(w,h));
  context.globalCompositeOperation='destination-out';
}

function createGGK(option){
  //获取配置
  options = extend(option,default_option);
  //初始化方法
  init();
  /*******设置ggk显示的文字********/
  renderText(options.text);
  context.globalCompositeOperation = 'destination-out';
  box.addEventListener('touchstart',eventDown);
  box.addEventListener('mousedown',eventDown);
  box.addEventListener('touchmove',eventMove);
  box.addEventListener('mousemove',eventMove);
  box.addEventListener('touchend',eventUp);
  box.addEventListener('mouseup',eventUp);
  return {reRender:renderText,clear:clear};
}

window.createGGK = createGGK;
})(window);