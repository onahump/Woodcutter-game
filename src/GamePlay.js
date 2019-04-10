
var STATE_GAME_NONE                 = 0;
var STATE_GAME_LOADING              = 1;
var STATE_GAME_PLAYING              = 2;
var STATE_GAME_GAME_OVER            = 3;
var STATE_GAME_WIN                  = 4;

var stateGame = STATE_GAME_NONE; //estado inicial
var distanceTrunks = 70; // definiendo la distancia entre troncos

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
        game.load.image('trunk', 'assets/img/trunk.png');
        game.load.spritesheet('play_button', 'assets/img/buttonPlay.png', 65, 65, 2);
        game.load.image('tomb', 'assets/img/tomb.png');

        game.load.audio('loopMusic','/assets/sounds/musicLoop.mp3');
        game.load.audio('sfxHit', 'assets/sounds/sfxHit.mp3');
        game.load.audio('sfxGameOver', 'assets/sounds/sfxGameOver.mp3');
    },
    create: function(){
        this.sequence = []; //
        game.add.sprite(0,0, 'background');
        this.wood_cutter = game.add.sprite(80, 465, 'wood_cutter'); // creando la instancia de nuestro objeto leñador y en donde se encontrar ubicado
        this.wood_cutter.anchor.setTo(0.5, 1); //Definiendo el centro de nuestro objeto (0.5 en X  y 1 en Y)
        this.buttonPlay = game.add.button(game.width/2, game.height/2, 'play_button', this.startGame, this, 1,0,1,0); //new Button(posicion x , posicion x, llave , funcion a llamar , callback Context GAMEPlayManager (this), imagen antes de pasar el raton, imagen al pasar el raton, imagen a cargar antes de dar click, imagen al cagar al dar click)
        this.buttonPlay.anchor.setTo(0.5); // Definiendo el centro del boton
        this.tomb = game.add.sprite(80, 465, 'tomb');
        this.tomb.anchor.setTo(0.5, 1);
        this.tomb.visible = false;

        this.trunks = game.add.group(); // Creando un grupo

        for(var i =0; i <30; i++){ //Iterando para obtener 30 troncos
            var trunk = this.trunks.create(0,0, 'trunk');
            trunk.anchor.setTo(0, 0.5);
            trunk.kill(); //eliminando los troncos para que despues esten disponibles
        }


        var style = {
            font: 'bold 30pt Arial',
            fill: '#FFFFFF',
            align: 'center',
        }

        this.currentScore = 0
        this.textField = game.add.text(game.width/2, 40, this.currentScore.toString(), style);
        this.textField.anchor.setTo(0.5);

        var pixel = game.add.bitmapData(1,1);   //Creando nuestro pixel rojo
        pixel.ctx.fillStyle = '#A0221E';
        pixel.ctx.fillRect(0,0,1,1);

        this.bar = game.add.sprite(0,0, pixel); // Creando la barra con base en nuestro pixel rojo
        this.bar.anchor.setTo(0);
        this.bar.width = game.width;
        this.bar.height = 10;

        this.loopMusic = game.add.audio('loopMusic');
        this.sfxHit = game.add.audio('sfxHit');
        this.sfxGameOver = game.add.audio('sfxGameOver');

    },
    refreshBar:function(value){
        var newWidth = this.bar.width + value;
        if(newWidth > game.width){
            newWidth = game.width;
        }
        if(newWidth <=0){
            newWidth = 0;
            this.gameOver();
        }
        this.bar.width = newWidth;
    },
    startGame:function() {
        stateGame = STATE_GAME_PLAYING; // Configurando el estado del juego en  playing
        this.buttonPlay.visible = false; //ocultando el boton de play cuando se inicia el juego
        this.loopMusic.loop = true;
        this.loopMusic.play();
        this.bar.width = game.width;

        for(var i=0; i<this.sequence.length; i++){
            if (this.sequence[i] != null) {
                this.sequence[i].kill()
            }
        }
        this.currentScore = 0;
        this.textField.text = this.currentScore.toString();

        this.sequence = []; //
        this.sequence.push(null);
        this.sequence.push(null);
        this.sequence.push(null);

        this.wood_cutter.visible = true;
        this.tomb.visible = false;

        for(var i=0; i<10; i++){
            this.addTrunks();
        }
        this.printSequence();
    },
    incrementScore: function(){
        this.currentScore += 100;
        this.textField.text = this.currentScore.toString();
    },
    hitMan:function(direction){
        this.sfxHit.play();
        for (var i = 0; i < this.sequence.length; i++) {
           if (this.sequence[i] != null) {
               this.sequence[i].y += distanceTrunks;
           }
        }

        var firstTrunk = this.sequence.shift();
        if (firstTrunk != null) {
            firstTrunk.kill();
        }
        this.addTrunks();

        var checkTrunk = this.sequence[0];
        if(checkTrunk != null && checkTrunk.direction == direction){
            this.gameOver();
        }else{
            this.incrementScore();
        }

        this.printSequence();
    },
    gameOver:function(){
        stateGame = STATE_GAME_GAME_OVER;

        this.loopMusic.stop();
        this.sfxGameOver.play();
        this.wood_cutter.visible = false;
        this.tomb.visible =true;
        this.tomb.x = this.wood_cutter.x;
        this.buttonPlay.visible = true;

    },
    addTrunks:function(){
        this.refreshBar(6);

        var number = game.rnd.integerInRange(-1,1); //escogiendo un numero al azar entre -1 y 1
        if (number ==1) {
            var trunk = this.trunks.getFirstDead(); //obteniendo un tronco
            trunk.direction = 1;    //si es 1 se ve a la derecha
            trunk.scale.setTo(1,1); //
            trunk.reset(game.world.centerX, 380 - (this.sequence.length) * distanceTrunks);
            this.sequence.push(trunk);
        }else if(number == -1){
            var trunk = this.trunks.getFirstDead();
            trunk.direction = -1;   //si es -1 se ve a la izquierda
            trunk.scale.setTo(-1,1);
            trunk.reset(game.world.centerX, 380 - (this.sequence.length) * distanceTrunks);
            this.sequence.push(trunk);
        }else{
            this.sequence.push(null); //no envia ningun tronco
        }
    },
    printSequence: function(){
        var stringSequence = "";
        for(var i=0; i<this.sequence.length; i++){
            if (this.sequence[i]==null) {
                stringSequence += "0,";
            }else{
                stringSequence += this.sequence[i].direction + ","
            }
        }
        console.log(stringSequence);
    },
    update: function(){
        switch(stateGame){ //Maquina de estados
            case STATE_GAME_NONE:

                break;

            case STATE_GAME_LOADING:

                break;

            case STATE_GAME_PLAYING:
                this.refreshBar(-0.5);
                if (this.cursors.left.isDown && this.pressEnable) { // Verificando si el boton izquierdo es presionado
                    this.pressEnable = false;
                    this.wood_cutter.x = 80;
                    this.wood_cutter.scale.setTo(1,1)
                    this.wood_cutter.loadTexture('wood_cutter_hit'); //Cambiando la textura de nuestro leñador
                    this.hitMan(-1);
                }
                if (this.cursors.right.isDown && this.pressEnable) { //Verificando si el boton izquierdo es presionado
                    this.pressEnable = false;
                    this.wood_cutter.x = 240;
                    this.wood_cutter.scale.setTo(-1,1)
                    this.wood_cutter.loadTexture('wood_cutter_hit');  //Cambiando la textura de nuestro leñador
                    this.hitMan(1);
                }
                if (this.cursors.left.isUp && this.cursors.right.isUp) { //Si ambos botones estan arriba lo vuelve verdadero de nuevo
                    this.pressEnable = true;
                    this.wood_cutter.loadTexture('wood_cutter'); //Cambiando la textura de nuestro leñador
                }
                break;

            case STATE_GAME_GAME_OVER:
                    console.log("Game Over")
                break;

            case STATE_GAME_WIN:

                break;
        }
    }
}

var game =  new Phaser.Game(320, 480, Phaser.AUTO);

game.state.add("gameplay", GamePlayManager);
game.state.start("gameplay");