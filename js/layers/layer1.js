function getRl1MultExp(){
    var exp = n(0.01)
    return exp
}
function getRl1Mult(mass = player.rl1){
    var mult = mass.add(1).pow(getRl1MultExp())
    var sc1Start = n(1000)
    if(hasUpgrade("cu",25)) sc1Start = sc1Start.mul(cuEff(25).sc)
    mult = powsoftcap(mult,sc1Start,1.25)
    mult = powsoftcap(mult,n(1e6),1.5)
    return mult
}
function getRl1Exp(mass = player.rl1){
    var exp = mass.add(1).log10().div(2).add(10).log10().pow(0.33)
    exp = powsoftcap(exp,n(1.3),1.25)
    exp = powsoftcap(exp,n(1.35),1.5)
    return exp
}
function doRl1(){
    if(player.mass.lt(1e30) || player.rl1.gte(player.mass)) return
    player.rl1 = player.mass

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
}

function updaterl1(){
    //显示!
    if(FirstTab!="物质维度") return
    w("rl1",`点击以重置并进行时间扭曲...(需黑洞质量大于${format(player.rl1.max(1e30))})\n这将会使你的物质维度效率x${format(getRl1Mult(player.mass))}(覆盖当前:x${format(getRl1Mult())}),并使你的时间碎片效果指数x${format(getRl1Exp(player.mass),3)}(覆盖当前:x${format(getRl1Exp(),3)}).`)
}