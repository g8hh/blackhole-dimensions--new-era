function cuEff(id){
    return cu[id].effect()
}
function hasUpgrade(layer,id){
    return player[layer].includes(id)
}
function getCuCostPower(row){
    var amount = one
    for(a=1;a<=5;a++){
        if(player.cu.includes(row*10+a)) amount = amount.add(1)
    }
    return amount
}
function buycu(id){
    if(player.cp.lt(cu[id].cost()) || hasUpgrade(`cu`,id)) return
    player.cp = player.cp.sub(cu[id].cost())
    player.cu.push(id)
}
var cu = {
    11:{
        desp(){return `塌缩要求/${format(this.effect())}.(Tip:任何降低塌缩要求的时候都会改善塌缩点获取公式)`},
        effect(){return n(1e25)},
        cost(){return n(2).pow(getCuCostPower(1)).floor()}
    },
    12:{
        desp(){return `物质上限^${format(this.effect())}.(Tip:您真的确定您能在无限后成吨的软上限中达到上限么)`},
        effect(){return n(1.25)},
        cost(){return n(2).pow(getCuCostPower(1)).floor()}
    },
    13:{
        desp(){return `物质维度购买倍率的底数+${format(this.effect())}.(Tip:厚积而薄发...)`},
        effect(){return n(0.06)},
        cost(){return n(2).pow(getCuCostPower(1)).floor()}
    },
    14:{
        desp(){return `解锁奇点维度.奇点维度效果指数+${format(this.effect())}.(Tip:延展性强...)`},
        effect(){return n(0.08)},
        cost(){return n(2).pow(getCuCostPower(1)).floor()}
    },
    15:{
        desp(){return `时间碎片加成时间维度.(x ${format(this.effect())})(Tip:配合rl1...)`},
        effect(){return player.ts.add(1).pow(0.002)},
        cost(){return n(2).pow(getCuCostPower(1)).floor()}
    },
    21:{
        desp(){return `解锁挑战(解锁自动化,未制作),黑洞/时间购买最大时购买所有物质维度`},
        effect(){return true},
        cost(){return n(3).pow(getCuCostPower(2)).floor()}
    },
    22:{
        desp(){return `物质上限^${format(this.effect())}.`},
        effect(){return n(1.3)},
        cost(){return n(3).pow(getCuCostPower(2)).floor()}
    },
    23:{
        desp(){return `物质维度购买倍率的底数+${format(this.effect())}.`},
        effect(){return n(0.05)},
        cost(){return n(3).pow(getCuCostPower(2)).floor()}
    },
    24:{
        desp(){return `奇点维度效果指数+${format(this.effect())}.`},
        effect(){return n(0.06)},
        cost(){return n(3).pow(getCuCostPower(2)).floor()}
    },
    25:{
        desp(){return `物质不会低于${format(this.effect().minMass)},时间扭曲的1000倍率软上限被空间扭曲延迟(x ${format(this.effect().sc)})`},
        effect(){return {minMass:n(1e10),sc:getRl2Exp().pow(15)}},
        cost(){return n(3).pow(getCuCostPower(2)).floor()}
    },
}

function resetCU(){
    if(confirm(`您确定重置塌缩升级吗?这同时会进行一次塌缩重置!(第1/3次确认)这不会返还任何塌缩点数!(您的塌缩点若低于2则使您的塌缩点等于2)`)){
        if(confirm(`您确定重置塌缩升级吗?(第2/3次确认)这不会返还任何塌缩点数!(您的塌缩点若低于2则使您的塌缩点等于2)`)){
            if(confirm(`您确定重置塌缩升级吗?(第3/3次确认-最后一次)这不会返还任何塌缩点数!(您的塌缩点若低于2则使您的塌缩点等于2)`)){
                player.cp = player.cp.max(2)
                player.cu = []
                doRl3(true)
            }
        }
    }
}
function getMaxMass(){
    var lim = n(Number.MAX_VALUE)
    if(hasUpgrade(`cu`,12)) lim = lim.pow(cuEff(12))
    if(hasUpgrade(`cu`,22)) lim = lim.pow(cuEff(22))
    return lim
}

function getRl3Req(){
    var req = n(Number.MAX_VALUE)
    if(hasUpgrade(`cu`,11)) req = req.div(cuEff(11))
    return req
}
function getCPGain(mass = player.mass){
    var gain = mass.root(getRl3Req().add(10).log10()).div(5).floor()
    return gain
}

function doRl3(force = false){
    if(player.mass.lt(getRl3Req()) && !force) return
    if(player.mass.gte(getRl3Req())) player.cp = player.cp.add(getCPGain())

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

        player.cd[i].num = player.cd[i].level
        if(i == 0) player.cd[i].procmult = zero
        else player.cd[i].procmult = one
    }

    player.rl1 = n(0)
    player.rl2 = n(0)
}

function updaterl3(){
    if(SecondTab==`塌缩升级`){
        open(`rl3upg`)
        w(`cp`,`您有 ${format(player.cp,0)} 塌缩点 购买升级会加高同行升级的价格!(+^1)`)
        w(`rl3`,`重置以获得 ${format(getCPGain(),0)} 塌缩点 (需要 ${format(getRl3Req())} 质量以重置)<br>当前物质上限: ${format(getMaxMass())}`)
        for(i in cu){
            i = Number(i)
            w(`cu`+i,`cu${i}: ${cu[i].desp()} <br> 价格: ${format(cu[i].cost())}`)
            if(hasUpgrade(`cu`,i)) lime(`cu`+i,[`upg`])
            else if(player.cp.lt(cu[i].cost())) red(`cu`+i,[`upg`])
            else normal(`cu`+i,[`upg`])
        }
        if(player.mass.lt(getRl3Req())) red(`rl3`,[`dim`])
        else normal(`rl3`,[`dim`])
        if(!hasUpgrade(`cu`,14)) red(`tab_rl3dim`,[`tab`])
        else normal(`tab_rl3dim`,[`tab`])
    }else{
        close(`rl3upg`)
    }
}