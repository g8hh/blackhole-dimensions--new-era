function getRl2Exp(mass = player.rl2){
    var exp = sc("rl2",mass.div(1e50).add(1).log10().div(800).add(1).log10().add(1),mass == player.rl2)
    if(inRl3Chall(24)) exp = exp.pow(getRl3ChallEff(24).rec())
    return exp
}
function doRl2(){
    if(player.mass.lt(1e150) || player.rl2.gte(player.mass)) if(!confirm("您将在条件不满足的情况下进行空间扭曲!这不会给您任何增益!是否重置?")) return
    player.rl2 = player.mass.max(player.rl2)

    //reset
    player.mass = zero
    player.ts = zero
    for(i in basicDimNums){
        player.bd[i].level = zero
        player.bd[i].num = zero
        player.bd[i].procmult = one
        player.td[i].level = zero
        player.td[i].num = zero
        if(i == 0) player.td[i].procmult = zero
        else player.td[i].procmult = one
    }

    player.rl1 = n(0)
    
    player.t = zero
    player.c20Nerf = one
}

function updaterl2(){
    //显示!
    if(FirstTab!="物质维度") return
    w("rl2",`点击以重置并进行空间扭曲(这会重置时间扭曲!)...(需黑洞质量大于${format(player.rl2.max(1e150))})\n这将会使你的物质产量^${format(getRl2Exp(player.mass),3)}(覆盖当前:^${format(getRl2Exp(),3)}).`)
    if(player.mass.lt(1e150) || player.rl2.gte(player.mass)) normal("rl2",["dim"])
    else grey("rl2",["dim"])
}