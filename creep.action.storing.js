var mod = {

    name: 'storing',
    
    getTargetId: function(target){ 
        if(target.name) return target.name;
        return target.id;
    },

    getTargetById: function(id){
        var obj = Game.getObjectById(id);
        if( !obj ) obj = Game.spawns[id];
        return obj;
    },

    isValidAction: function(creep){
        var valid =(creep.carry.energy > 0 && creep.room.storage && 
        ((!!creep.room.activities.upgrading) && creep.room.activities.upgrading >= 2) &&
        creep.room.sourceEnergyAvailable > 0);
        return valid;
    },

    isValidTarget: function(target){
        return ((!!target) && target.store && target.sum < target.storeCapacity) && (!target.creeps || target.creeps.length < 2);
    }, 

    isAddableAction: function(creep){
        return (!creep.room.activities[this.name] || creep.room.activities[this.name] < creep.room.maxPerJob);
    },

    newTarget: function(creep){ 
        if( this.isValidTarget(creep.room.storage) )
            return creep.room.storage;
        return null;
    }, 

    step: function(creep){    
        if(creep.transfer(creep.target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.target);
            return "moveTo";
        } return "transfer";
    }, 

    error: {
        noTarget: function(creep, state){
            if(DEBUG) console.log( creep.name + ' > "Can not store energy."');
        }
    }
}


module.exports = mod;