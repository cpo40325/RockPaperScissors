import KYPureMediator from "../KYCreatorSDK/DesignPatterns/KYPrueMVC/Mediator/KYPureMediator";
import KYPureNotification from "../KYCreatorSDK/DesignPatterns/KYPrueMVC/Observer/KYPureNotification";
import CommandMap from "../Map/CommandMap";
import TypeMap from "../Map/TypeMap";
import Scissors from "./Scissors";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ScissorsMediator extends KYPureMediator {

    static NAME = 'ScissorsMediator'
    canClick: boolean = true;

    constructor(viewComponent: any){
        super(ScissorsMediator.NAME, viewComponent);
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
            this.sendNotification(CommandMap.THREW, TypeMap.TYPE_SISSORS);
            this.canClick = false;
        }
    }

    updateClickSwitch(){
        this.canClick = true;
    }
    getComponent(): Scissors{
        return super.getComponent();
    }
}
