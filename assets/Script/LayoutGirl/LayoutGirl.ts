import KYPureFacade from "../KYCreatorSDK/DesignPatterns/KYPrueMVC/Core/KYPureFacade";
import LayoutGirlMediator from "./LayoutGirlMediator";

const {ccclass, property} = cc._decorator;



@ccclass
export default class LayoutGirl extends cc.Component {

    @property(cc.Prefab)
    scorePrefab: cc.Prefab = null;

    start () {
        KYPureFacade.getInstance('MainFacade').registerMediator(new LayoutGirlMediator(this));
    }
}
