module.exports = function ({ email, token, namecompany }) {
    return {
        from: 'Window Seller Companies',
        to: email,
        subject: 'Confirma tu Cuenta de Window Seller',
        text: 'Confirma tu Cuenta de Window Seller',
        html: `
        <!DOCTYPE html>
        <head>
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
        </head>
        <body>
            <div class="content_mail">
                <div class="title" style="font-weight: bold">
                    <p>Bienvenido Srs <span class="title_span">${namecompany}</span></p>
                </div>
                <div>
                    <p>Confirma tu cuenta</p>
                    <p>Has click en <b>confirmar cuenta</b> y empieza a Administrar tus productos!</p>
                </div>
                <div>
                    <a href="${process.env.CLIENT_URL_DEPLOY}/confirmaccount/${token}" rel="noopener noreferrer" class="btn_confirm" style="font-weight: bold">
                        <button>confirmar cuenta</button>
                    </a>
                </div>
                <div>
                    <p>Si no hiciste la solicitud, Ignora este mensaje</p>
                </div>
            </div>
        </body>
        </html>
        <style>
            * {
                font-family: 'Montserrat', sans-serif;
            }
            .title {
                text-align: center;
                background: #ffc400;
                color: #000000;
                font-size: 1.8rem;
            }
            .title .title_span {
                color: white;
                font-weight: 900;
            }
            .content_mail {
                max-width: 720px;
                margin: 0 auto;
                box-shadow: 0 1px 15px rgba(0, 0, 0, 0.1);
                border-radius: 15px;
                background: white;
                overflow: hidden;
                text-align: center;
            }
            .content_mail>div,p {
                padding: 10px;
            }
            .btn_confirm>button {
                border: none;
                padding: 10px 15px;

                border-radius: 10px;
                box-shadow: 0 1px 15px rgba(0, 0, 0, 0.1);
                background: #ffc400;
                color: white;

                font-weight: 900;
                cursor: pointer;
                font-size: 1.3rem
            }
        </style>`,
    }
}