var setup = new Creep.Setup('pioneer');
setup.multiBody = [WORK, CARRY, MOVE];
setup.fixedBody = [WORK, WORK, CARRY, CARRY, MOVE, MOVE];
setup.minAbsEnergyAvailable = 400;
setup.maxMulti = function(room){ return 4; };
setup.minControllerLevel = 3;
setup.globalMeasurement = true;
setup.sortedParts = false;
setup.minEnergyAvailable = function(spawn){
    return 0.75;
};
setup.maxCount = function(spawn){
    if ( spawn.room.situation.invasion || spawn.room.conserveForDefense ) 
        return 0;
    return ( FlagDir.count(FLAG_COLOR.claim.spawn) * 4 ) + 
        ( FlagDir.count(FLAG_COLOR.claim.pioneer) * 1 );
};
setup.maxWeight = function(spawn){
    return null;
};
module.exports = setup;