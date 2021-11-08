import KYPureMediator from "../KYCreatorSDK/DesignPatterns/KYPrueMVC/Mediator/KYPureMediator";
import KYPureNotification from "../KYCreatorSDK/DesignPatterns/KYPrueMVC/Observer/KYPureNotification";
import CommandMap from "../Map/CommandMap";
import TypeMap from "../Map/TypeMap";
import Paper from "./Paper";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PaperMediator extends KYPureMediator {

    static NAME = 'PaperMediator'

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
        this.sendNotification(CommandMap.THREW, TypeMap.TYPE_PAPER);
    }


    getComponent(): Paper{
        return super.getComponent();
    }
}
