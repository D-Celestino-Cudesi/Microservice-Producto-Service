import transporter from '../config/mailer.js';
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';
import { EMAIL_USER} from '../config.js'


export const sendEmail = async (req, res) => {
    try {
        const { para, asunto } = req.body;
        const directorioactual = dirname(fileURLToPath(import.meta.url));
        const emailTemplatePath = join(directorioactual, '../templates/emailTemplate.html');
        const emailTemplate = await readFile(emailTemplatePath, 'utf-8');
        const mailOptions = {
            from: EMAIL_USER,
            para,
            asunto,
            html: emailTemplate,
        };
        await transporter.sendMail(mailOptions);
        res.status(200).send('Correo enviado');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al enviar');
    }
};
