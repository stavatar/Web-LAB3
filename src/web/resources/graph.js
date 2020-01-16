var FlagClick=false;
function normalizedToGraphCoords(xx,yy,R)
{

    var LocalX=R*(xx-150)/50;
    var LocalY=-R*(yy-150)/50;
    console.log(" LocalX:"+LocalX+" LocalY:"+LocalY)
    return {LocalX, LocalY}
}

function graphToNormalizedCoords(xx,yy,R)
{
    console.log(" xx:"+xx+" yy:"+xx)
    var DrawX=(xx*50/R+150);
    var DrawY= (-yy*50/R+150);
    console.log(" DrawX:"+DrawX+" DrawY:"+DrawY)
    return {DrawX,DrawY }
}
function checkArea(x, y, r)
{
    if((Number(x) >= 0 && y >= 0) && (Number(x)<r)&&(y<r/2)){
        return 1;
    } else if(Number(x) <= 0 && y >= 0 && (y <= ((Number(x)+Number(r))))){
        return 1;
    } else if (Number(x) <= 0 && y <= 0 && (r) >= Math.sqrt(y*y+Number(x)*Number(x))){
        return 1;
    } else {
        return 0;
    }
}
var plot_canvas = document.getElementById("plot");
var plot_context = plot_canvas.getContext("2d");
var Rcurrent = 1;
var Ximage;
var Yimage=0;
var image=new Image();
image.src="nar.png";
var list_of_X = new Array();
var list_of_Y = new Array();


function SetXTestPoint(value)
{

    Ximage=value;
    Ximage= (Ximage*50/Rcurrent+150);


    console.log();drawCanva();
    DrawTestPoint();
}

 Y=document.getElementById("form:Y");


Y.addEventListener("keyup",function ()
{
    Yimage=Y.value;
    Yimage=(-Yimage*50/Rcurrent+150);
    DrawTestPoint();
})
function DrawTestPoint()
{
    drawCanva();
    list_of_X.forEach(function(item, i, arr)
    {
        drawDefinedPoint(item, list_of_Y[i],Rcurrent,"No")
    });

}
function drawDefinedPoint(xx, yy,R,isClick)
{
    plot_context.beginPath();
    if (isClick!= "True")
    {
        let {DrawX,DrawY}=graphToNormalizedCoords(xx,yy,R);
        console.log(" DrawX:"+DrawX+" DrawY:"+DrawY)
        plot_context.arc(DrawX,DrawY,3,0,2*Math.PI);
    }else
    {
        plot_context.arc(xx,yy,3,0,2*Math.PI);
        console.log("xx="+xx+"yy="+yy);
        let {LocalX,LocalY}=normalizedToGraphCoords(xx,yy,R);
        xx=LocalX;
        yy=LocalY;
        console.log(" LocalX:"+LocalX+" LocalY:"+LocalY)
    }

    plot_context.fillStyle = 'gray';
    var flag=checkArea(xx, yy, Rcurrent);
    if ( flag == 1) plot_context.fillStyle = 'white';
    else plot_context.fillStyle = 'green';
    plot_context.fill();
    plot_context.closePath();
}
function drawCanva()
{
    var mult=2;
    plot_context.beginPath();
    plot_context.clearRect(0,0,300,300);

    plot_context.arc(150, 150, 25*mult, 90*Math.PI/180, 180*Math.PI/180);
    plot_context.lineTo(150, 150);
    plot_context.closePath();
    plot_context.rect(150, 150-12.5*mult, 25*mult, 12.5*mult);
    plot_context.fillStyle = 'red';
    plot_context.fill();
    plot_context.beginPath();
    plot_context.moveTo(150-25*mult, 150);
    plot_context.lineTo(150, 150-25*mult);
    plot_context.lineTo(150, 150);

    plot_context.fillStyle = 'red';
    plot_context.stroke();
    plot_context.closePath();
    plot_context.fillStyle = 'red';
    plot_context.fill();
    plot_context.beginPath();
    //Ox
    plot_context.moveTo(30, 150);
    plot_context.lineTo(270, 150);
    plot_context.lineTo(260, 140);
    plot_context.moveTo(270, 150);
    plot_context.lineTo(260, 160);
    //Oy
    plot_context.moveTo(150, 30);
    plot_context.lineTo(140, 40);
    plot_context.moveTo(150, 30);
    plot_context.lineTo(160, 40);
    plot_context.moveTo(150, 30);
    plot_context.lineTo(150, 270);

    plot_context.moveTo(30, 150);
    plot_context.closePath();
    plot_context.stroke();
    plot_context.drawImage(image,Ximage-20,Yimage-20,20,20);
}

