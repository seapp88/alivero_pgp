module.exports = {
    pluginOptions: {
        electronBuilder: {
            nodeIntegration: true,
            builderOptions: {
                publish: ['github'],
                appId: "com.ited.aliverowms.pgp",
                productName: "Alivero WMS PGP",
                mac: {
                    artifactName: '${productName}.${ext}'
                },
                linux: {
                    artifactName: '${productName}.${ext}'
                }
            }
        }
    }
}
