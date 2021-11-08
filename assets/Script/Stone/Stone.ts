import KYPureFacade from "../KYCreatorSDK/DesignPatterns/KYPrueMVC/Core/KYPureFacade";
import StoneMediator from "./StoneMediator";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Stone extends cc.Component {

    start () {
        KYPureFacade.getInstance('MainFacade').registerMediator(new StoneMediator(this));
    }
}
