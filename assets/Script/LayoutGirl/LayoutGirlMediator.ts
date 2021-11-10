import KYPureMediator from "../KYCreatorSDK/DesignPatterns/KYPrueMVC/Mediator/KYPureMediator";
import KYPureNotification from "../KYCreatorSDK/DesignPatterns/KYPrueMVC/Observer/KYPureNotification";
import NotificationMap from "../Map/NotificationMap";
import LayoutGirl from "./LayoutGirl";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LayoutGirlMediator extends KYPureMediator {

    static NAME = 'LayoutGirlMediator'

    constructor(viewComponent: any) {
        super(LayoutGirlMediator.NAME, viewComponent);
    }


    listNotificationInterests(): string[] {
        return [NotificationMap.GIRL_SCORE];
    }




    handleNotification(notificantion: KYPureNotification) {


        switch (notificantion.getName()) {
            case NotificationMap.GIRL_SCORE:


            this.addView();

            break



        }
    }
    addView() {
        console.log('addView');
        
        // var node = new cc.Node();
        // var btn = node.addComponent(cc.Sprite);

        // btn.string = "123";
        // btn.fontSize = 20;

        // node.width = 100;
      
        // node.height = 100;

        var node = cc.instantiate(this.getComponent().scorePrefab);
        this.getComponent().node.addChild(node);
        
    }


    getComponent(): LayoutGirl {
        return super.getComponent();
    }
}
