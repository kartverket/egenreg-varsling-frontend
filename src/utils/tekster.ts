export const informasjonsbrev_tittel = "Registrer opplysninger i Eiendomsregisteret"
export const informasjonsbrev_innhold = `<!DOCTYPE html>
<html lang="nb">
  <head>
    <meta
      name="viewport"
      content="width&#61;device-width, initial-scale&#61;1"
    />
    <meta charset="UTF-8" />
    <title>Du kan registrere opplysninger om egen eiendom</title>
    <style>
      div,
      span,
      p,
      a,
      img,
      table {
        margin: 0;
        padding: 0;
        border: 0;
        vertical-align: baseline;
      }

      thead,
      tbody,
      tfoot {
        margin: 0;
        padding: 0;
        border: 0;
        vertical-align: middle;
      }

      td,
      th,
      tr {
        margin: 0;
        padding: 0;
        border: 0;
        vertical-align: inherit;
      }

      li {
        padding-bottom: 8px;
      }

      ul {
        padding-left: 38px;
      }

      body {
        margin: 0;
        width: 100%;
        height: 100%;
        font-size: 17px;
        line-height: 1.5;
        font-family: Arial, Helvetica, sans-serif;
        color: #000000;
        background-color: #ffffff;
        padding-bottom: 2rem;
      }

      .logo {
        margin-bottom: 18px;
        height: 88px;
      }

      a:link,
      a:visited {
        color: #156630;
      }

      .wrapper {
        max-width: 780px;
        margin: 0 auto;
        padding: 20px;
      }

      .paragraph {
        display: block;
        margin-top: 1rem;
      }

      .footer {
        padding: 1rem;
        display: block;
      }

      .header {
        margin-bottom: 15px;
      }

      .header__text,
      .header img {
        display: inline-block;
        vertical-align: top;
      }

      .header .header__text {
        font-size: 30px;
        font-weight: bold;
        margin-left: 5px;
      }

      .heading {
        font-size: 28px;
        font-weight: bold;
        margin-bottom: 0.7rem;
      }

      .sub-heading {
        font-size: 20px;
        line-height: 1.3;
        font-weight: bold;
        margin-bottom: 0.5rem;
      }
      .content {
        clear: both;
        margin-bottom: 2rem;
      }

      .content-end {
        margin-top: 1rem;
        margin-bottom: 3rem;
      }

      .cta-box {
        background: #d0ecd6;
        padding: 16px;
        border-radius: 6px;
        margin-bottom: 2rem;
      }

      p {
        margin-bottom: 16px;
      }

      i {
        font-size: 14px;
      }

      table th {
        text-align: left;
      }
    </style>
  </head>
  <body>
    <div class="wrapper">
      <div class="header">
        <img
          alt="Kartverket sin logo"
          class="logo"
          src="data:image/png;base64,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"
        />
      </div>
      <div>
        <div class="heading">
          Oppdater informasjon om din eiendom
        </div>
        <div class="cta-box">
          <p>
            Kartverket og kommunene forvalter det offisielle registeret over norske eiendommer. Informasjonen brukes i en rekke samfunnsviktige tjenester.
          </p>

          <p>
            Riktig eiendomsinformasjon gir bedre tjenester og trygghet for deg som eier.
            Du kan nå enkelt sjekke og oppdatere opplysningene selv.
          </p>

          <a href="https://mineiendom.kartverket.no/egenregistrering/oversikt?from=dpi2"
            >Logg inn og oppdater opplysningene</a
          ><br />
        </div>

        <div class="content">
          <div class="sub-heading">Hvorfor er det viktig at det er riktig?</div>
          <p>
           Opplysningene om din eiendom kan være mangelfulle eller utdaterte. Derfor har vi gjort det enkelt for deg å oppdatere informasjon om din bolig eller fritidsbolig, jf. matrikkelloven § 27.
          </p>
          <p>
            Registreringen gjennomføres i tjenesten Eiendomsregisteret, og opplysningene inngår i matrikkelen som et tillegg til offentlig registrerte opplysninger. 
          </p>
          <p>
            Din registrering skal bidra til at offentlige og private aktører kan bruke riktig informasjon i samfunnskritiske tjenester: 
          </p>
          <ul>
            <li>
              <b>Kjøp og salg:</b> Riktige opplysninger gir en tryggere salgsprosess og lavere risiko for uenigheter i etterkant.
            </li>
            <li>
              <b>Lån og forsikring:</b> Banker og forsikringsselskaper kan hente opplysninger for å sikre at du får riktige betingelser.
            </li>
            <li>
              <b>Skatt og avgifter:</b>
              Opplysningene kan brukes som grunnlag for riktig beregning av skatter og avgifter.
            </li>
          </ul>
        </div>
        <div class="content">
          <div class="sub-heading">Hva kan du oppdatere?</div>
          <p>
            Ved å logge inn på Kartverkets nettsider kan du se og oppdatere opplysninger om din bolig eller fritidsbolig. Du kan inntil videre oppdatere byggeår, bruksareal, vann og avløp samt energi- og oppvarmingskilder.
          </p>
          <p>
            Det er frivillig å egenregistrere, og du velger selv hvilke opplysninger du vil oppgi.
          </p>
          <p>
            Du kan basere deg på opplysninger fra dokumenter som salgsoppgaver og byggesaksdokumenter, eller fra egen kunnskap. Dokumentasjon skal ikke lastes opp.
          </p>
          <p>
            Du kan gjennomføre registreringen på
            <a href="https://mineiendom.kartverket.no/egenregistrering/oversikt?from=dpi2"
              >https://mineiendom.kartverket.no/egenregistrering</a
            >
          </p>
          <p>Her finner du også mer informasjon om tjenesten.</p>
        </div>
        <div class="content-end">
          <p>Takk for at du bidrar til et riktig og oppdatert register!</p>
          <p>Hilsen Kartverket</p>
        </div>
      </div>
    </div>
  </body>
</html>
`

