function cuEff(id,input = null){
    if(!input) return cu[id].effect()
    return cu[id].effect(input)
}
function hasRl3Upgrade(id){
    return player.cu.includes(id)
}
function getCuCostPowerDiv(){
    var mult = one
    if(hasRl3Upgrade(35)) mult = mult.mul(cuEff(35).costInc)
    if(hasRl3Upgrade(45)) mult = mult.mul(cuEff(45).costInc)
    return mult
}
function getCuCostPower(row){
    var amount = one
    for(a=1;a<=5;a++){
        if(player.cu.includes(row*10+a)) amount = amount.add(1)
    }
    amount = amount.sub(1).div(getCuCostPowerDiv()).add(1)
    return amount
}
function buycu(id){
    if(player.cp.lt(cu[id].cost()) || hasRl3Upgrade(id)) return
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
        effect(){return n(1.2)},
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
        effect(){
            if(hasRl3Upgrade(35)) return player.ts.add(1).pow(0.0075).pow(cuEff(35).cu25)
            return player.ts.add(1).pow(0.0075)
        },
        cost(){return n(2).pow(getCuCostPower(1)).floor()}
    },
    21:{
        desp(){return `解锁挑战(解锁自动化,未制作),黑洞/时间购买最大时购买所有物质维度`},
        effect(){return true},
        cost(){return n(3).pow(getCuCostPower(2)).floor()}
    },
    22:{
        desp(){return `物质上限^${format(this.effect())}.`},
        effect(){return n(1.20)},
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
        effect(){
            if(hasRl3Upgrade(35)) return {minMass:n(1e10).pow(cuEff(35).cu25),sc:getRl2Exp().pow(15).pow(cuEff(35).cu25)}
            return {minMass:n(1e10),sc:getRl2Exp().pow(15)}
        },
        cost(){return n(3).pow(getCuCostPower(2)).floor()}
    },
    31:{
        desp(){return `解锁塌缩点倍增器.(Tip:解锁前准备好2塌缩点来购买倍增器...这个升级效果很强.)`},
        effect(){return true},
        cost(){return n(10).pow(getCuCostPower(3)).floor()}
    },
    32:{
        desp(){return `物质上限被时间碎片倍增.(x${format(this.effect())})(Tip:在cu12和cu22前生效...).`},
        effect(){
            if(hasRl3Upgrade(42)) return player.ts.add(1).pow(0.2).pow(cuEff(42,"cu32"))
            return player.ts.add(1).pow(0.2)
        },
        cost(){return n(10).pow(getCuCostPower(3)).floor()}
    },
    33:{
        desp(){return `物质维度购买倍率的底数+${format(this.effect(),2,true)}(基于挑战完成数).`},
        effect(){return n(0.010).mul(player.challComp.length**0.85)},
        cost(){return n(10).pow(getCuCostPower(3)).floor()}
    },
    34:{
        desp(){return `奇点维度效果指数+${format(this.effect(),2,true)}.(基于挑战完成数)`},
        effect(){return n(0.015).mul(player.challComp.length**0.85)},       
        cost(){return n(10).pow(getCuCostPower(3)).floor()}
    },
    35:{
        desp(){return `基于挑战完成数,指数加成cu25和cu15效果(^${format(this.effect().cu25)}),并且减弱塌缩升级的价格增长(指数/${format(this.effect().costInc)})`},
        effect(){return {cu25:player.challComp.length**0.85*0.15+1,costInc:n(1.33)}},        
        cost(){return n(10).pow(getCuCostPower(3)).floor()}
    },
    41:{
        desp(){return `基于挑战完成数,加成塌缩点倍增器的效果底数(+${format(this.effect(),2,true)}),塌缩点倍增器+3.`},
        effect(){return n(0.01).mul(player.challComp.length**0.75)},        
        cost(){return n(100).pow(getCuCostPower(4)).floor()}
    },
    42:{
        desp(){return `物质上限加成bp获取.(x${format(this.effect("bp"))})同时,挑战完成数指数加成cu32的效果.(^${format(this.effect("cu32"))})`},
        effect(type){
            switch(type){
                case "bp":
                    return getMaxMass().root(getRl3Req().add(1e10).log10()).log10()
                case "cu32":
                    return player.challComp.length**0.75*0.125+1
            }
        },   
        cost(){return n(100).pow(getCuCostPower(4)).floor()}
    },
    43:{
        desp(){return `奇点能量加成物质维度购买倍率.(+${format(this.effect(),2,true)})`},
        effect(){return expRoot(player.ce.add(10).log10().mul(10),1.25).pow(0.8).div(400)},        
        cost(){return n(100).pow(getCuCostPower(4)).floor()}
    },
    44:{
        desp(){return `奇点能量加成奇点指数.(+${format(this.effect(),2,true)})`},
        effect(){return expRoot(player.ce.add(10).log10().mul(10),1.2).pow(0.8).div(400)},        
        cost(){return n(100).pow(getCuCostPower(4)).floor()}
    },
    45:{
        desp(){return `减弱塌缩升级的价格增长(指数/${format(this.effect().costInc)}),塌缩要求/${format(this.effect().bcReq)}.挑战内不对塌缩要求生效.`},
        effect(){return {costInc:n(1.33),bcReq:n(1e50)}},        
        cost(){return n(100).pow(getCuCostPower(4)).floor()}
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
    if(hasRl3Upgrade(32)) lim = lim.mul(cuEff(32))

    if(hasRl3Upgrade(12)) lim = lim.pow(cuEff(12))
    if(hasRl3Upgrade(22)) lim = lim.pow(cuEff(22))
    if(inRl3Chall(14)) lim = lim.root(1.5)
    return lim
}

