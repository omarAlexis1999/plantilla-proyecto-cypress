const { name: nameProject } = require('./package.json');
// Importa la librería de la API de Gmail
const { google } = require('googleapis');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
dotenv.config();

async function SendEmail() {
    // Crea un cliente OAuth2
    const oauth2Client = new google.auth.OAuth2(
        process.env.GMAIL_CLIENT_ID,
        process.env.GMAIL_CLIENT_SECRET,
        "https://developers.google.com/oauthplayground"
    );

    // Establecer las credenciales de acceso
    oauth2Client.setCredentials({
        refresh_token: process.env.REFRESH_TOKEN
    });

    // Generar un acces token nuevo
    const { token } = await oauth2Client.getAccessToken();
    oauth2Client.setCredentials({
        access_token: token,
    });

    // Crear un objeto de transporte
    const transporter = google.gmail({
        version: 'v1',
        auth: oauth2Client
    });

    // Definir titulos para el correo electronico
    const dateCurrentTime = new Date();
    const dateTimeLocal = dateCurrentTime.toLocaleString();
    const nameReport = 'Reporte-'+dateCurrentTime.toLocaleDateString().replace(/\//g, '-')+'hora'+dateCurrentTime.toLocaleTimeString().replace(/:/g, '-')+'.html';
    const subject = 'Reporte de Pruebas automatizadas '+nameProject+' ['+dateTimeLocal+']';
    const html = '<h4>Reporte de Casos de Prueba</h4>Se envia reporte de Ejecución de casos de prueba del proyecto <b>'+nameProject+'</b>, se adjunta documento en formato HTML, se recomienda descargar y abrir';
    // Archivos Adjuntos
    const attachmentPath = path.join(__dirname, './cypress/reports/html/index.html');
    const attachmentContent = fs.readFileSync(attachmentPath);
    const attachmentBase64 = attachmentContent.toString('base64');

    // Definir el cuerpo del mensaje
    const emailLines = [
        'From:'+ process.env.REPORTER_EMAIL,
        'To:'+ process.env.REPORTER_RECIPIENTS,
        'Subject:'+subject,
        'Content-Type: multipart/mixed; boundary="foo_boundary"',
        '',
        '--foo_boundary',
        'Content-Type: text/html; charset="UTF-8"',
        '',
        html,
        '',
    ];

    // Definir el archivo adjunto
    const email = [
        emailLines.join('\n'),
        '--foo_boundary',
        `Content-Type: application/html; name="reporte_adjunto.html" name="`+nameReport+`"`,
        `Content-Disposition: attachment; filename="`+nameReport+`"`,
        'Content-Transfer-Encoding: base64',
        '',
        attachmentBase64,
        '',
        '--foo_boundary--'
    ].join('\n');

    // Envíar al correo electrónico
    transporter.users.messages.send({
        userId: 'me',
        requestBody: {
            raw: Buffer.from(email).toString('base64')
        }
    }, (err, res) => {
        if (err) {
            console.error('Error al enviar reporte al correo:', err);
            return;
        }
        console.log('Reporte enviado correctamente al correo');
    });
}

SendEmail();

