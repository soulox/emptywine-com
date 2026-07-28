// Transactional email via Resend. Never throws (a failed send must not break
// signup/reset). When RESEND_API_KEY is unset (local dev), the link is logged
// to the console instead of sent, so the flow stays testable offline.
import { secrets } from './auth';

type Lang = 'en' | 'fr';

const EMAIL: Record<Lang, { verify: T; reset: T }> = {
  en: {
    verify: { subject: 'Confirm your emptywine account', heading: 'Confirm your email', body: 'Welcome to emptywine. Confirm your email address to activate your account and place orders.', cta: 'Confirm email', ignore: 'If you did not create an account, you can ignore this message.' },
    reset: { subject: 'Reset your emptywine password', heading: 'Reset your password', body: 'We received a request to reset your password. This link expires in one hour.', cta: 'Reset password', ignore: 'If you did not request this, you can safely ignore this message.' },
  },
  fr: {
    verify: { subject: 'Confirmez votre compte emptywine', heading: 'Confirmez votre e-mail', body: 'Bienvenue chez emptywine. Confirmez votre adresse e-mail pour activer votre compte et passer commande.', cta: 'Confirmer l’e-mail', ignore: 'Si vous n’avez pas créé de compte, vous pouvez ignorer ce message.' },
    reset: { subject: 'Réinitialisez votre mot de passe emptywine', heading: 'Réinitialisez votre mot de passe', body: 'Nous avons reçu une demande de réinitialisation de votre mot de passe. Ce lien expire dans une heure.', cta: 'Réinitialiser le mot de passe', ignore: 'Si vous n’êtes pas à l’origine de cette demande, ignorez ce message.' },
  },
};
interface T { subject: string; heading: string; body: string; cta: string; ignore: string; }

function template(t: T, link: string): string {
  return `<div style="font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;background:#fbfaf7;padding:40px 0">
  <div style="max-width:480px;margin:0 auto;background:#fff;border:1px solid #eee;border-radius:14px;padding:36px 32px">
    <div style="font-size:18px;font-weight:700;letter-spacing:.02em;color:#2a2723">emptywine</div>
    <h1 style="font-size:22px;font-weight:600;color:#2a2723;margin:22px 0 10px">${t.heading}</h1>
    <p style="font-size:15px;line-height:1.6;color:#6b655c;margin:0 0 24px">${t.body}</p>
    <a href="${link}" style="display:inline-block;background:#2a2723;color:#fbfaf7;text-decoration:none;font-size:15px;font-weight:600;padding:13px 26px;border-radius:9px">${t.cta}</a>
    <p style="font-size:12px;line-height:1.6;color:#a79f93;margin:26px 0 0">${t.ignore}</p>
  </div>
</div>`;
}

async function deliver(env: Env, to: string, subject: string, html: string, devLink: string): Promise<void> {
  const key = secrets(env).RESEND_API_KEY;
  if (!key) {
    console.log(`[email:dev] to=${to} · ${subject}\n[email:dev] link → ${devLink}`);
    return;
  }
  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { authorization: `Bearer ${key}`, 'content-type': 'application/json' },
      body: JSON.stringify({ from: 'emptywine <no-reply@emptywine.com>', to: [to], subject, html }),
    });
  } catch {
    // swallow — auth/order flow already succeeded; the email is best-effort
  }
}

export async function sendVerifyEmail(env: Env, origin: string, to: string, lang: Lang, token: string): Promise<void> {
  const link = `${origin}${lang === 'fr' ? '/fr' : ''}/verify?token=${token}`;
  const t = EMAIL[lang].verify;
  await deliver(env, to, t.subject, template(t, link), link);
}
export async function sendResetEmail(env: Env, origin: string, to: string, lang: Lang, token: string): Promise<void> {
  const link = `${origin}${lang === 'fr' ? '/fr' : ''}/reset?token=${token}`;
  const t = EMAIL[lang].reset;
  await deliver(env, to, t.subject, template(t, link), link);
}
