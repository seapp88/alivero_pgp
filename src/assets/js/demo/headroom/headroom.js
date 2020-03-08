// Headroom

if($('.headroom')[0]) {
    var headroom  = new Headroom(document.querySelector("#headroom-header"), {
        offset: 50,
        tolerance : {
            up : 30,
            down : 0
        },
    });
    headroom.init();
}
