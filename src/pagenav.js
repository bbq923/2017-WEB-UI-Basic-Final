function PageNavigation() {
    this._curPage = $(".selected");
    this._pageIdx = $(".selected").find("li")[0].textContent;
    this._leftArrow = $("#one-left");
    this._rightArrow = $("#one-right");
    this.ee = new EventEmitter();
    this.init();
}

PageNavigation.prototype.init = function() {
    $(".page-nav a.page-num li").on("click", this.click.bind(this));
    $("#one-right").on("click", this.moveRight.bind(this));
    $("#one-left").on("click", this.moveLeft.bind(this));
}

PageNavigation.prototype.click = function(e) {
    this._curPage.removeClass("selected");
    this._curPage = $(e.target).parent();
    this._curPage.addClass("selected");
    this._pageIdx = this._curPage.find("li")[0].textContent;

    this.disableArrow();

    this.ee.emit("move", {
        index: (this._pageIdx - 1) * 3,
        max: 3
    }, this.getIndex(), 3);
}

PageNavigation.prototype.getIndex = function() {
    return (this._pageIdx - 1) * 3;
}

PageNavigation.prototype.moveRight = function(e) {
    if(!$("#one-right").hasClass("disabled")) {
        this.click({
            target: $(".selected").next().find("li")[0]
        });
    }
}

PageNavigation.prototype.moveLeft = function(e) {
    if(!$("#one-left").hasClass("disabled")) {
        this.click({
            target: $(".selected").prev().find("li")[0]
        });
    }
}

PageNavigation.prototype.disableArrow = function() {
    if (!this._curPage.next().hasClass("page-num")) {
        this._rightArrow.addClass("disabled");
    } else {
        this._rightArrow.removeClass("disabled");
    }

    if (!this._curPage.prev().hasClass("page-num")) {
        this._leftArrow.addClass("disabled");
    } else {
        this._leftArrow.removeClass("disabled");
    }
}

PageNavigation.prototype.on = function(event, handler) {
    this.ee.on(event, handler);
}