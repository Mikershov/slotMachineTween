var config = {
    renderer: Phaser.AUTO,
    width: settings.worldWidth,
    height: settings.worldHeight,
    parent: "gameBlock",
    scaleMode: Phaser.ScaleManager.SHOW_ALL,
    state: {
        preload: preload,
        create: create,
        update: update
    }
}

var game = new Phaser.Game(config);

//тут будут барабаны
var reels = [];
