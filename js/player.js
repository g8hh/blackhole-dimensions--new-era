function calcPlayer(){
    player.version = 0.1
    loader(["mass"],n(0))
    //bd
    player.bd = {0:{},1:{},2:{},3:{}}
    for(a=0;a<=3;a++){
        loader(["bd",a,"num"],n(0))
        loader(["bd",a,"procmult"],n(1))
        loader(["bd",a,"level"],n(0))
    }
    //td
    loader(["ts"],n(0))
    player.td = {0:{},1:{},2:{},3:{}}
    for(a=0;a<=3;a++){
        loader(["td",a,"num"],n(0))
        if(a!=0) loader(["td",a,"procmult"],n(1))
        else loader(["td",a,"procmult"],n(0))
        loader(["td",a,"level"],n(0))
    }
    loader(["ts"],n(0))
    //rl1
    loader(["rl1"],n(0))
    //rl2
    loader(["rl2"],n(0))
}