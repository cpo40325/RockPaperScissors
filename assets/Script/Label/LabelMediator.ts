import KYPureMediator from "../KYCreatorSDK/DesignPatterns/KYPrueMVC/Mediator/KYPureMediator";
import KYPureNotification from "../KYCreatorSDK/DesignPatterns/KYPrueMVC/Observer/KYPureNotification";
import CommandMap from "../Map/CommandMap";
import NotificationMap from "../Map/NotificationMap";
import Label from "./Label";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LabelMediator extends KYPureMediator {

    static NAME = 'LabelMediator'

    constructor(viewComponent: any) {
        super(LabelMediator.NAME, viewComponent);
    }


    listNotificationInterests(): string[] {
        return [NotificationMap.BOY_WIN, NotificationMap.GIRL_WIN];
    }


    handleNotification(notificantion: KYPureNotification) {

        switch (notificantion.getName()) {

            case NotificationMap.GIRL_WIN:
                this.getComponent().node.getComponent(cc.Label).string = '成功';
                break;
            case NotificationMap.BOY_WIN:
                this.getComponent().node.getComponent(cc.Label).string = '失敗';
                break



        }
    }




    getComponent(): Label {
        return super.getComponent();
    }
}
