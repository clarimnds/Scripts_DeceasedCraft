let ultimoAirdrop = null;

ServerEvents.tick(event => {
    if (event.server.tickCount % 800 == 0) {
        let x = 16430 + (Math.floor(Math.random() * 4001) - 2000);
        let z = -2063 + (Math.floor(Math.random() * 4001) - 2000);
        let level = event.server.getLevel('minecraft:overworld');

        if (level) {
            event.server.runCommandSilent(`forceload add ${x} ${z} ${x} ${z}`);
            event.server.scheduleInTicks(20, () => {
                let y = level.getHeight('motion_blocking', x, z);
                event.server.runCommandSilent(`execute in minecraft:overworld run place template deceasedcraft:airdroptest ${x} ${y} ${z}`);
                event.server.runCommandSilent(`forceload remove ${x} ${z} ${x} ${z}`);

                ultimoAirdrop = { x: x, y: y, z: z, ativo: true };
                
                event.server.tell([Text.red('[AIRDROP] ').bold(), Text.white('Suprimentos em: '), Text.yellow(`X: ${x} Z: ${z}`)]);
                event.server.runCommandSilent(`playsound minecraft:entity.lightning_bolt.thunder ambient @a ~ ~ ~ 1 0.8`);
            });
        }
    }

    if (event.server.tickCount % 20 == 0 && ultimoAirdrop && ultimoAirdrop.ativo) {
        let player = event.server.players.find(p => p.getDistanceSq(ultimoAirdrop.x, ultimoAirdrop.y, ultimoAirdrop.z) < 900);
        
        if (player) {
            ultimoAirdrop.ativo = false; 
            spawnHordaFinal(event.server, ultimoAirdrop.x, ultimoAirdrop.y, ultimoAirdrop.z);
        }
    }
});

function spawnHordaFinal(server, x, y, z) {
    server.tell(Text.darkRed('!!! ATENÇÃO: Horda detectada na área do suprimento !!!').bold());

    let listaZumbis = [
        'zombie_extreme:infected_military',
        'undead_revamp2:theheavy',
        'zombie_extreme:infected_hazmat'
    ];

    for (let i = 0; i < 8; i++) {
        let zumbi = listaZumbis[Math.floor(Math.random() * listaZumbis.length)];
        let offX = x + (Math.floor(Math.random() * 9) - 4);
        let offZ = z + (Math.floor(Math.random() * 9) - 4);

        server.runCommandSilent(`execute in minecraft:overworld run summon ${zumbi} ${offX} ${y + 2} ${offZ} {PersistenceRequired:1b}`);
    }
}


ServerEvents.commandRegistry(event => {
    event.register(Commands.literal('testdrop').requires(s => s.hasPermission(2)).executes(c => {
        if (ultimoAirdrop) {
            c.source.player.teleportTo(ultimoAirdrop.x, ultimoAirdrop.y, ultimoAirdrop.z);
            return 1;
        }
        return 0;
    }));
});