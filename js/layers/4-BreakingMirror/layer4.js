function doRl4(force = false){
    if(player.cp.lt(getRl4Req()) && !force) return
    if(player.cp.gte(getRl4Req())) player.mirrorMatter = player.mirrorMatter.add(getMMGain())
    player.bestMirrorMatterGain = player.bestMirrorMatterGain.max(getMMGain())

    //reset
    player.mass = zero
    player.ts = zero
    player.ce = zero
    for(i in basicDimNums){
        player.bd[i].level = zero
        player.bd[i].num = zero
        player.bd[i].procmult = one
        player.td[i].level = zero
        player.td[i].num = zero
        if(i == 0) player.td[i].procmult = zero
        else player.td[i].procmult = one

        player.cd[i].num = zero
        player.cd[i].level = zero
        if(i == 0) player.cd[i].procmult = zero
        else player.cd[i].procmult = one

        player.md[i].num = player.md[i].level
        if(i == 0) player.md[i].procmult = zero
        else player.md[i].procmult = one
    }

    player.rl1 = zero
    player.rl2 = zero

    player.t = zero
    player.c20Nerf = one

    player.cp = zero
    player.challComp = []
    player.cu = []
    player.cpBooster = zero

    player.mirrorize = true
    player.mirror = zero
    player.am = zero
    player.en = zero
}
function getMMGain(cp = player.cp){
    var gain = cp.root(getRl4Req().add(10).log10()).div(10)
    if(!player.mirrorize) gain = one
    return sc("MM",gain).floor()
}
function getRl4Req(){
    var req = n(1e20)
    if(!player.mirrorize) req = n(1e100)
    return req
}
function updaterl4(){
    if(player.mirrorize) close("row5cu")
    else open("row5cu")
    if(SecondTab==`镜面里程碑`){
        w(`MM`,`您有 ${format(player.mirrorMatter,0)} 镜物质`)
        w(`rl4`,`重置以获得 ${format(getMMGain(),0)} 镜物质 (需要 ${format(getRl4Req())} 塌缩点以重置)`)
    }
}