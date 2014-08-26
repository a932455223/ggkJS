var mousedown = false;
var mouseup = false;
var canvas = document.getElementById('myCanvas'); 
var context = canvas.getContext('2d'); 
var w = canvas.width;
var h = canvas.height;
var box = document.querySelector('#gglBox');
var win_grand = $("#win_grand");

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
  if(parseFloat(p) > 50){
	var win = $("#win_grand").attr("data-win-flag");
	
	if(win == "true"){
		var award_grand = win_grand.attr("data-award-grand");
		var award_name = win_grand.attr("data-award-name");

		$('#show_award').attr("data-award-grand", award_grand);
		$('#show_award').html(award_grand + " : " + award_name);
    	$('#win_pop').show();
	}else {
		$('#lose_pop').show();
	}
  }
  // document.getElementById('result').value ='擦去的面积:' + p+'%';
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

var flag = win_grand.attr("data-win-flag");
var val = win_grand.attr("data-award-name");
if(flag == 'true'){
	val = win_grand.attr("data-award-grand");
}

var txt = 'Smallyoko'; 
/******设置刮刮卡背景图片********/
var text = document.createElement('canvas');
text.width = w;
text.height = h;
var txtCtx = text.getContext('2d');
txtCtx.font = 'bold 26px 幼圆';
txtCtx.textBaseline = 'middle';
txtCtx.textAlign = 'center';
txtCtx.fillText(val ,w/2,h/2);
/****重新绘制刮刮卡*****/
function reRender(str){
  txtCtx.clearRect(0,0,w,h);
  txtCtx.fillText(str,w/2,h/2);
  canvas.style.background = 'url('+ text.toDataURL() +') no-repeat';
  context.globalCompositeOperation='source-over';
  context.fillStyle='gray';
  context.fillRect(0,0,w,h);
  context.globalCompositeOperation='destination-out';

}
/*******设置刮刮卡背景图片 end********/
canvas.style.background = 'url('+ text.toDataURL() +') no-repeat';
context.fillStyle = 'gray';
context.fillRect(0,0,w,h);
context.fillStyle = '#fff';
context.globalCompositeOperation = 'destination-out';
box.addEventListener('touchstart',eventDown);
box.addEventListener('mousedown',eventDown);
box.addEventListener('touchmove',eventMove);
box.addEventListener('mousemove',eventMove);
box.addEventListener('touchend',eventUp);
box.addEventListener('mouseup',eventUp);
