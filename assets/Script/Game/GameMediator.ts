import KYPureFacade from "../KYCreatorSDK/DesignPatterns/KYPrueMVC/Core/KYPureFacade";
import KYPureMediator from "../KYCreatorSDK/DesignPatterns/KYPrueMVC/Mediator/KYPureMediator";
import KYPureNotification from "../KYCreatorSDK/DesignPatterns/KYPrueMVC/Observer/KYPureNotification";
import CommandMap from "../Map/CommandMap";
import NotificationMap from "../Map/NotificationMap";
import TypeMap from "../Map/TypeMap";
import Game from "./Game";
import GameProxy from "./GameProxy";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameMediator extends KYPureMediator {

    static NAME = 'GameMediator'



    boyAnimation: cc.Animation;
    girlAnimation: cc.Animation;
    animSpeed = 0.5;
    delayTime = 1;

    constructor(viewComponent: any) {
        super(GameMediator.NAME, viewComponent);
        this.boyAnimation = this.getComponent().node.getChildByName('SpriteBoy').getComponent(cc.Animation);
        this.girlAnimation = this.getComponent().node.getChildByName('SpriteGirl').getComponent(cc.Animation);

        let stateBoy = this.boyAnimation.play('DefaultBoy');

        let stateGirl = this.girlAnimation.play('DefaultGirl');
        stateGirl.speed = this.animSpeed;
        stateBoy.speed = this.animSpeed;
        stateBoy.wrapMode = cc.WrapMode.Loop;
        stateGirl.wrapMode = cc.WrapMode.Loop;


        this.boyAnimation.on('finished', function () {



            console.log(this.boyAnimation.currentClip.name);

            let clip = this.boyAnimation.currentClip.name;
            if (clip.search('Win') != -1 || clip.search('Lose') != -1) {


                if (this.getProxy().isGameOver) {
                    this.gameOver();
                } else {
                    this.restartAnimation();
                }
            }


        }, this);





    }

    delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async restartAnimation() {

        await this.delay(1500);

        let spriteGirl = this.girlAnimation.getComponent(cc.Sprite);
        let spriteBoy = this.boyAnimation.getComponent(cc.Sprite);
        spriteGirl.node.setPosition(-260, -45);
        spriteBoy.node.setPosition(249, -45);

        let stateBoy = this.boyAnimation.play('DefaultBoy');

        let stateGirl = this.girlAnimation.play('DefaultGirl');
        stateGirl.speed = this.animSpeed;
        stateBoy.speed = this.animSpeed;
        stateBoy.wrapMode = cc.WrapMode.Loop;
        stateGirl.wrapMode = cc.WrapMode.Loop;
        this.sendNotification(CommandMap.RESTART);


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

    updateList(array: { [key: string]: number }) {

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
                if (array.result == 1) {
                    girlList.push('GirlPaperWin');

                }
                break;

            case TypeMap.TYPE_SISSORS:
                girlList.push('GirlScissors');
                if (array.result == 1) {
                    girlList.push('GirlScissorsWin');

                }
                break;
            case TypeMap.TYPE_STONE:
                girlList.push('GirlStone');
                if (array.result == 1) {
                    girlList.push('GirlStoneWin');

                }
                break;


        }


        switch (array.computer) {

            case TypeMap.TYPE_PAPER:
                boyList.push('BoyPaper');
                if (array.result == -1) {
                    boyList.push('BoyPaperWin');

                }
                break;

            case TypeMap.TYPE_SISSORS:
                boyList.push('BoyScissors');
                if (array.result == -1) {
                    boyList.push('BoyScissorsWin');

                }
                break;
            case TypeMap.TYPE_STONE:
                boyList.push('BoyStone');
                if (array.result == -1) {
                    boyList.push('BoyStoneWin');
                }
                break;

        }
        // if(array.result == 0){
        //     boyList.push('BoyNothing');
        //     girlList.push('GirlNothing');
        // }
        if (array.result == -1) {
            girlList.push('GirlLoss');
            girlList.push('GirlLose' + Math.ceil(Math.random() * 3));


        }
        if (array.result == 1) {
            boyList.push('BoyLoss');
            boyList.push('BoyLose' + Math.ceil(Math.random() * 3));

        }

        this.girlClipList = girlList;
        this.boyClipList = boyList;

    }

    getAction(who: number, action: string) {


        const self = this;

        return cc.sequence(
            cc.callFunc(function () {

                let state;
                if (who == 0) {
                    state = self.girlAnimation.play(action);
                    let sprite = self.girlAnimation.getComponent(cc.Sprite).node
                    /**
                     * 玩家預設位置sprite.setPosition(-260, -45);
                     * 
                     */
                    switch (action) {
                        case 'GirlWin':
                            sprite.setPosition(-254, -38);
                            break;
                        case 'GirlLoss':
                            sprite.setPosition(-238, -41);
                            break;
                        //水
                        case 'GirlLose1':
                            sprite.setPosition(-464, 60);
                            break;
                        //火
                        case 'GirlLose2':
                            sprite.setPosition(-168, 175);
                            break;
                        //冰
                        case 'GirlLose3':
                            sprite.setPosition(-441, 60);
                            break;
                        case 'GirlPaper':
                            sprite.setPosition(-211, -25);
                            break;
                        case 'GirlScissors':
                            sprite.setPosition(-217, -30);
                            break;
                        case 'GirlStone':
                            sprite.setPosition(-222, -35);
                            break;
                        case 'GirlPaperWin':
                            sprite.setPosition(-207, -39);
                            break;
                        case 'GirlScissorsWin':
                            sprite.setPosition(-214, -39);
                            break;
                        case 'GirlStoneWin':
                            sprite.setPosition(-217, -39);
                            break;
                        case 'GirlDefault':
                            sprite.setPosition(-260, -45);
                            break;
                        default:
                            sprite.setPosition(-260, -45);
                            break;

                    }



                } else if (who == 1) {
                    state = self.boyAnimation.play(action);
                    let sprite = self.boyAnimation.getComponent(cc.Sprite).node
                    /**
                     * 電腦預設位置sprite.setPosition(249, -45);
                     * 
                     */
                    switch (action) {
                        case 'BoyWin':
                            sprite.setPosition(224, -50);
                            break;
                        case 'BoyLoss':
                            sprite.setPosition(226, -35);
                            break;
                        //水
                        case 'BoyLose1':
                            sprite.setPosition(186, 2);
                            break;
                        //火
                        case 'BoyLose2':
                            sprite.setPosition(404, 30);
                            break;
                        //冰
                        case 'BoyLose3':
                            sprite.setPosition(375, 43);
                            break;
                        case 'BoyPaper':
                            sprite.setPosition(206, -32);
                            break;
                        case 'BoyScissors':
                            sprite.setPosition(202, -32);
                            break;
                        case 'BoyStone':
                            sprite.setPosition(208, -32);
                            break;
                        case 'BoyPaperWin':
                            sprite.setPosition(189, -50);
                            break;
                        case 'BoyScissorsWin':
                            sprite.setPosition(191, -50);
                            break;
                        case 'BoyStoneWin':
                            sprite.setPosition(198, -50);
                            break;
                        case 'BoyDefault':
                            sprite.setPosition(-260, -45);
                            break;
                        default:
                            sprite.setPosition(-249, -45);
                            break;

                    }
                }
                state.speed = self.animSpeed;
            })
            ,
            cc.delayTime(this.delayTime)
        );
    }

    playAnimation(who: number, actionList: string[]) {

        let animation: cc.Animation;
        if (who == 0) {
            animation = this.girlAnimation;
        } else if (who == 1) {
            animation = this.boyAnimation;
        }
        let clipList: cc.FiniteTimeAction[] = []

        actionList.forEach(act => {
            clipList.push(this.getAction(who, act))

        });


        console.log(actionList);
        if (actionList.length > 1) {
            animation.node.runAction(cc.sequence(clipList));
        } else {
            animation.node.runAction(clipList[0]);
            this.restartAnimation();
        }

    }




    getProxy(): GameProxy {

        return this.getFacade().retrieveProxy(GameProxy.NAME);
    }

    gameOver() {
        console.log('gameOver');

        if (this.getProxy().boy_score == GameProxy.WIN) {

            this.sendNotification(NotificationMap.BOY_WIN);
        } else if (this.getProxy().girl_score == GameProxy.WIN) {
            this.sendNotification(NotificationMap.GIRL_WIN);

        }


    }


    getComponent(): Game {
        return super.getComponent();
    }
}
