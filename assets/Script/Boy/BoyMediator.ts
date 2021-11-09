
import KYPureMediator from "../KYCreatorSDK/DesignPatterns/KYPrueMVC/Mediator/KYPureMediator";
import KYPureNotification from "../KYCreatorSDK/DesignPatterns/KYPrueMVC/Observer/KYPureNotification";
import NotificationMap from "../Map/NotificationMap";
import Boy from "./Boy";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BoyMediator extends KYPureMediator {


    static NAME = 'BoyMediator'
    animation: cc.Animation;
    animState: cc.AnimationState;

    constructor(viewComponent: any) {
        super(BoyMediator.NAME, viewComponent);
    }

    onRegister(){
        this.animation = this.getComponent().node.getComponent(cc.Animation);

        // this.animation.on('stop', this.onAnimStop, this);
        


    }


    // onAnimStop() {

    //     console.log(this.animState);
        
    //     if (this.animState.name === 'BoyWin') {
            
    //         console.log('aaaaa');
            
    //     }else{
    //         console.log('bbbbb');
    //         // this.animation.play('BoyWin');
    //     }
        

    // }

    listNotificationInterests(): string[] {
        return [NotificationMap.BOY_PAPER, NotificationMap.BOY_STONE, NotificationMap.BOY_SCISSORS, NotificationMap.BOY_WIN, NotificationMap.BOY_SCORE];
    }


    handleNotification(notificantion: KYPureNotification) {



        

        switch (notificantion.getName()) {

            case NotificationMap.BOY_PAPER:
                this.animState = this.animation.play('BoyPaper');
                break;
            case NotificationMap.BOY_SCISSORS:
                this.animState = this.animation.play('BoyScissors');
                break;
            case NotificationMap.BOY_STONE:
                this.animState = this.animation.play('BoyStone');
                break;
            case NotificationMap.BOY_SCORE:
                this.animState = this.animation.play('BoyWin');
                break;

        }
        this.animState.wrapMode = cc.WrapMode.Normal;



    }




    getComponent(): Boy {
        return super.getComponent();
    }
}