function getRl3Req(){
    var req = n(Number.MAX_VALUE)
    if(hasRl3Upgrade(11)) req = req.div(cuEff(11))
    if(hasRl3Upgrade(45) && player.chall == null) req = req.div(cuEff(45).bcReq)
    if(inRl3Chall(30)) req = req.pow(getRl3ChallEff(30))
    return req
}
function getCPGain(mass = player.mass){
    var gain = mass.root(getRl3Req().add(10).log10()).div(5)
    gain = gain.mul(getCpBoosterEff())
    if(hasRl3Upgrade(42)) gain = gain.mul(cuEff(42,"bp"))
    return gain.floor()
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

    player.t = zero
    player.c20Nerf = one
}

function updaterl3(){
    if(SecondTab==`塌缩升级`){
        open(`rl3upg`)
        w(`cp`,`您有 ${format(player.cp,0)} 塌缩点 购买升级会加高同行升级的价格!(+^${format(one.div(getCuCostPowerDiv()),2,true)})`)
        w(`rl3`,`重置以获得 ${format(getCPGain(),0)} 塌缩点 (需要 ${format(getRl3Req())} 质量以重置)<br>当前物质上限: ${format(getMaxMass())}`)
        for(i in cu){
            i = Number(i)
            w(`cu`+i,`cu${i}: ${cu[i].desp()} <br> 价格: ${format(cu[i].cost())}`)
            if(hasRl3Upgrade(i)) lime(`cu`+i,[`upg`])
            else if(player.cp.lt(cu[i].cost())) red(`cu`+i,[`upg`])
            else normal(`cu`+i,[`upg`])
        }
        if(player.mass.lt(getRl3Req())) red(`rl3`,[`dim`])
        else normal(`rl3`,[`dim`])


        if(!hasRl3Upgrade(14)) red(`tab_rl3dim`,[`tab`])
        else normal(`tab_rl3dim`,[`tab`])
        if(!hasRl3Upgrade(21)) red(`tab_rl3cha`,[`tab`])
        else normal(`tab_rl3cha`,[`tab`])
    }else{
        close(`rl3upg`)
    }
}