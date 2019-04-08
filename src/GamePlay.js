
GamePlayManager = {
    init: function(){
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL; //Haciendo las dimensiones de nuestro juego responsivas
        game.scale.pageAlignHorizontally = true; // Alineando horizontalmente nuestro juego para poderlo centrar
        game.scale.pageAlignVertically = true; //  Alineando verticalmente nuestro juego para poderlo centrar
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