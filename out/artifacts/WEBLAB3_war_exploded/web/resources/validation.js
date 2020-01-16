$(document).ready(function() {
    var f = false;
    var X = [];
    var XClick = [];
    var XHref = [];
    X = document.querySelectorAll("a");
    X.forEach(function (item,i) {
        item.addEventListener("mouseover",function () {
            AddHoverClass(item.getAttribute("id"))
        });
        item.addEventListener("mousedown",function () {
            AddActiveClass(item.getAttribute("id"))
        });
        item.addEventListener("mouseout",function () {
            RemoveHoverClass(item.getAttribute("id"))
        });
        item.addEventListener("mouseup",function () {
            RemoveActiveClass(item.getAttribute("id"))
        });
        XClick.push(item.getAttribute("onclick"));
        XHref.push(item.getAttribute("href"));
    });
    var ActiveBool = false;
    var HoverBool = false;

    function AddActiveClass(id) {
        if (!f) {
            if (ActiveBool == false) {
                ActiveBool = true;
            }
            if (document.getElementById(id).classList.contains("hover")) {
                RemoveHoverClass(id);
                ActiveBool = true;
            }

        }
    }

    function RemoveActiveClass(id) {
        ActiveBool = false;

        document.getElementById(id).classList.remove("active");
    }

    function AddHoverClass(id) {

        if (HoverBool == false) {
            document.getElementById(id).classList.add("hover");
            HoverBool = true;
        }
        if (document.getElementById(id).classList.contains("active")) {
            RemoveActiveClass(id);
            HoverBool = true;
        }
    }

    function RemoveHoverClass(id) {
        HoverBool = false;

        document.getElementById(id).classList.remove("hover");
    }

    document.getElementById("form:Y").setAttribute("value","0");
    document.getElementById("form:Y").value=0;

      function Validate(min,max,Id,p,IdMes)
      {

        var Yinput = document.getElementById(Id);
        var Ymes = document.getElementById(IdMes);
        var fail = "";
        console.log(Yinput.value);
        var Y = Yinput.value.replace(",",".");
        console.log(Y);
        Y = Number(Y);
        console.log(Y + " " +min + " " +max+ " " +Boolean(Y >= min) + " " + Boolean(Y <= max) + " " + !isNaN(Number(Y)) + " " + Y.length);
        console.log(Y + " " + Boolean(Y <= min) + " " + Boolean(Y >= max) + " " + isNaN(Number(Y)) + " " + Y.length);
        f = Boolean(Y < min || Y > max || isNaN(Number(Y)) || Y == "" );
        console.log(f);
        if (f) {
            Ymes.textContent = "Неверное значение " + p;
            X.forEach(function (item,i) {
                item.removeAttribute("onclick");
                item.removeAttribute('href');

            });

        } else {
            Ymes.textContent = "";
            X.forEach(function (item,i) {
                item.setAttribute("onclick",XClick[i]);
                item.setAttribute('href',XHref[i]);
            });
        }

    }


    document.getElementById("form:R").addEventListener("keyup",function(){console.log();Validate(1,4,"form:R","R","form:Rmes")});
    document.getElementById("form:Y").addEventListener("keyup",function(){Validate(-5,5,"form:Y","Y","form:Ymes")});
});



