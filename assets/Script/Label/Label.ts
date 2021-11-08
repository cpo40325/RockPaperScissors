import KYPureFacade from "../KYCreatorSDK/DesignPatterns/KYPrueMVC/Core/KYPureFacade";
import LabelMediator from "./LabelMediator";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Label extends cc.Component {


    start () {
        KYPureFacade.getInstance('MainFacade').registerMediator(new LabelMediator(this));
    }
}
