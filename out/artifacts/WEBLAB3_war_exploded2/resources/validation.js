$(document).ready(function()
{
    var X=[];
    var XClick=[];
    var XHref=[];
X=document.querySelectorAll("a");

    var Validate;
    var X1 = document.getElementById("form:x1");
    var onclick = X1.getAttribute("onclick");
    var href = X1.getAttribute("href");
    X.forEach(function(item, i)
    {
        XClick.push(item.getAttribute("onclick"));
        XHref.push(item.getAttribute("href"));
    });

    Validate = function (min,max,Id,p)
    {
        var Ymes = document.getElementById(Id);
        var fail = "";
        Y = Yinput.value;
        Y = Number(Y);
        console.log(Y + " " + Boolean(Y >= min) + " " + Boolean(Y <= max) + " " + !isNaN(Number(Y)) + " " + Y.length);
        console.log(Y + " " + Boolean(Y <= min) + " " + Boolean(Y >= max) + " " + isNaN(Number(Y)) + " " + Y.length);
        var f = Boolean(Y <= min || Y >= max || isNaN(Number(Y)) || Y == "" || Y.length > 2);
        console.log(f);
        if (f)
        {
            Ymes.textContent = "Неверное значение "+p;
            X.forEach(function(item, i)
            {
                item.removeAttribute("onclick");
                item.removeAttribute('href');
            });

        } else
            {
            Ymes.textContent = "";
                X.forEach(function(item, i)
                {
                    item.setAttribute("onclick",XClick[i]);
                    item.setAttribute('href',XHref[i]);
                });
        }

    }






    var Yinput = document.getElementById("form:Y");
    Yinput.addEventListener("keyup",function(){ Validate(-5,5,"form:Ymes","Y");} );
    var Rinput = document.getElementById("form:R");
    Rinput.addEventListener("keyup",function(){ Validate(1,4,"form:Rmes","R");});
});