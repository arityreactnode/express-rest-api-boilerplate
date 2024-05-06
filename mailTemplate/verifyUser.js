exports.verifyUser = (verifylink) => {
  return `
<html lang="en">

  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />

    <meta name="viewport" content="width=device-width, maximum-scale=1" />
    <title>Verify Account</title>
    <style media="all" type="text/css">
      * { -webkit-text-size-adjust: none; -ms-text-size-adjust: none; } html {
      width: 100%; } body { -webkit-font-smoothing: antialiased; }
    </style>
    <style type="text/css">
      @media (max-width: 640px) { .main-wrapper { width: 100% !important; }
      .footer { width: 100% !important; } .table-content td { word-break:
      break-all !important; } .body-content { padding-left: 15px !important;
      padding-right: 15px !important; } .table-content td { padding: 10px
      !important } }
    </style>
  </head>

  <body
    style="font-family:&#39;Open Sans&#39;, sans-serif; font-weight:400; font-size:16px; color:#333333; overflow-x:hidden; width:100%; height:100%; margin:0; padding:0; background-color:#F6FBFF;"
    bgcolor="#F6FBFF"
  >
    <div
      style="background-color:#F6FBFF; background-position:center; background-repeat:no-repeat; background-size:cover;"
    >
      <div style="padding-right:15px; padding-left:15px;">
        <div style="padding-top:30px; padding-bottom:30px;">
          <div
            class="main-wrapper"
            style="width: 600px; margin: 0 auto; border-radius: 30px; background-color:#ffffff;"
          >
            <table
              cellspacing="0"
              cellpadding="0"
              border="0"
              align="center"
              style="border: 0; border-collapse: collapse; border-spacing: 0; empty-cells: show; font-size: 100%; width: 100%;"
              width="100%"
            >
              <tbody>
                <tr>
                  <td
                    style="vertical-align:top; text-align:left; font-weight:normal;"
                    valign="top"
                    align="left"
                  >
                    <div
                      class="body-content"
                      style="padding:30px; background-color:#EDF9F8; "
                    >
                      <table
                        width="100%"
                        cellspacing="0"
                        cellpadding="0"
                        border="0"
                        style="border: 0; border-collapse: collapse; border-spacing: 0; empty-cells: show; font-size: 100%; width: 100%;"
                      >
                        <tbody>
                          <tr>
                            <td
                              style="vertical-align: top; text-align: left; font-weight: normal;"
                              valign="top"
                              align="left"
                            >
                              <div class="logo" style="padding-bottom:40px;">
                                <a href="${process.env.API_URL}"><img
                                    src="${process.env.API_URL}images/mail/logo.png"
                                    alt="logo"
                                    class="img-responsive img-center"
                                    style="display: block; max-width: 100%; height: auto; margin: 0 auto;"
                                  /></a>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td
                              style="vertical-align:top; text-align:left; font-weight:normal; border-bottom: 5px solid #1FABA3; background-color: #ffffff; padding: 40px 20px ;"
                              valign="top"
                              align="left"
                            >
                              <div
                                class="email-title"
                                style="text-align: center;"
                              >
                                <img
                                  src="${process.env.API_URL}/images/mail/reset-verification.png"
                                  style="margin: 0 auto;"
                                  alt="reset-verification"
                                />
                                <h2
                                  style="font-size:24px; color:#1FABA3; margin: 0; padding:30px 0 20px 0; font-weight: 700; text-align:center;"
                                >
                                  Verify Account</h2>
                                <p
                                  style="font-size: 16px; font-weight: 400; margin: 0; padding-bottom: 40px; color:#565E6C; text-align:center;"
                                >
                                  If you want to Verify your Account! Please
                                  click the link below and Verify your Account</p>
                              </div>

                              <div
                                class="user-content"
                                style="text-align: center;"
                              >
                                <a
                                  href="${verifylink}"
                                  style="text-decoration: none; white-space: nowrap; display: inline-block; background-color: #1FABA3; color: #ffffff; border-radius: 36px; padding: 15px 50px; font-size: 18px; font-weight: 700;"
                                >Verify Account</a>
                              </div>
                            </td>
                          </tr>

                          <tr>
                            <td style="text-align: center; padding-top: 18px;">
                              <p
                                style="font-size: 16px; font-weight: 500; color: #565E6C;"
                              >© ${new Date().getFullYear()}
                              <a
                              style="font-size: 16px; font-weight: 500; color: #565E6C; text-decoration: none;"
                              href="${process.env.APP_URL}">${process.env.APP_URL}</a>
                                All Right Reserved</p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

  </body>

</html>
    `
}