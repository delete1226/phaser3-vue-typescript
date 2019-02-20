
import Map from '../objects/Map'
import Player from '../objects/Player'
import EnemyManager from '../objects/EnemyManager'
import Enemy from '../objects/Enemy'
// import Bullet from '../objects/Bullet'
class GameScene extends Phaser.Scene {

  private isGameOver:any='';
  private map: any='';
  private map2: any='';
  private player: any='';
  private enemy: any='';
  // private bullet: any='';
  //构造函数
  constructor() {
    super({ key: "GameScene" });
    this.isGameOver = true;
  }

  //loading
  preload(): void {
    this.load.image("map", require("@/game/res/map.jpg"));
    this.load.image("player", require("@/game/res/player.png"));
    this.load.image("bullet", require("@/game/res/playerbullet.png"));
    this.load.image("enemy", require("@/game/res/enemy.png"))
    this.load.image("enemybullet", require("@/game/res/enemybullet.png"))
  }

  //create
  create(): void {
    this.map = new Map(this,0,0,'map'); 
    this.map2 = new Map(this,0,560,'map'); 
    this.player = new Player(this,180,500,'player');
    this.touch()
    // this.enemy = new Enemy(this, 180,100,'enemy')
    // this.bullet = new Bullet(this,180,100, 'bullet')
  }

  //游戏循环
  update(): void {
    this.map.move();
    this.map2.move();
    this.player.shot();
    EnemyManager.enemyMove()
    EnemyManager.addEnemy(this);
    // this.player.shot()
    for(let i=0; i<this.player.shotArr.length; i++){
      let bullet = this.player.shotArr[i];
      if (!bullet.life){
        this.player.shotArr.splice(i,1)
        bullet.destroy()
      } else {
        bullet.move();
      }
    }
    for(let i=0; i<this.player.shotArr.length; i++){
      let bullet = this.player.shotArr[i];
      for(let j=0; j<EnemyManager.enemyArr.length; j++){
        let enemy = EnemyManager.enemyArr[j]
        if (bullet.collision(enemy)){
          enemy.life = false;
        }
      }
    }
    // enemy
    // this.enemy.shot();
    EnemyManager.enemyBulletMove()
    // console.log(this.children.length)
    
  }
  touch(): void{
    this.input.on('pointermove',(event:any)=>{
      this.player.x = event.position.x
      this.player.y = event.position.y
    })
  }
}

export default GameScene;
