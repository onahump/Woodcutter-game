
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
        this.wood_cutter = game.add.sprite(game.world.centerX , game.world.centerY, 'wood_cutter'); // creando la instancia de nuestro objeto leñador
        this.wood_cutter.anchor.setTo(0.5, 1); //Definiendo el centro de nuestro objeto (0.5 en X  y 1 en Y)
        this.wood_cutter.scale.setTo(1); //Escalando nuestro objeto,  si queremos invertirlo solamente debemos poner las coordenadas en numeros negativos -1 , -1
        this.wood_cutter.angle = 90; //rotando a nuesto leñador
        this.wood_cutter.alpha = 0.5; //Cambiando la opacidad de nuestro objeto
    },
    update: function(){
        console.log("update")
    }
}

var game =  new Phaser.Game(320, 480, Phaser.CANVAS);

game.state.add("gameplay", GamePlayManager);
game.state.start("gameplay");