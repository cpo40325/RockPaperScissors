import KYPureFacade from "../KYCreatorSDK/DesignPatterns/KYPrueMVC/Core/KYPureFacade";
import LayoutBoyMediator from "../LayoutBoy/LayoutBoyMediator";
import BoyMediator from "./BoyMediator";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Boy extends cc.Component {


    // LIFE-CYCLE C0ALLBACKS:


    start () {
        KYPureFacade.getInstance('MainFacade').registerMediator(new BoyMediator(this));
    }

}
