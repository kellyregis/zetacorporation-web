import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, mode = 'reset_password', employeeId = 'EMP-UNKNOWN' } = body;

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { ok: false, error: 'Endereço de e-mail corporativo inválido.' },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'ZETA Security <onboarding@resend.dev>';

    // Se a chave ainda não estiver configurada no Coolify / .env, simulamos com sucesso dielétrico
    if (!apiKey || apiKey === 're_your_api_key_here' || apiKey.startsWith('re_mock')) {
      console.log(`[ZETA-SEC / RESEND MOCK] Despacho de e-mail simulado para: ${email} (${mode})`);
      return NextResponse.json({
        ok: true,
        mock: true,
        message: 'Protocolo de despacho iniciado. Verifique sua caixa de entrada.',
        clue: 'Z-13_OVERRIDE_KEY::VOSS_071',
      });
    }

    const resend = new Resend(apiKey);

    let subject = '[ZETA-SEC] Redefinição de Credencial de Acesso // Terminal Central';
    let htmlContent = '';

    if (mode === 'whistleblower') {
      subject = '[CANAL CRIPTOGRAFADO] Relatório Recebido // Protocolo HÉLICE';
      htmlContent = `
        <div style="background-color: #0a0d14; color: #f0f6fc; font-family: monospace; padding: 30px; border: 1px solid #0284c7; max-width: 600px; margin: 0 auto; border-radius: 8px;">
          <h2 style="color: #38bdf8; margin-top: 0; border-bottom: 1px solid #1e293b; padding-bottom: 10px;">
            [CANAL SEGURO // RECEPTOR ZETA LINK]
          </h2>
          <p>Seus dados foram recebidos e criptografados pela malha descentralizada.</p>
          <div style="background: rgba(14, 165, 233, 0.1); border-left: 4px solid #38bdf8; padding: 12px; margin: 20px 0;">
            <p style="margin: 0; font-size: 13px; color: #bae6fd;">
              <strong>COORDENADAS DE EXTRAÇÃO:</strong> Grand Senora Desert / Frequência 104.7 MHz<br/>
              <strong>CONTATO DE CAMPO:</strong> "Procure pelo rádio da Doris em Harmony antes das 03:00."
            </p>
          </div>
          <p style="font-size: 12px; color: #94a3b8;">
            Aviso de Não-Rastreabilidade: Este e-mail foi gerado automaticamente a partir de um nodo ZETA Link autônomo.
          </p>
        </div>
      `;
    } else {
      // Modo reset_password (ARG Lore)
      subject = `[ZETA-SEC] Alerta de Credencial // ID ${employeeId} // PROTOCOLO Z-13`;
      htmlContent = `
        <div style="background-color: #06090e; color: #e2e8f0; font-family: 'Segoe UI', Tahoma, monospace; padding: 35px; border: 1px solid #38bdf8; max-width: 640px; margin: 0 auto; border-radius: 8px;">
          <div style="display: flex; align-items: center; border-bottom: 2px solid #0369a1; padding-bottom: 15px; margin-bottom: 20px;">
            <h1 style="color: #38bdf8; font-size: 22px; margin: 0; letter-spacing: 2px; font-weight: 800;">
              ZETA CORPORATION
            </h1>
            <span style="margin-left: 15px; background: #082f49; color: #7dd3fc; font-size: 11px; padding: 3px 8px; border-radius: 4px; font-family: monospace;">
              SECURITY-OPS
            </span>
          </div>

          <p style="font-size: 14px; line-height: 1.6; color: #cbd5e1;">
            Uma solicitação de recuperação de credencial foi registrada no terminal público para o identificador <strong>${employeeId}</strong>.
          </p>

          <div style="background: #0b1320; border: 1px solid #1e3a5f; padding: 18px; border-radius: 6px; margin: 25px 0;">
            <div style="color: #38bdf8; font-size: 12px; font-weight: bold; margin-bottom: 8px; font-family: monospace;">
              CREDENCIAL DE CONTINGÊNCIA (NÍVEL 3):
            </div>
            <div style="font-size: 20px; font-family: monospace; letter-spacing: 4px; color: #38bdf8; font-weight: bold;">
              ZTAC-071-VOSS
            </div>
            <div style="font-size: 11px; color: #94a3b8; margin-top: 8px;">
              Expiração: 15 minutos · Setor Autorizado: <em>Subsolo 4 / Terminal ZETA-04</em>
            </div>
          </div>

          <div style="background: rgba(220, 38, 38, 0.1); border-left: 3px solid #dc2626; padding: 12px; margin: 20px 0;">
            <p style="color: #f87171; font-size: 12px; margin: 0; font-family: monospace;">
              <strong>[ALERTA DE QUARENTENA / DIRECTIVA SENTINELA]:</strong><br/>
              O acesso a relatórios referentes ao <strong>Paciente 071</strong> e à variante de regeneração <strong>Z-13</strong> permanece sob embargo biológico. Desvios serão investigados pela unidade tática Sentinela.
            </p>
          </div>

          <hr style="border: 0; border-top: 1px solid #1e293b; margin: 25px 0;" />

          <p style="font-size: 11px; color: #64748b; line-height: 1.5; margin: 0; font-family: monospace;">
            ZETA Corporation &copy; 2026 · Divisão de Pesquisa Biológica e Longevidade Celular.<br/>
            Este é um comunicado oficial e confidencial. Não responda diretamente a este despacho.
          </p>
        </div>
      `;
    }

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [email],
      subject: subject,
      html: htmlContent,
    });

    if (error) {
      console.error('[ZETA-SEC / RESEND ERROR]:', error);
      return NextResponse.json(
        { ok: false, error: 'Falha no despacho do e-mail corporativo: ' + error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      id: data?.id,
      message: 'Despacho de segurança transmitido com sucesso. Verifique seu e-mail corporativo.',
    });
  } catch (err: any) {
    console.error('[ZETA-SEC / RESEND EXCEPTION]:', err);
    return NextResponse.json(
      { ok: false, error: 'Erro interno no gateway de comunicação ZETA.' },
      { status: 500 }
    );
  }
}
