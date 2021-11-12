function calcPlayer(){
    NotOmegaLoader(["time"],Number(t.getTime()))
    NotOmegaLoader(["cheated"],"no")
    loader(["offlineSpeedup"],n(0))
    NotOmegaLoader(["ToggleOfflineSpeedup"],"on")
    NotOmegaLoader(["auto"],"on")

    loader(["devSpeed"],n(1))
    loader(["mass"],n(0))
    loader(["bestMass"],n(0))
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
    //rl3
    loader(["cp"],n(0))
    NotOmegaLoader(["cu"],[])
    //cd
    loader(["ce"],n(0))
    player.cd = {0:{},1:{},2:{},3:{}}
    for(a=0;a<=3;a++){
        loader(["cd",a,"num"],n(0))
        if(a!=0) loader(["cd",a,"procmult"],n(1))
        else loader(["cd",a,"procmult"],n(0))
        loader(["cd",a,"level"],n(0))
    }
    //chall
    NotOmegaLoader(["chall"],null)
    NotOmegaLoader(["activeChall"],[])
    NotOmegaLoader(["challComp"],[])

    loader(["c20Nerf"],n(1))//c20
    loader(["t"],n(0))//c21

    loader(["cpBooster"],n(0))
}