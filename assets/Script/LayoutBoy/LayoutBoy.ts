import KYPureFacade from "../KYCreatorSDK/DesignPatterns/KYPrueMVC/Core/KYPureFacade";
import LayoutBoyMediator from "./LayoutBoyMediator";

const {ccclass, property} = cc._decorator;

@ccclass
export default class LayoutBoy extends cc.Component {

    @property(cc.Prefab)
    scorePrefab: cc.Prefab = null;
    start () {
        KYPureFacade.getInstance('MainFacade').registerMediator(new LayoutBoyMediator(this));
    }
}
