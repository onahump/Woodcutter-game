
var STATE_GAME_NONE                 = 0;
var STATE_GAME_LOADING              = 1;
var STATE_GAME_PLAYING              = 2;
var STATE_GAME_GAME_OVER            = 3;
var STATE_GAME_WIN                  = 4;

var stateGame = STATE_GAME_NONE;

GamePlayManager = {
    init: function(){
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL; //Haciendo las dimensiones de nuestro juego responsivas
        game.scale.pageAlignHorizontally = true; // Alineando horizontalmente nuestro juego para poderlo centrar
        game.scale.pageAlignVertically = true; //  Alineando verticalmente nuestro juego para poderlo centrar

    },
    preload: function(){ //Cargue nuestras imagenes
        stateGame = STATE_GAME_LOADING;

        game.load.image('background', 'assets/img/background.png');
        game.load.image('wood_cutter', 'assets/img/man_stand.png');
        game.load.spritesheet('play_button', 'assets/img/buttonPlay.png', 65, 65, 2);
    },
    create: function(){
        game.add.sprite(0,0, 'background');
        this.wood_cutter = game.add.sprite(280, 460, 'wood_cutter'); // creando la instancia de nuestro objeto leñador y en donde se encontrar ubicado
        this.wood_cutter.anchor.setTo(0.5, 1); //Definiendo el centro de nuestro objeto (0.5 en X  y 1 en Y)
        this.buttonPlay = game.add.button(game.width/2, game.height/2, 'play_button', this.startGame, this, 1,0,1,0); //new Button(posicion x , posicion x, llave , funcion a llamar , callback Context GAMEPlayManager (this), imagen antes de pasar el raton, imagen al pasar el raton, imagen a cargar antes de dar click, imagen al cagar al dar click)
        this.buttonPlay.anchor.setTo(0.5); // Definiendo el centro del boton
    },
    startGame:function() {
        stateGame = STATE_GAME_LOADING;

        console.log("Start");
    },
    update: function(){
        switch(stateGame){
            case STATE_GAME_NONE:

                break;

            case STATE_GAME_LOADING:

                break;

            case STATE_GAME_PLAYING:
                
                break;

            case STATE_GAME_GAME_OVER:

                break;

            case STATE_GAME_WIN:

                break;
        }
    }
}

var game =  new Phaser.Game(320, 480, Phaser.CANVAS);

game.state.add("gameplay", GamePlayManager);
game.state.start("gameplay");