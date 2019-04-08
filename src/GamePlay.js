
GamePlayManager = {
    init: function(){
        console.log("init")
    },
    preload: function(){ //Cargue nuestras imagenes
        game.load.image('background', 'assets/img/background.png');
        game.load.image('wood_cutter', 'assets/img/man_stand.png');
    },
    create: function(){
        game.add.sprite(0,0, 'background');
        game.add.sprite(50,50, 'wood_cutter');
    },
    update: function(){
        console.log("update")
    }
}

var game =  new Phaser.Game(320, 480, Phaser.CANVAS);

game.state.add("gameplay", GamePlayManager);
game.state.start("gameplay");