import GameCommand from "./Game/GameCommand";
import GameProxy from "./Game/GameProxy";
import KYPureFacade from "./KYCreatorSDK/DesignPatterns/KYPrueMVC/Core/KYPureFacade";
import CommandMap from "./Map/CommandMap";

export default class MainFacade extends KYPureFacade {
    public static NAME = 'MainFacade';


    public constructor(key?: string) {
        super(MainFacade.NAME);
        //註冊控制事件
        this.initialCommand();
        //註冊資料處理項目
        this.initialProxy();
    }

    public static getInstance(): MainFacade {
        return super.getInstance(MainFacade.NAME);
    }

    initialCommand() {
        this.registerCommand(CommandMap.THREW, GameCommand);
    }
    initialProxy() {
        this.registerProxy(new GameProxy());


    }

}