$(document).ready(function()
{

    var x;
    var y;
    var RField = document.getElementById("form:R");

    var oldPoints=[];
    var slider=document.getElementById("form:Slider")
    slider.addEventListener("mouseup",changeR);

    let oldPointEls=document.getElementById("canvas-wrapper").querySelectorAll("*");
    RField.addEventListener("keyup",changeR);
    plot_canvas.addEventListener("click", drawPoint, false);

    for (let i = 0; i < oldPointEls.length; i++)
    {
        let x = oldPointEls[i].getAttribute("data-x");
        let y = oldPointEls[i].getAttribute("data-y");
        let hit = oldPointEls[i].getAttribute("data-hit");
        list_of_Y.push(y);
        list_of_X.push(x);
        oldPoints.push({x, y, hit: hit === "true"});
    }
    if (oldPointEls.length>0)
     Rcurrent=oldPointEls[oldPointEls.length-1].getAttribute("data-radius");


    console.log("RCURRENT=++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"+Rcurrent);
    RField.setAttribute("value",Rcurrent);
    RField.innerText=Rcurrent;
    RField.value=Rcurrent;
   console.log(RField.innerText + " "+RField.innerHTML)

    drawCanva(Rcurrent);



    list_of_X.forEach(function(item, i, arr)
    {
        //console.log("X в массиве:")
        drawDefinedPoint(item, list_of_Y[i],Rcurrent,"No")
    });



    function changeR(e)
    {
        var TestR = RField.value;
        TestR.replace(",",".");
        TestR = Number(TestR);
        f = Boolean(TestR < 1 || TestR > 4 || isNaN(Number(TestR)) || TestR == "" || TestR.length > 2);
        if (!f)
        {
            Ximage= Rcurrent*(Ximage-150)/50;
            Yimage=-Rcurrent*(Yimage-150)/50;
            Rcurrent = TestR;
            Ximage= (Ximage*50/Rcurrent+150);
            Yimage=(-Yimage*50/Rcurrent+150);
            drawCanva(Rcurrent);
            list_of_X.forEach(function (item,i,arr) {
                drawDefinedPoint(item,list_of_Y[i],Rcurrent,"False");
            });
        }
    }



        function drawPoint(e)
        {
            console.log(FlagClick)
            console.log(FlagClick===false)
                  if (FlagClick===false) {
                      FlagClick = true;
                      getCursorPosition(e);
                      console.log(" x:" + x + " y:" + y)
                      let {LocalX,LocalY} = normalizedToGraphCoords(x,y,Rcurrent);
                      list_of_X.push(LocalX);
                      list_of_Y.push(LocalY);
                      console.log(" LocalX:" + LocalX + " LocalY:" + LocalY)
                      drawDefinedPoint(x,y,Rcurrent,"True");
                      Y.setAttribute("value",LocalY);
                      Y.value = LocalY;
                      Y.innerText = LocalY;
                      var Xhid = document.getElementById("form:hidX");
                      Xhid.setAttribute("value",LocalX);
                      var button = document.getElementById("form:button");
                      button.setAttribute("value",LocalX)
                      console.log("Значение:" + button.value)
                      console.log(LocalX)
                      var NewBut = document.createElement("button");
                      NewBut.setAttribute("value",LocalX);
                      NewBut.setAttribute("href",button.getAttribute("href"));
                      NewBut.setAttribute("onclick",button.getAttribute("onclick"));
                      NewBut.click();
                  }
        }





        function getCursorPosition(e) {
            if (e.pageX != undefined && e.pageY != undefined) {
                x = e.pageX;
                y = e.pageY;
            } else {
                x = e.clientX + document.body.scrollLeft +
                    document.documentElement.scrollLeft;
                y = e.clientY + document.body.scrollTop +
                    document.documentElement.scrollTop;
            }
            x -= plot_canvas.offsetLeft ;
            y -= plot_canvas.offsetTop ;
        }
});
