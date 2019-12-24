$(document).ready(function()
{



    var list_of_X = new Array();
    var list_of_Y = new Array();
    var list_of_R=new Array();
    var x;
    var y;
    var Rcurrent = 1;


    //Graph
    var plot_canvas = document.getElementById("plot");
    var plot_context = plot_canvas.getContext("2d");
    plot_context.beginPath();
    plot_context.arc(150, 150, 100, 90*Math.PI/180, 180*Math.PI/180);
    plot_context.lineTo(150, 150);
    plot_context.closePath();
    plot_context.rect(150, 100, 100, 50);
    plot_context.fillStyle = 'red';
    plot_context.fill();
    plot_context.beginPath();
    plot_context.moveTo(50, 150);
    plot_context.lineTo(150, 50);
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


    var oldPoints=[];
    let oldPointEls=document.getElementById("canvas-wrapper").querySelectorAll("*");

    for (let i = 0; i < oldPointEls.length; i++)
    {
        let x = oldPointEls[i].getAttribute("data-x");
        let y = oldPointEls[i].getAttribute("data-y");
        let hit = oldPointEls[i].getAttribute("data-hit");
        let r=oldPointEls[i].getAttribute("data-radius");
        list_of_R.push(r);
        list_of_Y.push(y);
        list_of_X.push(x);
        console.log("X="+x+"Y="+y)
        oldPoints.push({x, y, hit: hit === "true"});
    }
console.log("Количество радиусов"+list_of_R.length);
    var  PrevR=1;
    if (oldPointEls.length>0)
     PrevR=oldPointEls[oldPointEls.length-1].getAttribute("data-radius");
    RField=document.getElementById("form:R");
    RField.value=PrevR;
    drawCanva(PrevR);

    var slider=document.getElementById("form:Slider")
    console.log("1`");
    list_of_X.forEach(function(item, i, arr)
    {
        alert("X="+item+"Y="+list_of_Y[i]);
        console.log("X="+item+"Y="+list_of_Y[i]);

        drawAllOldPoint(item, list_of_Y[i],Rcurrent,list_of_R[i]);
    });
    console.log("2");
    RField.addEventListener("keyup",changeR);
    slider.addEventListener("mouseup",changeR);

    function  drawAllOldPoint(xx,yy,R,Rpred)
    {

        plot_context.beginPath();
        console.log("Xx="+xx+"Yy="+yy)
        var DrawX=xx;
        var DrawY=yy;
        DrawX = DrawX*25*R*R/Rpred;
        DrawY = DrawY*25*R*R/Rpred;
        DrawX = Number(DrawX)+150.0;
        DrawY = (-1)*Number(DrawY)+150.0;
        console.log("Xx="+DrawX+"Yy="+DrawY)
        plot_context.rect(DrawX, DrawY, 5, 5);
        console.log("Xx="+xx+"Yy="+yy)
        plot_context.fillStyle = 'gray';
        var flag=checkArea(xx, yy, Rcurrent,Rpred);
        console.log(flag);
        if ( flag== 1) plot_context.fillStyle = 'white';
        plot_context.fill();
        plot_context.closePath();
    }
    function changeR(e)
    {

        Rcurrent = RField.value;
        drawCanva(Rcurrent);
        list_of_X.forEach(function(item, i, arr)
        {
            drawDefinedPoint(item, list_of_Y[i],Rcurrent,list_of_R[i],"False");
        });

    }

    function drawCanva(mult)
    {

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

    }

        plot_canvas.addEventListener("click", drawPoint, false);

        function drawPoint(e)
        {
          // console.log(Rcurrent);
            if('-1' == Rcurrent)
            {
                alert("Выберите какое-нибудь значение R");
            } else
                {
                    getCursorPosition(e);

                    console.log("x="+x+"y="+y);
                    var LocalX=(x-150)/25;
                    var LocalY=(y-150)/25
                    console.log("LolalX="+LocalX+"LocalY="+LocalY);
                    list_of_X.push(LocalX);
                    list_of_Y.push(LocalY);
                    list_of_R.push(Rcurrent);
                    drawDefinedPoint(x, y,Rcurrent,1,"True");
                    var xxx=document.getElementById("form:canvaX");
                    xxx.setAttribute("value",x);
                    var yyy=document.getElementById("form:Y");
                    yyy.setAttribute("value",y);
                    console.log(x+"  "+yyy.getAttribute("value"))
            }

        }

 function drawDefinedPoint(xx, yy,R,Rprev,isClick)
        {
            plot_context.beginPath();
            if (isClick!= "True")
            {
                var Xdraw = xx;
                var Ydraw = yy;
                console.log("Начальные данные отрисовки отрисовки: X=" + Xdraw + "Y=" + Ydraw + "Rprev=" + Rprev+"Rcurrent="+R);
                console.log("xx*R="+Number(Number(Xdraw)*25));
                Xdraw = (Xdraw *25*R/Rprev)+150;
                Ydraw = (Ydraw *25* R/Rprev)+150;
                console.log("Конеченые данные отрисовки отрисовки X=" + Xdraw + "Y=" + Ydraw);
                plot_context.rect(Xdraw,Ydraw,5,5);
                yy=-1*yy;
            }else
                {

                    plot_context.rect(xx,yy,5,5);
                    console.log("xx="+xx+"yy="+yy);
                    xx=(xx-150)/25;
                    yy= (-1)*(yy-150)/25;

            }
            plot_context.fillStyle = 'gray';
            console.log("x")

            var flag=checkArea(xx, yy, Rcurrent,Rprev);
          console.log(flag);

            if ( flag == 1) plot_context.fillStyle = 'white';
            else plot_context.fillStyle = 'green';
            plot_context.fill();
            plot_context.closePath();
        }

        function checkArea(x, y, r,rprev)
        {
            console.log(rprev+"CHECK1:Xx="+x+"Yy="+y+"R="+r);
            x=x*r/rprev;
            y=y*r/rprev;
            console.log("CHECK2:Xx="+x+"Yy="+y+"R="+r+"  "+y+"<="+(Number(x)+Number(r)));
            console.log("one="+Boolean(x <= 0)+"two="+Boolean(y >= 0)+" "+Boolean(y <= (x+r)));
            if((x >= 0 && y >= 0) && (x<r)&&(y<r/2)){
                return 1;
            } else if(x <= 0 && y >= 0 && (y <= ((Number(x)+Number(r))))){
                return 1;
            } else if (x <= 0 && y <= 0 && (r) >= Math.sqrt(y*y+x*x)){
                return 1;
            } else {
                return 0;
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
            console.log(x+" "+y)
        }


});
