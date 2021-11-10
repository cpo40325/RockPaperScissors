import MainFacade from "../ＭainFacade";
import GameMediator from "./GameMediator";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Game extends cc.Component {

    facade: MainFacade;

    start () {


        this.facade = new MainFacade();
        this.facade.registerMediator(new GameMediator(this));

    }


}
