import KYPureMediator from "../KYCreatorSDK/DesignPatterns/KYPrueMVC/Mediator/KYPureMediator";
import KYPureNotification from "../KYCreatorSDK/DesignPatterns/KYPrueMVC/Observer/KYPureNotification";
import NotificationMap from "../Map/NotificationMap";
import TypeMap from "../Map/TypeMap";
import Game from "./Game";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameMediator extends KYPureMediator {

    static NAME = 'GameMediator'



    boyAnimation: cc.Animation = null;

    constructor(viewComponent: any) {
        super(GameMediator.NAME, viewComponent);




    }

    listNotificationInterests(): string[] {
        return [NotificationMap.THREW_RESULT];
    }


    handleNotification(notificantion: KYPureNotification) {

        switch (notificantion.getName()) {
            case NotificationMap.THREW_RESULT:

                this.resultAnimation(notificantion.getBody());

                break;
        }
    }

    animSpeed = 0.25;
    resultAnimation(array: { [key: string]: number }) {


        console.log('player-' + array.player);
        console.log('computer-' + array.computer);
        console.log('result-' + array.result);

     
        let boyAnimation = this.getComponent().node.getChildByName('SpriteBoy').getComponent(cc.Animation);


        boyAnimation.once('stop',()=>{

            if(array.result == 1){
                boyAnimation.play('BoyLose'+ Math.ceil(Math.random()*3 )).speed = this.animSpeed;
            }else if(array.result == -1){
                boyAnimation.play('BoyWin').speed = this.animSpeed;
            }
        })

        switch (array.computer) {

            case TypeMap.TYPE_PAPER:
                boyAnimation.play('BoyPaper').speed = this.animSpeed;

                break;

            case TypeMap.TYPE_SISSORS:
                boyAnimation.play('BoyScissors').speed = this.animSpeed;

                break;
            case TypeMap.TYPE_STONE:
                boyAnimation.play('BoyStone').speed = this.animSpeed;

                break;

        }

        

        // a.play('DefaultBoy').speed =0.3 ;

        // a.once('stop', ()=>{

        //     a.play('BoyWin').speed = 0.3;


        // }, this);


    }
    gameOver() {
        console.log('gameOver');

        cc.director.pause()
    }


    getComponent(): Game {
        return super.getComponent();
    }
}
