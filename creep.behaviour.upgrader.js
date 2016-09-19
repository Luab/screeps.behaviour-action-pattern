module.exports = {
    name: 'upgrader',
    run: function(creep) {
        if( creep.room.containerController ){                
            if(CHATTY) creep.say('upgrading', SAY_PUBLIC);

            let container = creep.room.containerController[0];
            let contRange = creep.pos.getRangeTo(container);
            let controllerRange = creep.pos.getRangeTo(creep.room.controller);

            if (container == null) return;

            if( contRange < 2 && creep.carry.energy <= (creep.data.body&&creep.data.body.work ? creep.data.body.work :  (creep.carryCapacity/2) ))
                creep.withdraw(container, RESOURCE_ENERGY);

            if( controllerRange < 4 )
                creep.upgradeController(creep.room.controller);

            if (_.isUndefined(creep.data.set) || creep.data.set == false ) {
                let cpos = container.pos;
                let mtx = [[-1,-1],[0,-1],[1,-1],[-1,0],[1,0],[-1,1],[0,1],[1,1]];

                //   xxx
                //   x x
                //   xxx
                function arrayMinby(arr,func) {
                   return arr.reduce(function (p, v) {
                       return ( func(p) < func(v) ? p : v );
                   },[]);
                }


                let containerSpots = mtx.map(d => new RoomPosition(cpos.x + d[0], cpos.y+d[1],cpos.roomName));

                let spawnpos = creep.room.spawns[0].pos;
                let spots = containerSpots.map( p => {
                    return {
                        creeps:p.lookFor(LOOK_CREEPS),
                        pos:p,
                        dis:spawnpos.findPathTo(p,{ignoreCreeps:true}).length,
                    }
                }).filter(e => {
                    return e.creeps.length == 0 || e.creeps[0].name == creep.name
                }).sort((a,b) => b.dis - a.dis);


                if( spots.length >0 && (spots[0].pos.x != creep.pos.x || spots[0].pos.y != creep.pos.y )) {
                    creep.drive(spots[0].pos, 0,0);
                } else {
                    creep.data.set = true;
                }
            }
            logError(`Upgrader ${creep.name} has no container in reach of the controller in room ${creep.pos.roomName}!`);
        }
    }
}
