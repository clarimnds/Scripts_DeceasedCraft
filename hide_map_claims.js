ServerEvents.loaded(event => {

    event.server.runCommandSilent('opac admin config serverConfig.claims.claimsSynchronization set NOT_SYNCED')
    

    event.server.runCommandSilent('opac admin config serverConfig.claims.canSeeOtherClaims set false')
    
    console.log("KubeJS: Dados de Claims bloqueados para todos os minimapas.")
})