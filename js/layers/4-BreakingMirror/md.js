var mdMult = {}
var MDcost = [n(1),n(1),n(1),n(1)]
var MDcostMult = [n(2),n(3),n(4),n(5)]
function buyMaxmd(){
    for(i in basicDimNums) buymd(i)
}
function getAllmdMult(){
    var mult = n(0.1)
    return mult
}
function getAnymdMult(dimNum){
    var mult = mdMult.all
    var level = sc("md",player.md[dimNum].level)
    mult = mult.mul(getmdLevelBoostBase(dimNum).pow(level))
    return mult
}
function getmdLevelBoostBase(dimNum){
    var base = n(4)
    return base
}
function buymd(dimNum){
    if(inRl3Chall(23)) if(dimNum == 3) return

    var bulkStat = bulkBuy(player.mirrorMatter,MDcost[dimNum],player.md[dimNum].level,MDcostMult[dimNum])
    if(bulkStat.bulk.lt(1)) return
    player.md[dimNum].num = player.md[dimNum].num.add(bulkStat.bulk)
    player.md[dimNum].level = player.md[dimNum].level.add(bulkStat.bulk)
    player.mirrorMatter = player.mirrorMatter.sub(bulkStat.cost)
}
function mirrorReserve(){
    var stat = [n(0),n(0),n(0),n(0)]
    for(i in basicDimNums){
        i = Number(i)
        stat[3-i] = player.md[i].num.root(1.5)
        if(i!=0) player.md[i].procmult = one
        else player.md[i].procmult = zero
    }
    for(i in basicDimNums) player.md[i].num = stat[i]
}
function getAMExp(mirror = player.mirror){
    return mirror.add(10).log10().root(1.25)
}
function getAMGain(mass = player.mass){
    if(!player.mirrorize) return zero
    var base = mass.add(1e10).log10().div(3).root(3)
    var exp = getAMExp()
    var gain = base.pow(exp)
    return gain
}
function getENExp(am = player.am){
    return am.add(10).log10().root(2)
}
function getENGain(mass = player.mass){
    if(!player.mirrorize) return zero
    var base = mass.add(1e10).log10().div(3).root(2)
    var exp = getAMExp()
    var gain = base.pow(exp)
    return gain
}
function getAMEff(am = player.am){
    var eff = am.root(15).add(10).log10().pow(0.25)
    return eff
}
function getENEff(en = player.en){
    var eff = en.add(1).root(15)
    return eff
}
function updatemd(){
    //计算部分!
    var proc = n(1)
    mdMult.all = getAllmdMult()
    for(i in basicDimNums) mdMult[i] = getAnymdMult(i)
    for(i in basicDimNums){
        i = Number(i)
        if(i<=2) player.md[i].num = player.md[i].num.add(player.md[i+1].num.mul(mdMult[i+1]).root(2).mul(diff).div(10))
        player.md[i].procmult = player.md[i].procmult.add(player.md[i].num.mul(mdMult[i]).mul(diff))
        proc = proc.mul(player.md[i].procmult)
    }
    proc = sc("mirror",proc)
    player.mirror = player.mirror.add(proc.mul(diff))
    var AMproc = getAMGain()
    var ENproc = getENGain()
    player.am = player.am.add(AMproc.mul(diff))
    player.en = player.en.add(ENproc.mul(diff))
    

    //显示部分!
    if(SecondTab!="镜面维度") return close("md")
    open("md")
    w("en",`您有 ${format(player.en,0)} 泯灭能量(+ ${format(ENproc)} /s,基于物质) 这使得物质维度和奇点维度倍率x${format(getENEff())}`)
    w("am",`您有 ${format(player.am,0)} 反物质(+ ${format(AMproc)} /s,基于物质) 这使得物质维度购买倍率x${format(getAMEff(),4)},并且使能量产量^${format(getENExp())}`)
    w("mirror",`您有 ${format(player.mirror,0)} 镜面(+ ${format(proc)} /s) 这使得反物质产量^${format(getAMExp())}`)
    for(i in basicDimNums){
        w("md"+i,getBasicDimDesp("镜面",i,"镜面",mdMult[i],player.md[i].procmult,player.md[i].num,sc("md",player.md[i].level,false))+"&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+getBasicBuyButtonDesp(showBulkBuy(player.mirrorMatter,MDcost[i],player.md[i].level,MDcostMult[i]),"镜物质"))
        if(bulkBuy(player.mirrorMatter,MDcost[i],player.md[i].level,MDcostMult[i]).bulk.gte(1)) grey("md"+i,["dim"])
        else normal("md"+i,["dim"])
    }
}