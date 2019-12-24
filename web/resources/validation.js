$(document).ready(function() {
    var f = false;
    var X = [];
    var XClick = [];
    var XHref = [];
    X = document.querySelectorAll("a");

    var Validate;
    var X1 = document.getElementById("form:x1");
    var onclick = X1.getAttribute("onclick");
    var href = X1.getAttribute("href");
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
            console.log("AddActive")
            if (ActiveBool == false) {
                document.getElementById(id).classList.add("active");
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
        console.log("RemoveActive")
        document.getElementById(id).classList.remove("active");
    }

    function AddHoverClass(id) {
        console.log("AddHover")
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
        console.log("RemoveHover")
        document.getElementById(id).classList.remove("hover");
    }

    document.getElementById("form:Y").setAttribute("value","0");
    document.getElementById("form:R").setAttribute("value","1 ");
    Validate = function (min,max,Id,p,IdMes) {

        var Yinput = document.getElementById(Id);
        var Ymes = document.getElementById(IdMes);
        var fail = "";
        console.log(Yinput.value);
        var Y = Yinput.value.replace(",",".");
        console.log(Y);
        Y = Number(Y);
        console.log(Y + " " + Boolean(Y >= min) + " " + Boolean(Y <= max) + " " + !isNaN(Number(Y)) + " " + Y.length);
        console.log(Y + " " + Boolean(Y <= min) + " " + Boolean(Y >= max) + " " + isNaN(Number(Y)) + " " + Y.length);
        f = Boolean(Y < min || Y > max || isNaN(Number(Y)) || Y == "" || Y.length > 2);
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
});



