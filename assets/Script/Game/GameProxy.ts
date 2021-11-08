import KYPrueProxy from "../KYCreatorSDK/DesignPatterns/KYPrueMVC/Proxy/KYPureProxy";
import NotificationMap from "../Map/NotificationMap";
import TypeMap from "../Map/TypeMap";


const { ccclass, property } = cc._decorator;

@ccclass
export default class GameProxy extends KYPrueProxy {
    static Name = 'GameProxy';


    static WIN :number = 3;

    isGameOver = false;

    girl_score = 0;

    boy_score = 0;

    public constructor() {

        super(GameProxy.NAME, null);
    }


    computerRandomThrew(): number {
        return Math.floor(Math.random() * 3);
    }



    getResult(player, computer) {


        switch (player) {

            case TypeMap.TYPE_PAPER:

                switch (computer) {
                    case TypeMap.TYPE_PAPER:
                        this.tie();
                        break;
                    case TypeMap.TYPE_SISSORS:
                        this.boyScore();
                        break;
                    case TypeMap.TYPE_STONE:
                        this.girlScore();
                        break;
                }

                break;
            case TypeMap.TYPE_SISSORS:

                switch (computer) {
                    case TypeMap.TYPE_PAPER:
                        this.girlScore();
                        break;
                    case TypeMap.TYPE_SISSORS:
                        this.tie();
                        break;
                    case TypeMap.TYPE_STONE:
                        this.boyScore();
                        break;
                }

                break;

            case TypeMap.TYPE_STONE:

                switch (computer) {
                    case TypeMap.TYPE_PAPER:
                        this.boyScore();
                        break;
                    case TypeMap.TYPE_SISSORS:
                        this.girlScore();
                        break;
                    case TypeMap.TYPE_STONE:
                        this.tie();
                        break;
                }
                break;



        }



    }
    tie() {
        console.log('tie');
        this.sendNotification(NotificationMap.TIE);
    }

    playerThrew(playerThrew) {

        if(this.isGameOver){
            return;
        }
        this.getResult(playerThrew, this.computerRandomThrew());
    }
f
    girlScore() {
        console.log('girlScore');
        this.girl_score++;
        if (this.girl_score == GameProxy.WIN) {
            this.girlWin();
            this.isGameOver = true;
        }
        this.sendNotification(NotificationMap.GIRL_SCORE);
        
    }
    boyScore() {
        console.log('boyScore');
        this.boy_score++;
        if (this.boy_score == GameProxy.WIN) {
            this.boyWin();
            this.isGameOver = true;
        }
        this.sendNotification(NotificationMap.BOY_SCORE);

    }



    boyWin() {
        console.log('boyWin');

        this.sendNotification(NotificationMap.BOY_WIN);
    }
    girlWin() {
        console.log('girlWin');

        this.sendNotification(NotificationMap.GIRL_WIN);
    }
}
