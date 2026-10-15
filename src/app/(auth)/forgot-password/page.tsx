"use client";
export const dynamic = "force-dynamic";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

// Password reset page in Cristiane's login design language.
// CSS scoped under .m27-login so nav/body rules don't leak to the rest of the site.
const CSS = `
.m27-login{--bg:#120b22;--bg2:#1a0f33;--card:#20143d;--line:rgba(212,175,106,.28);--gold:#d9b46c;--gold2:#f0d594;--cream:#f8f3ea;--ink:#1d1630;--mut:#b9afd0;--violet:#7a4fd0}
.m27-login *{box-sizing:border-box;margin:0;padding:0}
.m27-login{font-family:Inter,system-ui,sans-serif;background:radial-gradient(900px 600px at 80% 0%,#4a2a86 0%,transparent 60%),radial-gradient(700px 500px at 0% 100%,#2b1654 0%,transparent 60%),var(--bg);color:#fff;line-height:1.55;-webkit-font-smoothing:antialiased;min-height:100vh;display:flex;flex-direction:column;overflow-x:hidden}
.m27-login h1{font-family:'Cormorant Garamond',serif;font-weight:600;line-height:1.08}
.m27-login a{color:inherit;text-decoration:none}
.m27-login .wrap{max-width:1120px;margin:0 auto;padding:0 24px}
.m27-login .btn{display:inline-flex;align-items:center;gap:10px;padding:15px 30px;border-radius:999px;font-weight:600;font-size:15px;cursor:pointer;border:1px solid transparent;transition:.2s}
.m27-login .btn.gold{background:linear-gradient(180deg,var(--gold2),var(--gold));color:#2a1c05;box-shadow:0 8px 28px rgba(217,180,108,.28)}
.m27-login .btn.gold:hover{transform:translateY(-2px);box-shadow:0 12px 34px rgba(217,180,108,.4)}
.m27-login .btn.gold:disabled{opacity:.6;cursor:wait;transform:none}
.m27-login .eyebrow{font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:var(--gold);font-weight:600}
.m27-login nav{position:sticky;top:0;z-index:20;background:rgba(18,11,34,.82);backdrop-filter:blur(12px);border-bottom:1px solid rgba(255,255,255,.06)}
.m27-login nav .wrap{display:flex;align-items:center;justify-content:space-between;height:74px;gap:20px}
.m27-login .logo{display:flex;align-items:center;gap:10px}
.m27-login .logo svg{width:34px;height:34px}
.m27-login .logo b{font-family:'Cormorant Garamond',serif;font-size:22px;letter-spacing:.05em;font-weight:600;display:block;line-height:1}
.m27-login .logo small{font-size:8.5px;letter-spacing:.2em;color:var(--mut);text-transform:uppercase}
.m27-login main{flex:1;display:grid;place-items:center;padding:40px 16px}
.m27-login .card{width:100%;max-width:420px;background:rgba(255,255,255,.05);border:1px solid var(--line);border-radius:22px;padding:34px 28px;box-shadow:0 24px 60px rgba(0,0,0,.45)}
.m27-login .card .eyebrow{text-align:center;display:block;margin-bottom:10px}
.m27-login .card h1{text-align:center;font-size:38px;margin-bottom:12px;color:var(--gold)}
.m27-login .card p.sub{text-align:center;font-size:14px;color:var(--mut);margin-bottom:10px}
.m27-login label{display:block;font-size:13px;color:var(--mut);margin:14px 0 6px}
.m27-login input{width:100%;padding:14px 16px;border-radius:12px;border:1px solid rgba(255,255,255,.16);background:rgba(10,6,22,.7);color:#fff;font:inherit;font-size:16px;outline:none}
.m27-login input:focus{border-color:var(--gold);box-shadow:0 0 0 3px rgba(217,180,108,.18)}
.m27-login .card .btn{width:100%;justify-content:center;margin-top:24px}
.m27-login .msg{margin-top:16px;font-size:14px;text-align:center;min-height:20px}
.m27-login .msg.err{color:#ff9aa8}.m27-login .msg.ok{color:#9be0b0}
.m27-login .alt{text-align:center;margin-top:18px;font-size:14px;color:var(--mut)}
.m27-login .alt a{color:var(--gold);text-decoration:underline}
.m27-login footer{padding:22px;text-align:center;font-size:12px;color:#8f84a8}
`;

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [kind, setKind] = useState<"err" | "ok" | "">("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    document.title = "Reset Password | Manifest 2027 AI";
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const em = email.trim();
    if (!em) {
      setKind("err");
      setMsg("Please enter your email.");
      return;
    }
    setBusy(true);
    setKind("");
    setMsg("Sending…");
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(em, {
        redirectTo: "https://app.trendhubusa.com/login",
      });
      if (error) {
        setKind("err");
        setMsg(error.message);
        return;
      }
      setKind("ok");
      setMsg("Check your email for the reset link.");
    } catch {
      setKind("err");
      setMsg("Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="m27-login">
      <style>{CSS}</style>
      <nav>
        <div className="wrap">
          <a className="logo" href="https://app.trendhubusa.com/">
            <svg viewBox="0 0 40 40" fill="none" stroke="#d9b46c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6c3 5 3 12 0 18-3-6-3-13 0-18z" />
              <path d="M20 24C14 24 8 19 6 12c6 0 11 3 14 12zM20 24c6 0 12-5 14-12-6 0-11 3-14 12z" />
              <path d="M8 28c4 4 20 4 24 0" />
            </svg>
            <span><b>MANIFEST 2027 AI</b><small>Your mind. Your power. Your reality.</small></span>
          </a>
        </div>
      </nav>
      <main>
        <form className="card" onSubmit={onSubmit} noValidate>
          <span className="eyebrow">MANIFEST 2027 AI</span>
          <h1>Reset password</h1>
          <p className="sub">Enter your account email and we&apos;ll send you a reset link.</p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" autoComplete="email" inputMode="email" required placeholder="you@email.com" value={email} onChange={e => setEmail(e.target.value)} />
          <button className="btn gold" type="submit" disabled={busy}>Send reset link</button>
          <div className={`msg ${kind}`} role="status">{msg}</div>
          <div className="alt">Remembered it? <a href="https://app.trendhubusa.com/login">Sign in</a></div>
        </form>
      </main>
      <footer>© 2026 Manifest 2027 AI</footer>
    </div>
  );
}
