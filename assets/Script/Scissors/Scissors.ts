import KYPureFacade from "../KYCreatorSDK/DesignPatterns/KYPrueMVC/Core/KYPureFacade";
import ScissorsMediator from "./ScissorsMediator";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Scissors extends cc.Component {

    start () {
        KYPureFacade.getInstance('MainFacade').registerMediator(new ScissorsMediator(this));
    }
}
