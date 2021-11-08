import KYPureMediator from "../KYCreatorSDK/DesignPatterns/KYPrueMVC/Mediator/KYPureMediator";
import KYPureNotification from "../KYCreatorSDK/DesignPatterns/KYPrueMVC/Observer/KYPureNotification";
import NotificationMap from "../Map/NotificationMap";
import LayoutBoy from "./LayoutBoy";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LayoutBoyMediator extends KYPureMediator {

    static NAME = 'LayoutBoyMediator'

    constructor(viewComponent: any) {
        super(LayoutBoyMediator.NAME, viewComponent);
    }


    listNotificationInterests(): string[] {
        return [NotificationMap.BOY_SCORE, NotificationMap.BOY_WIN];
    }


    handleNotification(notificantion: KYPureNotification) {

        switch (notificantion.getName()) {
            case NotificationMap.BOY_SCORE:
            this.addView();
            break
        }
    }
    addView() {
        console.log('addView');
        var node = cc.instantiate(this.getComponent().scorePrefab);
        this.getComponent().node.addChild(node);
    }


    getComponent(): LayoutBoy {
        return super.getComponent();
    }
}
