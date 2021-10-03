function n(number){
    return new OmegaNum(number)
};
function w(id,str){
    document.getElementById(id).innerHTML = str
};
function e(id,type,str){
    document.getElementById(id)[type] = str
};
function close(id){
    document.getElementById(id).style.display = "none" 
}
function open(id){
    document.getElementById(id).style.display = "block" 
}
//例如 inJson({a:0},["a"])返回true inJson({a:{b:{c:0}}},["a","b"])返回true
function inJson(json,things){
    var a = json
    for(i in things){
        if(a[things[i]]){
            a = a[things[i]]
        }else return false
    }
    return true
}

//加载omeganum数字用
function loader(place,basicNum){
    var l = place.length
    if(inJson(saveStr,place)){
        switch(l){
            case 1:player[place[0]] = n(saveStr[place[0]]);break
            case 2:player[place[0]][place[1]] = n(saveStr[place[0]][place[1]]);break
            case 3:player[place[0]][place[1]][place[2]] = n(saveStr[place[0]][place[1]][place[2]]);break
            case 4:player[place[0]][place[1]][place[2]][place[3]] = n(saveStr[place[0]][place[1]][place[2]][place[3]]);break
            case 5:player[place[0]][place[1]][place[2]][place[3]][place[4]] = n(saveStr[place[0]][place[1]][place[2]][place[3]][place[4]]);break
            case 6:player[place[0]][place[1]][place[2]][place[3]][place[4]][place[5]] = n(saveStr[place[0]][place[1]][place[2]][place[3]][place[4]][place[5]]);break
            case 7:player[place[0]][place[1]][place[2]][place[3]][place[4]][place[5]][place[6]] = n(saveStr[place[0]][place[1]][place[2]][place[3]][place[4]][place[5]][place[6]]);break
        }
    }else{
        switch(l){
            case 1:player[place[0]] = basicNum;break
            case 2:player[place[0]][place[1]] = basicNum;break
            case 3:player[place[0]][place[1]][place[2]] = basicNum;break
            case 4:player[place[0]][place[1]][place[2]][place[3]] = basicNum;break
            case 5:player[place[0]][place[1]][place[2]][place[3]][place[4]] = basicNum;break
            case 6:player[place[0]][place[1]][place[2]][place[3]][place[4]][place[5]] = basicNum;break
            case 7:player[place[0]][place[1]][place[2]][place[3]][place[4]][place[5]][place[6]] = basicNum;break
        }
    }
}

//加载升级等
function NotOmegaLoader(place,basicNum){
    var l = place.length
    if(inJson(saveStr,place)){
        switch(l){
            case 1:player[place[0]] = (saveStr[place[0]]);break
            case 2:player[place[0]][place[1]] = (saveStr[place[0]][place[1]]);break
            case 3:player[place[0]][place[1]][place[2]] = (saveStr[place[0]][place[1]][place[2]]);break
            case 4:player[place[0]][place[1]][place[2]][place[3]] = (saveStr[place[0]][place[1]][place[2]][place[3]]);break
            case 5:player[place[0]][place[1]][place[2]][place[3]][place[4]] = (saveStr[place[0]][place[1]][place[2]][place[3]][place[4]]);break
            case 6:player[place[0]][place[1]][place[2]][place[3]][place[4]][place[5]] = (saveStr[place[0]][place[1]][place[2]][place[3]][place[4]][place[5]]);break
            case 7:player[place[0]][place[1]][place[2]][place[3]][place[4]][place[5]][place[6]] = (saveStr[place[0]][place[1]][place[2]][place[3]][place[4]][place[5]][place[6]]);break
        }
    }else{
        switch(l){
            case 1:player[place[0]] = basicNum;break
            case 2:player[place[0]][place[1]] = basicNum;break
            case 3:player[place[0]][place[1]][place[2]] = basicNum;break
            case 4:player[place[0]][place[1]][place[2]][place[3]] = basicNum;break
            case 5:player[place[0]][place[1]][place[2]][place[3]][place[4]] = basicNum;break
            case 6:player[place[0]][place[1]][place[2]][place[3]][place[4]][place[5]] = basicNum;break
            case 7:player[place[0]][place[1]][place[2]][place[3]][place[4]][place[5]][place[6]] = basicNum;break
        }
    }
}

function getBasicDimDesp(dimName,dimNum,itemName,mult,procmult,number){
    return `${dimName}${chsNum[dimNum]}维x${format(mult)}&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp${format(number,0)}&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp${itemName}生产x${format(procmult)}`
}
function getBasicBuyButtonDesp(AJsonThatIncludesBulkAndCost,theThingsYouCostName){
    return `点击以购买${format(AJsonThatIncludesBulkAndCost.bulk,0)}个 总价格:${format(AJsonThatIncludesBulkAndCost.cost)}${theThingsYouCostName}`
}

function bulkBuy(item,cost,level,costmult){
    var bulk = OmegaNum.affordGeometricSeries(item,cost,costmult,level);
    return {bulk:bulk,cost:OmegaNum.sumGeometricSeries(bulk,cost,costmult,level)}
}

function showBulkBuy(item,cost,level,costmult){
    var bulk = OmegaNum.affordGeometricSeries(item,cost,costmult,level).max(1);
    return {bulk:bulk,cost:OmegaNum.sumGeometricSeries(bulk,cost,costmult,level)}
}

function powsoftcap(num,start,power){
	if(num.gt(start)){
		num = num.root(power).mul(start.pow(one.sub(one.div(power))))
	}
    return num
}

function logsoftcap(num,start,power){
    if(num.gt(start)){
        num = ten.tetr(num.slog(10).sub(power)).pow(start.logBase(ten.tetr(start.slog(10).sub(power))))
    }
    return num
}

function expRoot(num,root){
    return ten.pow(num.log10().root(root))
}

function expRootSoftcap(num,start,power){
    if(num.lte(start)) return num;
    return ten.pow(num.log10().sub(start.log10()).root(power)).pow(start.log10().pow(one.sub(one.div(power))))
}

function normal(id,extraClass = []){
    var classes = ""
    for(i in extraClass) classes += " "+extraClass
    if(classes != "") classes = classes.substr(1)
    document.getElementById(id).className = classes
}

function red(id,extraClass = []){
    var classes = "red"
    for(i in extraClass) classes += " "+extraClass
    document.getElementById(id).className = classes
}

function lime(id,extraClass = []){
    var classes = "lime"
    for(i in extraClass) classes += " "+extraClass
    document.getElementById(id).className = classes
}