BlockEvents.placed(event => {
    const { block, player, level } = event
    
    const camadaProibida = 70

    if (block.y < camadaProibida) {
        
        const idNome = block.id.toLowerCase()


        const temTagProibida = 
            block.hasTag('minecraft:chests') || 
            block.hasTag('forge:chests') || 
            block.hasTag('forge:barrels') || 
            block.hasTag('cfm:storage') ||                
            block.hasTag('refurbished_furniture:storage')


        const idProibido = 
            idNome.includes('chest') || 
            idNome.includes('barrel') || 
            idNome.includes('crate') ||    
            idNome.includes('drawer') ||   
            idNome.includes('cabinet') ||  
            idNome.includes('fridge') ||   
            idNome.includes('freezer') || 
            idNome.includes('sedex') ||    
            idNome.includes('box') ||      
            idNome.includes('backpack') ||
            idNome.includes('kitchen')

        if (temTagProibida || idProibido) {
            event.cancel()
            

            player.tell(Text.red("ERRO: Geladeiras, Freezers e Armazenamentos são proibidos abaixo da camada 60!"))
            

            level.spawnSlots('minecraft:block.note_block.bass', block.x, block.y, block.z, 1, 0.5)
        }
    }
})