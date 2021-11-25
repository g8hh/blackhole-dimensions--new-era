function doRl4(force = false){
    if(player.cp.lt(getRl4Req()) && !force) return
    if(player.cp.gte(getRl4Req())) player.mirrorMatter = player.mirrorMatter.add(getMMGain())
    if(player.cp.gte(getRl4Req())) player.mirrorShard = player.mirrorShard.add(getMSGain())
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
    player.acp = zero
    if(!hasRl4Milestone(5)) player.challComp = []
    if(!hasRl4Milestone(4)) player.cu = []
    if(hasRl4Milestone(3) && !hasRl4Milestone(4)) player.cu = [11,12,13,14,15,21,22,23,24,25]
    player.cpBooster = zero

    player.mirrorize = true
    if(!force) if(player.rl4chall == null) player.mirrorizeTimes = player.mirrorizeTimes.add(1)
    player.mirror = zero
    player.am = zero
    player.en = zero
}
function getMMGain(cp = player.cp){
    var gain = cp.root(getRl4Req().add(10).log10()).div(10).pow(2)
    if(!player.mirrorize) gain = one
    if(player.rl4chall != null) return zero
    return sc("MM",gain)
}
function getMSGain(cp = player.cp){
    var gain = cp.root(getRl4Req().add(10).log10()).div(10).pow(2)
    if(!player.mirrorize) gain = one
    if(player.rl4chall == null) gain = gain.pow(getRl4ChallRew(1,1)).mul(getRl4ChallRew(1,2))
    return sc("MS",gain)
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
        w(`MM`,`您有 ${format(player.mirrorMatter)} 镜物质, ${format(player.mirrorShard)} 镜面碎片`)
        w(`rl4`,`重置以获得 ${format(getMMGain())} 镜物质 + ${format(getMSGain())} 镜面碎片 (需要 ${format(getRl4Req())} 塌缩点以重置)`)
    }
}