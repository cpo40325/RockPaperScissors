import KYPureFacade from "../KYCreatorSDK/DesignPatterns/KYPrueMVC/Core/KYPureFacade";
import PaperMediator from "./PaperMediator";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Paper extends cc.Component {

    start () {

        KYPureFacade.getInstance('MainFacade').registerMediator(new PaperMediator(this));
    }
}
