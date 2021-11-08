import SimpleCommand from "../KYCreatorSDK/DesignPatterns/KYPrueMVC/Command/SimpleCommand";
import KYPureNotification from "../KYCreatorSDK/DesignPatterns/KYPrueMVC/Observer/KYPureNotification";
import CommandMap from "../Map/CommandMap";
import GameProxy from "./GameProxy";


export default class GameCommand extends SimpleCommand {

    public static NAME = 'GameCommand';

    public constructor(key: string) {
        super();
    }

    public execute(notification: KYPureNotification): void {



        const gameProxy = <GameProxy>this.getFacade().retrieveProxy(GameProxy.NAME);

        switch (notification.getName()) {
            case CommandMap.THREW:
                console.log();
                
                gameProxy.playerThrew(notification.getBody());
                break;
        }
    }


}
