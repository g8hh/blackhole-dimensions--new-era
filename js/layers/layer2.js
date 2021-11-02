function getRl2Exp(mass = player.rl2){
    var exp = sc("rl2",mass.div(1e50).add(1).log10().div(800).add(1).log10().add(1),mass == player.rl2)
    return exp
}
function doRl2(){
    if(player.mass.lt(1e150) || player.rl2.gte(player.mass)) return
    player.rl2 = player.mass

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
}

function updaterl2(){
    //显示!
    if(FirstTab!="物质维度") return
    w("rl2",`点击以重置并进行空间扭曲(这会重置时间扭曲!)...(需黑洞质量大于${format(player.rl2.max(1e150))})\n这将会使你的物质产量^${format(getRl2Exp(player.mass),3)}(覆盖当前:^${format(getRl2Exp(),3)}).`)
}