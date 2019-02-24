/*
Класс Символ.
Адаптирует картинку для класса Барабан.
Содержит метод по смене картинки символа.
Может содержать дополнительные методы, например для получения
состояния (виден ли, в каком ряду и так далее)
*/

//Конструктор
function Symbol(imgName, x, y) {
    this.img = game.add.image(x, y, imgName);
    this.img.width = settings.symWidth;
    this.img.height = settings.symHeight;
}

//смена символа
Symbol.prototype.changeImg = function (sym) {
    this.img.loadTexture(sym);
};
