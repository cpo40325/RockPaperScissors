import KYPrueProxy from "../KYCreatorSDK/DesignPatterns/KYPrueMVC/Proxy/KYPureProxy";
import NotificationMap from "../Map/NotificationMap";
import TypeMap from "../Map/TypeMap";


const { ccclass, property } = cc._decorator;

@ccclass
export default class GameProxy extends KYPrueProxy {
    static Name = 'GameProxy';


    static WIN: number = 3;

    isGameOver = false;

    girl_score = 0;

    boy_score = 0;

    public constructor() {

        super(GameProxy.NAME, null);
    }


    computerRandomThrew(): number {
        return Math.floor(Math.random() * 3);
    }



    compare(player, computer) {



        /**
         * 0平手
         * 1玩家贏
         * -1電腦贏
         */
        var result = 0;


        if (player == computer) {
            result = 0;
        } else {
            switch (player) {

                case TypeMap.TYPE_PAPER:

                    switch (computer) {
                        case TypeMap.TYPE_SISSORS:
                            result = -1;
                            break;
                        case TypeMap.TYPE_STONE:
                            result = 1;
                            break;
                    }
                    break;
                case TypeMap.TYPE_SISSORS:

                    switch (computer) {
                        case TypeMap.TYPE_PAPER:
                            result = 1;
                            break;
                        case TypeMap.TYPE_STONE:
                            result = -1;
                            break;
                    }
                    break;

                case TypeMap.TYPE_STONE:

                    switch (computer) {

                        case TypeMap.TYPE_PAPER:
                            result = -1;
                            break;
                        case TypeMap.TYPE_SISSORS:
                            result = 1;
                            break;
                    }
                    break;
            }
        }

        var array: { [key: string]: number } = {
            'player': player,
            'computer': computer,
            'result': result
        }




        if (result == 1) {
            this.girl_score++;
            console.log('girl score');
            this.sendNotification(NotificationMap.GIRL_SCORE);

        } else if (result == -1) {
            this.boy_score++;
            console.log('boy score');
            this.sendNotification(NotificationMap.BOY_SCORE);
        }


        this.sendNotification(NotificationMap.THREW_RESULT, array);

    }


    playerThrew(playerThrew) {

        if (this.isGameOver) {
            // return;
        }
        this.compare(playerThrew, this.computerRandomThrew());
    }

    // tie() {
    //     console.log('tie');
    //     this.sendNotification(NotificationMap.TIE);
    // }

    // girlScore() {
    //     console.log('girlScore');
    //     this.girl_score++;
    //     if (this.girl_score == GameProxy.WIN) {
    //         this.girlWin();
    //         this.isGameOver = true;
    //     }
    //     this.sendNotification(NotificationMap.GIRL_SCORE);

    // }
    // boyScore() {
    //     console.log('boyScore');
    //     this.boy_score++;
    //     if (this.boy_score == GameProxy.WIN) {
    //         this.boyWin();
    //         this.isGameOver = true;
    //     }
    //     this.sendNotification(NotificationMap.BOY_SCORE);

    // }



    // boyWin() {
    //     console.log('boyWin');

    //     this.sendNotification(NotificationMap.BOY_WIN);
    // }
    // girlWin() {
    //     console.log('girlWin');

    //     this.sendNotification(NotificationMap.GIRL_WIN);
    // }
}
