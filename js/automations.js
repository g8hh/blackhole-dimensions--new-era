var automations = {
    bd0:{
        unlocked(){return hasRl3Chall(10)},
        on:true,
        automate(){
            if(this.unlocked() && this.on) buybd(0)
        }
    },    
    bd1:{
        unlocked(){return hasRl3Chall(11)},
        on:true,
        automate(){
            if(this.unlocked() && this.on) buybd(1)
        }
    },
    bd2:{
        unlocked(){return hasRl3Chall(12)},
        on:true,
        automate(){
            if(this.unlocked() && this.on) buybd(2)
        }
    },
    bd3:{
        unlocked(){return hasRl3Chall(13)},
        on:true,
        automate(){
            if(this.unlocked() && this.on) buybd(3)
        }
    },
    td0:{
        unlocked(){return hasRl3Chall(20)},
        on:true,
        automate(){
            if(this.unlocked() && this.on) buytd(0)
        }
    },
    td1:{
        unlocked(){return hasRl3Chall(21)},
        on:true,
        automate(){
            if(this.unlocked() && this.on) buytd(1)
        }
    },
    td2:{
        unlocked(){return hasRl3Chall(22)},
        on:true,
        automate(){
            if(this.unlocked() && this.on) buytd(2)
        }
    },
    td3:{
        unlocked(){return hasRl3Chall(23)},
        on:true,
        automate(){
            if(this.unlocked() && this.on) buytd(3)
        }
    },
}

function updateAuto(){
    for(i in automations) automations[i].automate()
}