export const informasjonsbrev_tittel_v2 = "Registrer opplysninger i Eiendomsregisteret"
export const informasjonsbrev_innhold_v2 = `<!DOCTYPE html>
<html lang="no">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Egenregistrering - Oppdater opplysninger om din eiendom</title>
    <style>
        body {
            margin: 0;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 17px;
            line-height: 1.5;
            font-weight: 400;
            background-color: #ffffff;
            color: #000000;
        }

        a:link,
        a:visited {
            color: #156630;
        }

        .container {
            max-width: 960px;
            margin: 0 auto;
            padding: 0;
        }

        .logo-bar {
            background-color: #eef0f3;
            padding: 28px 32px;
        }

        .logo {
            display: block;
            height: 56px;
            width: auto;
        }

        .hero {
            background-color: #ffffff;
            padding: 32px 32px 36px 32px;
            border-bottom: 1px solid #e5e7eb;
        }

        h1, h2, h3, h4 {
            font-weight: bold;
            color: #000000;
            margin: 0;
        }

        .eyebrow {
            color: #156630;
            font-weight: bold;
            font-size: 17px;
            margin: 0 0 8px 0;
        }

        .hero h1 {
            font-size: 28px;
            line-height: 1.2;
            margin-bottom: 16px;
        }

        .hero p {
            margin: 0 0 16px 0;
            max-width: 760px;
        }

        .cta {
            display: inline-block;
            margin-top: 12px;
            padding: 12px 18px;
            background-color: #156630;
            color: #ffffff;
            text-decoration: none;
            border-radius: 8px;
        }

        .cta:link,
        .cta:visited {
            color: #ffffff;
        }

        .cta:hover {
            background-color: #0f4c24;
        }

        .section {
            padding: 32px;
            border-bottom: 1px solid #e5e7eb;
        }

        .section-last {
            padding: 32px;
        }

        h3 {
            font-size: 20px;
            line-height: 1.3;
            margin-bottom: 8px;
        }

        h4 {
            font-size: 17px;
        }

        p {
            margin: 0 0 16px 0;
        }

        strong, b {
            font-weight: bold;
        }

        .muted {
            color: #5A5858;
        }

        .muted-italic {
            color: #5A5858;
            font-style: italic;
        }

        .emphasis {
            font-weight: 600;
        }

        .benefits {
            width: calc(100% + 20px);
            border-collapse: separate;
            border-spacing: 10px 0;
            margin: 20px -10px 0 -10px;
        }

        .benefit {
            background-color: #ffffff;
            border: 1px solid #e5e7eb;
            border-radius: 10px;
            padding: 20px;
            vertical-align: top;
            width: 33%;
        }

        .benefit h4 {
            margin-bottom: 12px;
        }

        .benefit p {
            margin: 0;
        }

        .steps {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }

        .steps td {
            padding-bottom: 20px;
            vertical-align: top;
        }

        .step-number-cell {
            width: 72px;
            vertical-align: top;
        }

        .step-number {
            display: inline-block;
            width: 56px;
            height: 56px;
            line-height: 56px;
            text-align: center;
            border-radius: 28px;
            background-color: #E9F8EB;
            color: #000000;
            font-size: 20px;
            font-weight: bold;
        }

        .step h4 {
            margin: 0 0 8px 0;
        }

        .step p {
            margin: 0;
        }

        .signoff p {
            margin: 0 0 8px 0;
        }

        .divider {
            border: 0;
            border-top: 2px solid #156630;
            margin: 24px 0 20px 0;
            height: 0;
        }

        .callout {
            margin-top: 24px;
            background-color: #E9F8EB;
            border-top: 2px solid #156630;
            border-radius: 0 0 6px 6px;
            padding: 16px 20px;
            color: #000000;
        }

        .callout p {
            margin: 0;
        }

        .footer {
            font-size: 15px;
            color: #000000;
        }

        .footer p {
            margin: 0 0 8px 0;
        }

        @media only screen and (max-width: 700px) {
            .logo-bar {
                padding-left: 20px;
                padding-right: 20px;
            }

            .hero {
                padding-left: 20px;
                padding-right: 20px;
            }

            .section {
                padding-left: 20px;
                padding-right: 20px;
            }

            .section-last {
                padding-left: 20px;
                padding-right: 20px;
            }

            .hero h1 {
                font-size: 24px;
            }

            .benefits {
                border-spacing: 0;
                width: 100%;
                margin: 20px 0 0 0;
            }

            .benefit-row {
                display: block;
                width: 100%;
            }

            .benefit {
                display: block;
                width: auto;
                margin: 0;
            }

            .benefit + .benefit {
                margin-top: 14px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo-bar">
            <img alt="Kartverket sin logo" class="logo" src="data:image/png;base64,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"
 />
        </div>

        <div class="hero">
            <p class="eyebrow">Egenregistrering</p>
            <h1>Oppdater opplysninger om din eiendom</h1>
            <p>
                Kartverket og kommunene forvalter Norges offisielle eiendomsregister. Opplysningene brukes i samfunnskritiske tjenester fra banker, forsikringsselskaper og offentlige myndigheter.
            </p>
            <p>
                Når opplysningene er feil eller mangelfulle kan det påvirke tjenestene du mottar. Nå kan du enkelt sjekke hva som er registrert og oppdatere det som er feil.
            </p>
            <a class="cta" href="https://mineiendom.kartverket.no/egenregistrering/oversikt?from=dpi3" target="_blank" rel="noopener noreferrer">
                Logg inn og oppdater opplysningene
            </a>
        </div>

        <div class="section">
            <h3>Hvorfor er det viktig at det er riktig?</h3>
            <p>Riktige eiendomsopplysninger gir bedre tjenester og trygghet for deg som boligeier.</p>

            <table class="benefits">
                <tr class="benefit-row">
                    <td class="benefit">
                        <h4>Kjøp og salg</h4>
                        <p>Riktige opplysninger gir en tryggere salgsprosess og lavere risiko for uenigheter.</p>
                    </td>
                    <td class="benefit">
                        <h4>Lån og forsikring</h4>
                        <p>Banker og forsikringsselskaper kan hente opplysninger for å sikre at du får riktige betingelser.</p>
                    </td>
                    <td class="benefit">
                        <h4>Skatter og avgifter</h4>
                        <p>Opplysningene kan brukes som grunnlag for riktig beregning av skatter og avgifter.</p>
                    </td>
                </tr>
            </table>
        </div>

        <div class="section">
            <h3>Hva kan du oppdatere?</h3>
            <p>
                I første omgang kan du oppdatere informasjon om <span class="emphasis">byggeår, bruksareal, vann, avløp, energi</span> og <span class="emphasis">oppvarming</span>.
            </p>
            <p>
                Før du starter kan det være lurt å ha salgsoppgave, byggesaksdokumenter eller andre relevante dokumenter tilgjengelig. Du trenger ikke laste opp noe, men de kan hjelpe deg å finne riktige opplysninger.
            </p>
            <p class="muted-italic">
                Finner du andre opplysninger du mener er feil kan du be kommunen om å rette dem.
            </p>
        </div>

        <div class="section">
            <h3>Hvordan gjør du en egenregistrering?</h3>

            <table class="steps">
                <tr class="step">
                    <td class="step-number-cell">
                        <span class="step-number">1</span>
                    </td>
                    <td>
                        <h4>Velg eiendommen du vil oppdatere</h4>
                        <p class="muted">
                            Eier du flere eiendommer, ønsker vi at du registrerer på alle som er tilgjengelig.
                        </p>
                    </td>
                </tr>
                <tr class="step">
                    <td class="step-number-cell">
                        <span class="step-number">2</span>
                    </td>
                    <td>
                        <h4>Gå gjennom opplysningene</h4>
                        <p class="muted">
                            Bekreft det som stemmer, endre det som er feil, eller legg til det som mangler.
                        </p>
                    </td>
                </tr>
                <tr class="step">
                    <td class="step-number-cell">
                        <span class="step-number">3</span>
                    </td>
                    <td>
                        <h4>Send inn</h4>
                        <p class="muted">
                            Opplysningene du registrerer inngår som et tillegg til det kommunen allerede har registrert.
                        </p>
                    </td>
                </tr>
            </table>
        </div>

        <div class="section signoff">
            <p>Takk for at du bidrar til et riktig og oppdatert eiendomsregister!</p>
            <p>Med vennlig hilsen,</p>
            <p> Kartverket</p>

            <div class="callout">
                <p>Det er frivillig å egenregistrere, og du velger selv hvilke opplysninger du oppdaterer.</p>
                <p>Det holder at én eier gjennomfører registreringen.</p>
            </div>
        </div>

        <div class="section-last footer">
            <p>Du mottar dette brevet fordi du er registrert som eier eller fester av en bolig i Norge.</p>
            <p>Matrikkelloven § 27 åpner for at eiere selv kan registrere opplysninger om sin eiendom.</p>
        </div>
    </div>
</body>
</html>`
