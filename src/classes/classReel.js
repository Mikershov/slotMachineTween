/*
Класс барабан.
Конструктор формирует начальное положение барабана из переданных символов.
Метод dropSymbols начинает анимацию сброса символов и возвращает массив с
информацией по символам и анимациям.
Метод setupSymbol меняет картинку на заданную и "выкатывает" символ на заданное положение.
Метод spin связывает два предыдущих метода и берет новые символы.
*/

//Конструктор
function Reel(symbolsArray, x) {
    var self = this;
    this.ySpacer = settings.symHeight + settings.symSpace;
    this.symbols = {};

    symbolsArray.forEach(function(symbol, index) {
        self.symbols[symbol] = new Symbol(symbol, x, self.ySpacer * index);
    });
}

//сброс символов
Reel.prototype.dropSymbols = function (indexReel) {
    var tweensData = [];
    var delayTween = indexReel*100;
    var indexSym = 0;
    for (symbol in this.symbols) {
        var y = settings.worldHeight + (this.ySpacer * indexSym);
        var tween = game.add.tween(this.symbols[symbol].img).to({y: y}, 700, Phaser.Easing.Quartic.In, true, delayTween);
        tweensData.push([tween, symbol, indexSym]);
        indexSym++;
        settings.spiningCount++;
    }

    return tweensData;
};

//построение символов
Reel.prototype.setupSymbol = function (syms, tweenData) {
    this.symbols[tweenData[1]].changeImg(syms[tweenData[2]]);
    this.symbols[tweenData[1]].img.y = -this.ySpacer;
    var y = this.ySpacer * tweenData[2];
    var tween = game.add.tween(this.symbols[tweenData[1]].img).to({y: y}, 1000, Phaser.Easing.Elastic.Out, true);
    tween.onComplete.add(function() {
        settings.spiningCount--;
    });
};

//связывание сброса и построения - "вращение"
Reel.prototype.spin = function (syms, indexReel) {
    var self = this;
    tweensData = Reel.prototype.dropSymbols.call(this, indexReel);
    tweensData.forEach(function(tweenData) {
        tweenData[0].onComplete.add(function() {
            return Reel.prototype.setupSymbol.call(self, syms, tweenData);
        }, self);
    });
};
