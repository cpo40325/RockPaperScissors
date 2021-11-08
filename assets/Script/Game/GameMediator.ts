// import KYPureMediator from "../KYCreatorSDK/DesignPatterns/KYPrueMVC/Mediator/KYPureMediator";
// import KYPureNotification from "../KYCreatorSDK/DesignPatterns/KYPrueMVC/Observer/KYPureNotification";
// import NotificationMap from "../Map/NotificationMap";
// import Game from "./Game";

// const { ccclass, property } = cc._decorator;

// @ccclass
// export default class GameMediator extends KYPureMediator {

//     static NAME = 'GameMediator'

//     constructor(viewComponent: any) {
//         super(GameMediator.NAME, viewComponent);
//     }


//     listNotificationInterests(): string[] {
//         return [NotificationMap.BOY_WIN, NotificationMap.GIRL_WIN];
//     }


//     handleNotification(notificantion: KYPureNotification) {

//         switch (notificantion.getName()) {
//             case NotificationMap.BOY_WIN:
//                 case NotificationMap.GIRL_WIN:

//                 this.gameOver();
//             break;
//         }
//     }
//     gameOver() {
//         console.log('gameOver');
        
//         cc.director.pause()
//     }


//     getComponent(): Game {
//         return super.getComponent();
//     }
// }
