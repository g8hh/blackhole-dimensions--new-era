//developing
var rl4milestones = [
    {desp:"塌缩不再重置奇点能量,而是将其变为其1.5次根.如果你完成挑战ax,那么自动完成挑战a(x-1).购买塌缩/时间维度不再花费任何物质.",req:n(1)}
]
function updaterl4milestone(){
    if(SecondTab==`镜面里程碑`){  
        open("rl4milestones")  
        for(i in rl4milestones){
            i = Number(i)
            w("rl4milestone"+(i+1),`${format(rl4milestones[i].req)}镜物质:${rl4milestones[i].desp}`)
            if(hasRl4Milestone(i+1)) lime("rl4milestone"+(i+1),["dim"])
            else normal("rl4milestone"+(i+1),["dim"])
        }
    }else{
        close(`rl4milestones`)
    }
}
function hasRl4Milestone(id){
    return player.bestMirrorMatterGain.gte(rl4milestones[id-1].req)
}