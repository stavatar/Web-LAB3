$(document).ready(function()
{
    var list_of_X = new Array();
    var list_of_Y = new Array();
    var x;
    var y;
    var Rcurrent = 1;
    var plot_canvas = document.getElementById("plot");
    var plot_context = plot_canvas.getContext("2d");
    var oldPoints=[];
    var slider=document.getElementById("form:Slider")

    slider.addEventListener("mouseup",changeR);
    var RField = document.getElementById("form:R");
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
        console.log("X="+x+"Y="+y)
        oldPoints.push({x, y, hit: hit === "true"});
    }
    if (oldPointEls.length>0)
     Rcurrent=oldPointEls[oldPointEls.length-1].getAttribute("data-radius");

    RField.value=Rcurrent;
    drawCanva(Rcurrent);
    console.log("1`");

    list_of_X.forEach(function(item, i, arr)
    {
        console.log("X="+item+"Y="+list_of_Y[i]);
        drawAllOldPoint(item, list_of_Y[i],Rcurrent);
    });
    console.log("2");


    function normalizedToGraphCoords(xx,yy,R)
    {
        var LocalX=R*(xx-150)/50;
        var LocalY=-R*(yy-150)/50;
        return {LocalX, LocalY}
    }

    function graphToNormalizedCoords(xx,yy,R)
    {
        var DrawX=(xx*50/R+150);
        var DrawY= (-yy*50/R+150);
        return {DrawX,DrawY }
    }
    function  drawAllOldPoint(xx,yy,R)
    {
        plot_context.beginPath();
        console.log("Xx="+xx+"Yy="+yy+"RR="+R)
        let {DrawX,DrawY}=graphToNormalizedCoords(xx,yy,R);
        console.log("Xx="+DrawX+"Yy="+DrawY)
        plot_context.rect(DrawX, DrawY, 5, 5);
        console.log("Xx="+xx+"Yy="+yy)
        plot_context.fillStyle = 'gray';
        var flag=checkArea(xx, yy, Rcurrent);
        console.log(flag);
        if ( flag== 1) plot_context.fillStyle = 'white';
        plot_context.fill();
        plot_context.closePath();
    }
    function changeR(e)
    {
        var TestR = RField.value;

        TestR.replace(",",".");
        TestR = Number(TestR);
        f = Boolean(TestR < 1 || TestR > 4 || isNaN(Number(TestR)) || TestR == "" || TestR.length > 2);
        if (!f)
        {
            Rcurrent = TestR;
            drawCanva(Rcurrent);
            list_of_X.forEach(function (item,i,arr) {
                drawDefinedPoint(item,list_of_Y[i],Rcurrent,"False");
            });
        }

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

    }



        function drawPoint(e)
        {
                    getCursorPosition(e);
                    console.log("x="+x+"y="+y);
                    let {LocalX,LocalY}=normalizedToGraphCoords(x,y,Rcurrent);
                    console.log("LolalX="+LocalX+"LocalY="+LocalY);
                    list_of_X.push(LocalX);
                    list_of_Y.push(LocalY);
                    drawDefinedPoint(x, y,Rcurrent,"True");
        }

 function drawDefinedPoint(xx, yy,R,isClick)
        {
            plot_context.beginPath();
            if (isClick!= "True")
            {
                console.log("Начальные данные отрисовки отрисовки: X=" + xx + "Y=" + yy + "Rcurrent="+R);
                console.log("xx*R="+Number(Number(xx)*25));
                let {DrawX,DrawY}=graphToNormalizedCoords(xx,yy,R);
                console.log("Конеченые данные отрисовки отрисовки X=" + DrawX + "Y=" + DrawY);
                plot_context.rect(DrawX,DrawY,5,5);
            }else
                {

                    plot_context.rect(xx,yy,5,5);
                    console.log("xx="+xx+"yy="+yy);
                    let {LocalX,LocalY}=normalizedToGraphCoords(xx,yy,R);
                    xx=LocalX;
                    yy=LocalY;
            }
            plot_context.fillStyle = 'gray';
            console.log("x")
            var flag=checkArea(xx, yy, Rcurrent);
            console.log(flag);
            if ( flag == 1) plot_context.fillStyle = 'white';
            else plot_context.fillStyle = 'green';
            plot_context.fill();
            plot_context.closePath();
        }

        function checkArea(x, y, r)
        {

            console.log("CHECK2:Xx="+x+"Yy="+y+"R="+r+"   "+y+"<="+(Number(x)+Number(r)));
            console.log("one="+Boolean(x >= 0)+"two="+Boolean(y >= 0)+"  x<r:"+Boolean((Number(x)<r))+"  y <r/2:"+Boolean(y <r/2));
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

        console.log("Радиус"+ Rcurrent);

});
