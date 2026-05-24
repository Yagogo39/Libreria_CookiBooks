const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const enviarCotizacion = async (email, nombre, total, productos) => {
    const fechaHoy = new Date().toLocaleDateString('es-MX', {
        year: 'numeric', month: 'long', day: 'numeric'
    });

    const filasProductos = productos.map(p => `
        <tr>
            <td style="padding:12px 16px; border-bottom:1px solid #e7e5e4; font-family:Georgia,serif; color:#1c1917; font-size:14px;">
                ${p.nombre}
            </td>
            <td style="padding:12px 16px; border-bottom:1px solid #e7e5e4; text-align:center; color:#57534e; font-size:14px;">
                ${p.cantidad}
            </td>
            <td style="padding:12px 16px; border-bottom:1px solid #e7e5e4; text-align:right; color:#57534e; font-size:14px;">
                $${parseFloat(p.precio).toFixed(2)}
            </td>
            <td style="padding:12px 16px; border-bottom:1px solid #e7e5e4; text-align:right; font-family:Georgia,serif; font-weight:bold; color:#1c1917; font-size:14px;">
                $${(parseFloat(p.precio) * p.cantidad).toFixed(2)}
            </td>
        </tr>
    `).join('');

    const html = `
    <!DOCTYPE html>
    <html lang="es">
    <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
    <body style="margin:0;padding:0;background-color:#f5f5f4;font-family:Arial,sans-serif;">

        <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f5f4;padding:40px 0;">
        <tr><td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

            <!-- Header -->
            <tr>
                <td style="background-color:#1c1917;padding:32px 40px;text-align:center;">
                    <p style="margin:0;color:#d6d3d1;font-size:10px;letter-spacing:4px;text-transform:uppercase;">Cooki</p>
                    <h1 style="margin:4px 0 0;color:#fef3c7;font-family:Georgia,serif;font-size:32px;font-style:italic;font-weight:bold;">Books</h1>
                    <p style="margin:16px 0 0;color:#a8a29e;font-size:12px;letter-spacing:2px;text-transform:uppercase;">Cotización de libros</p>
                </td>
            </tr>

            <!-- Saludo -->
            <tr>
                <td style="padding:36px 40px 24px;">
                    <h2 style="margin:0 0 8px;font-family:Georgia,serif;color:#1c1917;font-size:20px;">¡Hola, Dino${nombre}!</h2>
                    <p style="margin:0;color:#78716c;font-size:14px;line-height:1.6;">
                        Gracias por tu interés. A continuación encontrarás el detalle de tu cotización con los libros que seleccionaste.
                        Para confirmar tu pedido, simplemente responde este correo o contáctanos directamente.
                    </p>
                </td>
            </tr>

            <!-- Info cotización -->
            <tr>
                <td style="padding:0 40px 24px;">
                    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#fafaf9;border:1px solid #e7e5e4;border-radius:6px;padding:16px;">
                        <tr>
                            <td style="padding:8px 16px;">
                                <span style="color:#a8a29e;font-size:11px;text-transform:uppercase;letter-spacing:1px;">CookiFecha</span><br>
                                <span style="color:#1c1917;font-size:14px;font-weight:bold;">${fechaHoy}</span>
                            </td>
                            <td style="padding:8px 16px;">
                                <span style="color:#a8a29e;font-size:11px;text-transform:uppercase;letter-spacing:1px;">Válida por</span><br>
                                <span style="color:#1c1917;font-size:14px;font-weight:bold;">7 cookidías</span>
                            </td>
                            <td style="padding:8px 16px;">
                                <span style="color:#a8a29e;font-size:11px;text-transform:uppercase;letter-spacing:1px;">Cookicliente</span><br>
                                <span style="color:#1c1917;font-size:14px;font-weight:bold;">${nombre}</span>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>

            <!-- Tabla de libros -->
            <tr>
                <td style="padding:0 40px 32px;">
                    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e7e5e4;border-radius:6px;overflow:hidden;">
                        <thead>
                            <tr style="background-color:#1c1917;">
                                <th style="padding:12px 16px;text-align:left;color:#fef3c7;font-size:11px;letter-spacing:1px;text-transform:uppercase;font-weight:bold;">CookiLibro</th>
                                <th style="padding:12px 16px;text-align:center;color:#fef3c7;font-size:11px;letter-spacing:1px;text-transform:uppercase;font-weight:bold;">Cant.</th>
                                <th style="padding:12px 16px;text-align:right;color:#fef3c7;font-size:11px;letter-spacing:1px;text-transform:uppercase;font-weight:bold;">Precio</th>
                                <th style="padding:12px 16px;text-align:right;color:#fef3c7;font-size:11px;letter-spacing:1px;text-transform:uppercase;font-weight:bold;">Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${filasProductos}
                        </tbody>
                        <tfoot>
    <tr>
        <td colspan="3" style="padding:8px 16px;text-align:right;font-size:12px;color:#a8a29e;">Subtotal</td>
        <td style="padding:8px 16px;text-align:right;font-size:13px;color:#78716c;">$${parseFloat(total).toFixed(2)}</td>
    </tr>
    <tr>
        <td colspan="3" style="padding:8px 16px;text-align:right;font-size:12px;color:#a8a29e;">IVA (16%)</td>
        <td style="padding:8px 16px;text-align:right;font-size:13px;color:#78716c;">$${(parseFloat(total) * 0.16).toFixed(2)}</td>
    </tr>
    <tr style="background-color:#fafaf9;">
        <td colspan="3" style="padding:16px;text-align:right;font-size:13px;color:#78716c;font-weight:bold;text-transform:uppercase;letter-spacing:1px;">Total con IVA</td>
        <td style="padding:16px;text-align:right;font-family:Georgia,serif;font-size:22px;font-weight:bold;color:#1c1917;">$${(parseFloat(total) * 1.16).toFixed(2)}</td>
    </tr>
</tfoot>
                    </table>
                </td>
            </tr>

            <!-- CTA -->
            <tr>
                <td style="padding:0 40px 32px;text-align:center;">
                    <p style="margin:0 0 20px;color:#78716c;font-size:13px;">
                        ¿Listo para confirmar? Responde este cookicorreo o escríbenos a
                        <a href="mailto:${process.env.EMAIL_USER}" style="color:#b91c1c;text-decoration:none;font-weight:bold;">${process.env.EMAIL_USER}</a>
                    </p>
                    <a href="mailto:${process.env.EMAIL_USER}?subject=Confirmar cookicotización - ${nombre}&body=Hola,quiero confirmar mi cookicotización por $${(parseFloat(total) * 1.16).toFixed(2)}"
                       style="display:inline-block;background-color:#1c1917;color:#fef3c7;text-decoration:none;padding:14px 32px;border-radius:4px;font-weight:bold;font-size:13px;letter-spacing:1px;text-transform:uppercase;">
                        Confirmar cookipedido →
                    </a>
                </td>
            </tr>

            <!-- Footer -->
            <tr>
                <td style="background-color:#fafaf9;border-top:1px solid #e7e5e4;padding:24px 40px;text-align:center;">
                    <p style="margin:0;color:#a8a29e;font-size:12px;">
                        Esta cookicotización fue generada automáticamente por <strong style="color:#78716c;">CookiBooks</strong>.<br>
                        Los cookiprecios están sujetos a disponibilidad de stock.
                    </p>
                </td>
            </tr>

        </table>
        </td></tr>
        </table>
    </body>
    </html>
    `;

    return transporter.sendMail({
        from: `"CookiBooks" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: `Tu cookicotización de CookiBooks — $${(parseFloat(total) * 1.16).toFixed(2)}`,
        html
    });
};

module.exports = { enviarCotizacion };