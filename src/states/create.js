function create() {
    var gameBg = game.add.image(0, 0, "bg");
    var widthSpace = settings.symWidth+settings.symSpace;

    //символы
    var syms = ["str", "lem", "wat", "che", "app", "ras"];

    //создаем барабаны
    for (var i = 0; i <= settings.reelsCount-1; i++) {
        reels[i] = new Reel(shuffle(syms), widthSpace*i);
    }

    //кнопка
    spinBtn = game.add.image(925, 175, "spinBtn");
    spinBtn.inputEnabled = true;
    spinBtn.input.useHandCursor = true;
    spinBtn.events.onInputDown.add(function() {
        if (settings.spiningCount == 0) {
            reels.forEach(function(reel, index) {
                reel.spin(shuffle(syms), index);
            });
        }
    }, this);
}
