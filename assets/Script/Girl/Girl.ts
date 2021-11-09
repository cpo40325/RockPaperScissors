// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Girl extends cc.Component {


    start () {

        var a = this.getComponent(cc.Animation);



        a.play('DefaultBoy').speed =0.3 ;

        a.once('stop', ()=>{

            a.play('BoyWin').speed = 0.3;


        }, this);
        
    }

}
