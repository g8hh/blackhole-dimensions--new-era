var softcaps = {
    sc2:{
        //sc2: n -> n^(1/pow)
        rl1mult:{
            name:"时间扭曲(倍率加成)",
            start(){
                var start = n(1000)
                if(hasRl3Upgrade(25)) start = start.mul(cuEff(25).sc)
                return start
            },
            pow(){
                var pow = n(2)
                return pow
            },
        },
        mass:{
            name:"黑洞质量",
            start(){
                var start = n("1e800")
                return start
            },
            pow(){
                var pow = n(2)
                return pow
            },
        },
        bd:{
            name:"黑洞维度等级",
            start(){
                var start = n(200)
                return start
            },
            pow(){
                var pow = n(1.1)
                return pow
            },
        },
        td:{
            name:"时间维度等级",
            start(){
                var start = n(400)
                return start
            },
            pow(){
                var pow = n(1.1)
                return pow
            },
        },
        tsEff:{
            name:"时间维度效果",
            start(){
                var start = n(1e10)
                return start
            },
            pow(){
                var pow = n(2.5)
                return pow
            },
        },
        ts:{
            name:"时间碎片",
            start(){
                var start = n("1e616")
                return start
            },
            pow(){
                var pow = n(1.25)
                return pow
            },
        },
    },
    sc1:{
        //sc1: n -> n/pow
        mass:{
            name:"黑洞质量",
            start(){
                var start = n(Number.MAX_VALUE)
                return start
            },
            pow(){
                var pow = n(1e10)
                return pow
            },
        },
        bd:{
            name:"黑洞维度等级",
            start(){
                var start = n(150)
                return start
            },
            pow(){
                var pow = n(2)
                return pow
            },
        },
        td:{
            name:"时间维度等级",
            start(){
                var start = n(308)
                if(inRl3Chall(24)) start = n(1)
                return start
            },
            pow(){
                var pow = n(2)
                if(inRl3Chall(24)) pow = pow.mul(getRl3ChallEff(24).add(1))
                return pow
            },
        },
        rl1exp:{
            name:"时间扭曲(指数加成)",
            start(){
                var start = n(1.3)
                return start
            },
            pow(){
                var pow = n(2.5)
                return pow
            },
        },
        rl2:{
            name:"空间扭曲",
            start(){
                var start = n(1.1)
                return start
            },
            pow(){
                var pow = n(2.5)
                return pow
            },
        },
    },
}
var scToName = {sc1:"折算(sc1,除数级)",sc2:"高级折算(sc2,指数级)",sc3:"究极折算(sc3,双指数级)",sc4:"原子折算(sc4,对数级)"}
function getStrByScAndPow(sc,pow){
    switch(sc){
        case "sc1":
            return `除以${format(pow)}`
        case "sc2":
            return `变为其${format(pow)}次根`
        case "sc3":
            return `指数变为其${format(pow)}次根`
        case "sc4":
            return `变为其${format(pow)}次对数`
    }
}
var softcapStr = {sc1:{},sc2:{},sc3:{},sc4:{}}
function sc(name,num,show = true){
    for(scType in softcaps){
        if(softcaps[scType][name]){
            var scIndex = softcaps[scType][name]
            var scStart = scIndex.start()
            var scPow = scIndex.pow()
            if(num.gt(scStart)){
                switch(scType){
                    case "sc1":
                        num = num.sub(scStart).div(scPow).add(scStart)
                        break;
                    case "sc2":
                        num = powsoftcap(num,scStart,scPow)
                        break;
                    case "sc3":
                        num = expRootSoftcap(num,scStart,scPow)
                        break;
                    case "sc4":
                        num = logsoftcap(num,scStart,scPow)
                        break;
                }
                if(show) softcapStr[scType][name] = {name:scIndex.name,start:scStart,pow:scPow}
            }
        }
    }
    return num
}

function updatesc(){
    if(FirstTab!="设置") return
    var showStr = "<h2>软上限:</h2>"
    var hasSC = {sc1:false,sc2:false,sc3:false}
    for(i1 in softcapStr){
        for(i2 in softcapStr[i1]){
            if(!hasSC[i1]){
                hasSC[i1] = true
                showStr += `<h3>${scToName[i1]}</h3>`
            }
            var scIndex = softcapStr[i1][i2]
            showStr += `${scIndex.name}: 软上限开始于 ${format(scIndex.start)} , ${getStrByScAndPow(i1,scIndex.pow)}<br>`
        }
    }
    if(showStr == "<h2>软上限:</h2>") showStr += "暂无"
    w("scIndex",showStr)
    softcapStr = {sc1:{},sc2:{},sc3:{},sc4:{}}
}