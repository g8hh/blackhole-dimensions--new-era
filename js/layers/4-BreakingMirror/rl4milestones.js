var rl4milestones = [
    {desp:"塌缩不再重置奇点能量,而是将其变为其1.5次根.如果你完成挑战ax,那么自动完成挑战a(x-1).购买塌缩/时间维度不再花费任何物质.允许对奇点维度使用快捷键.",req:n(1)},
    {desp:"保留自动化.如果您完成了c元-元,完成所有挑战.",req:n(1.5)},
    {desp:"保留第1-2排塌缩升级.自动购买塌缩点倍增器且不消耗塌缩点.",req:n(2)},
    {desp:"保留所有塌缩升级.自动购买奇点维度且不消耗塌缩点.",req:n(3)},
    {desp:"保留所有挑战.该里程碑在进入挑战时无效.",req:n(4)},
    {desp:"每秒获得2.5%的塌缩点与反塌缩点.",req:n(8)},
    {desp:"每秒获得10%的塌缩点与反塌缩点.",req:n(25)},
    {desp:"镜面3维数量永远不低于镜面1维数量.镜面碎片的效果加上10个镜面碎片.保留打破无限.",req:n(256)},
    {desp:"镜面重置次数获取量乘以镜物质获取量的四次根.您每秒获得2.5%镜面重置时获得的资源,挑战内无效.",req:n(4096)},
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