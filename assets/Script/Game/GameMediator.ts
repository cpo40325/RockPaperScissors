import KYPureMediator from "../KYCreatorSDK/DesignPatterns/KYPrueMVC/Mediator/KYPureMediator";
import KYPureNotification from "../KYCreatorSDK/DesignPatterns/KYPrueMVC/Observer/KYPureNotification";
import NotificationMap from "../Map/NotificationMap";
import TypeMap from "../Map/TypeMap";
import Game from "./Game";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameMediator extends KYPureMediator {

    static NAME = 'GameMediator'



    boyAnimation:cc.Animation;
    girlAnimation:cc.Animation;
    animSpeed = 0.5;
    delayTime = 1;

    constructor(viewComponent: any) {
        super(GameMediator.NAME, viewComponent);
        this.boyAnimation = this.getComponent().node.getChildByName('SpriteBoy').getComponent(cc.Animation);
        this.girlAnimation = this.getComponent().node.getChildByName('SpriteGirl').getComponent(cc.Animation);
        


        this.boyAnimation.on('finished',function(){



            console.log(this.boyAnimation.currentClip.name);

            let clip = this.boyAnimation.currentClip.name;
            if(clip.search('Win') != -1 || clip.search('Lose') != -1){
                

                this.asyncTest();
            }
            

        },this);
        
        this.animationRestar();



    }

    delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }

    async asyncTest() {
        
        await this.delay(1500);
        let stateBoy = this.boyAnimation.play('DefaultBoy');

        let stateGirl = this.girlAnimation.play('DefaultGirl');
        stateGirl.speed = this.animSpeed;
        stateBoy.speed = this.animSpeed;
        stateBoy.wrapMode = cc.WrapMode.Loop;
        stateGirl.wrapMode = cc.WrapMode.Loop;

  
    }

    animationRestar() {
        
        let stateBoy = this.boyAnimation.play('DefaultBoy');

        let stateGirl = this.girlAnimation.play('DefaultGirl');
        stateGirl.speed = this.animSpeed;
        stateBoy.speed = this.animSpeed;
        stateBoy.wrapMode = cc.WrapMode.Loop;
        stateGirl.wrapMode = cc.WrapMode.Loop;

  
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

    resultAnimation(array: { [key: string]: number }) {


        console.log('player-' + array.player);
        console.log('computer-' + array.computer);
        console.log('result-' + array.result);


        this.updateList(array);

        this.playAnimation(0, this.girlClipList);
 
        this.playAnimation(1, this.boyClipList);

    }

    girlClipList: string[];
    boyClipList: string[];

    updateList(array: { [key: string]: number }){

    /**
     * 1出拳動畫
     * ２判斷輸贏動畫(加贏的記號)
     * ３被打的動畫
     * 
     * 
     */

        let girlList: string[] = [];
        
        let boyList: string[] = [];

        switch (array.player) {

            case TypeMap.TYPE_PAPER:
                girlList.push('GirlPaper');
                if(array.result == 1){
                    girlList.push('GirlPaperWin');
                    
                }
                break;

            case TypeMap.TYPE_SISSORS:
                girlList.push('GirlScissors');
                if(array.result == 1){
                    girlList.push('GirlScissorsWin');
                    
                }
                break;
            case TypeMap.TYPE_STONE:
                girlList.push('GirlStone');
                if(array.result == 1){
                    girlList.push('GirlStoneWin');
                    
                }
                break;
                

        }


        switch (array.computer) {

            case TypeMap.TYPE_PAPER:
                boyList.push('BoyPaper');
                if(array.result == -1){
                    boyList.push('BoyPaperWin');
                    
                }
                break;

            case TypeMap.TYPE_SISSORS:
                boyList.push('BoyScissors');
                if(array.result == -1){
                    boyList.push('BoyScissorsWin');
                    
                }
                break;
            case TypeMap.TYPE_STONE:
                boyList.push('BoyStone');
                if(array.result == -1){
                    boyList.push('BoyStoneWin');
                }
                break;

        }
        // if(array.result == 0){
        //     boyList.push('BoyNothing');
        //     girlList.push('GirlNothing');
        // }
        if(array.result == -1){
            girlList.push('GirlLoss');
            girlList.push('GirlLose'+ Math.ceil(Math.random()*3 ));
            
        }
        if(array.result == 1){
            boyList.push('BoyLoss');
            boyList.push('BoyLose'+ Math.ceil(Math.random()*3 ));
            
        }

        this.girlClipList = girlList;
        this.boyClipList = boyList;

    }

    getAction(who:number, action:string){

        
        const self = this;

        return cc.sequence(
            cc.callFunc(function () {

                let state;
                if (who == 0) {
                    state = self.girlAnimation.play(action);
                }else if (who == 1){
                    state = self.boyAnimation.play(action);
                }
                state.speed = self.animSpeed;
            })
            ,
            cc.delayTime(this.delayTime)
        );
    }

    playAnimation(who:number, actionList:string[]){

        let animation: cc.Animation;
        if(who == 0){
            animation = this.girlAnimation;
        }else if (who == 1){
            animation = this.boyAnimation;
        }
        let clipList:cc.FiniteTimeAction[] = []

        actionList.forEach(act => {
            clipList.push(this.getAction(who, act))
            
        });

        
        console.log(actionList);
        if(actionList.length > 1){
            animation.node.runAction(cc.sequence(clipList));
        }else{
            animation.node.runAction(clipList[0]);
            this.asyncTest();
        }

    }



    gameOver() {
        console.log('gameOver');

        cc.director.pause()
    }


    getComponent(): Game {
        return super.getComponent();
    }
}
