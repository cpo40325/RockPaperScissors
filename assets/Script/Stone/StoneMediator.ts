import KYPureMediator from "../KYCreatorSDK/DesignPatterns/KYPrueMVC/Mediator/KYPureMediator";
import KYPureNotification from "../KYCreatorSDK/DesignPatterns/KYPrueMVC/Observer/KYPureNotification";
import CommandMap from "../Map/CommandMap";
import TypeMap from "../Map/TypeMap";
import MainFacade from "../ＭainFacade";
import Stone from "./Stone";

const { ccclass, property } = cc._decorator;

@ccclass
export default class StoneMediator extends KYPureMediator {



    static NAME = 'StoneMediator'
    canClick: boolean = true;

    constructor(viewComponent: any) {
        super(StoneMediator.NAME, viewComponent);
    }


    listNotificationInterests(): string[] {
        return [CommandMap.RESTART, CommandMap.THREW];
    }


    handleNotification(notificantion: KYPureNotification) {

        switch (notificantion.getName()) {
            case CommandMap.RESTART:
                this.updateClickSwitch(true);
                break;
            case CommandMap.THREW:
                this.updateClickSwitch(false);
                break;
        }


    }
    onRegister() {
        this.getComponent().node.on('click', this.onClick, this);
    }

    onClick() {
        if (this.canClick) {
            this.sendNotification(CommandMap.THREW, TypeMap.TYPE_STONE);
            this.canClick = false;
        }

    }
    updateClickSwitch(b: boolean) {
        this.canClick = b;
    }
    getComponent(): Stone {
        return super.getComponent();
    }
}
