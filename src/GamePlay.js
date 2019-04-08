
var STATE_GAME_NONE                 = 0;
var STATE_GAME_LOADING              = 1;
var STATE_GAME_PLAYING              = 2;
var STATE_GAME_GAME_OVER            = 3;
var STATE_GAME_WIN                  = 4;

var stateGame = STATE_GAME_NONE; //estado inicial

GamePlayManager = {
    init: function(){
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL; //Haciendo las dimensiones de nuestro juego responsivas
        game.scale.pageAlignHorizontally = true; // Alineando horizontalmente nuestro juego para poderlo centrar
        game.scale.pageAlignVertically = true; //  Alineando verticalmente nuestro juego para poderlo centrar

        this.cursors = game.input.keyboard.createCursorKeys();
        this.pressEnable = true; // Bandera para cuando presionas botones

    },
    preload: function(){ //Cargue nuestras imagenes
        stateGame = STATE_GAME_LOADING;

        game.load.image('background', 'assets/img/background.png');
        game.load.image('wood_cutter', 'assets/img/man_stand.png');
        game.load.image('wood_cutter_hit', 'assets/img/man_hit.png');
        game.load.spritesheet('play_button', 'assets/img/buttonPlay.png', 65, 65, 2);
    },
    create: function(){
        game.add.sprite(0,0, 'background');
        this.wood_cutter = game.add.sprite(80, 465, 'wood_cutter'); // creando la instancia de nuestro objeto leñador y en donde se encontrar ubicado
        this.wood_cutter.anchor.setTo(0.5, 1); //Definiendo el centro de nuestro objeto (0.5 en X  y 1 en Y)
        this.buttonPlay = game.add.button(game.width/2, game.height/2, 'play_button', this.startGame, this, 1,0,1,0); //new Button(posicion x , posicion x, llave , funcion a llamar , callback Context GAMEPlayManager (this), imagen antes de pasar el raton, imagen al pasar el raton, imagen a cargar antes de dar click, imagen al cagar al dar click)
        this.buttonPlay.anchor.setTo(0.5); // Definiendo el centro del boton
    },
    startGame:function() {
        stateGame = STATE_GAME_PLAYING; // Configurando el estado del juego en  playing
        this.buttonPlay.visible = false; //ocultando el boton de play cuando se inicia el juego

        console.log("Start");
    },
    update: function(){
        switch(stateGame){ //Maquina de estados
            case STATE_GAME_NONE:

                break;

            case STATE_GAME_LOADING:

                break;

            case STATE_GAME_PLAYING:
                if (this.cursors.left.isDown && this.pressEnable) { // Verificando si el boton izquierdo es presionado
                    this.pressEnable = false;
                    this.wood_cutter.x = 80;
                    this.wood_cutter.scale.setTo(1,1)
                    this.wood_cutter.loadTexture('wood_cutter_hit');
                }
                if (this.cursors.right.isDown && this.pressEnable) { //Verificando si el boton izquierdo es presionado
                    this.pressEnable = false;
                    this.wood_cutter.x = 240;
                    this.wood_cutter.scale.setTo(-1,1)
                    this.wood_cutter.loadTexture('wood_cutter_hit');
                }
                if (this.cursors.left.isUp && this.cursors.right.isUp) { //Si ambos botones estan arriba lo vuelve verdadero de nuevo
                    this.pressEnable = true;
                    this.wood_cutter.loadTexture('wood_cutter');
                }
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