import KYPureMediator from "../KYCreatorSDK/DesignPatterns/KYPrueMVC/Mediator/KYPureMediator";
import KYPureNotification from "../KYCreatorSDK/DesignPatterns/KYPrueMVC/Observer/KYPureNotification";
import CommandMap from "../Map/CommandMap";
import TypeMap from "../Map/TypeMap";
import Paper from "./Paper";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PaperMediator extends KYPureMediator {

    static NAME = 'PaperMediator'



    canClick: boolean = true;

    constructor(viewComponent: any){
        super(PaperMediator.NAME, viewComponent);
    }


    listNotificationInterests(): string[]{
        return [];
    }


    handleNotification(notificantion:KYPureNotification){

    }


    onRegister(){
        this.getComponent().node.on('click', this.onClick, this);
    }

    onClick(){
        if(this.canClick){
            this.sendNotification(CommandMap.THREW, TypeMap.TYPE_PAPER);
            this.canClick = false;
        }
    }

    updateClickSwitch(){
        this.canClick = true;
    }


    getComponent(): Paper{
        return super.getComponent();
    }
}
