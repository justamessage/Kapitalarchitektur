import { useState, useEffect, useRef } from "react";

const MODULES = [
  {
    nr: "01",
    title: "KASSENLAGE",
    subtitle: "Wo stehst du wirklich?",
    desc: "Cashflow-Mapping für Unternehmer mit mehreren Einkommensquellen. Operative vs. strategische Liquidität. Schluss mit dem Bauchgefühl — hier wird gerechnet.",
    icon: "◎"
  },
  {
    nr: "02",
    title: "ARCHITEKTUR",
    subtitle: "Welche Struktur passt zu welcher Phase?",
    desc: "GmbH, Holding, Privatvermögen — die richtige Struktur zur richtigen Zeit. Wann eine vermögensverwaltende GmbH Sinn ergibt und wann sie dich bremst.",
    icon: "△"
  },
  {
    nr: "03",
    title: "ENTNAHME VS. REINVESTITION",
    subtitle: "Die zentrale Gründerfrage.",
    desc: "Frameworks für die wichtigste Entscheidung: Wie viel nimmst du raus? Wie viel bleibt im System? Wann kippt Reinvestition in Selbstausbeutung?",
    icon: "⬡"
  },
  {
    nr: "04",
    title: "ASSETKLASSEN-ORIENTIERUNG",
    subtitle: "Nicht 'kauf das' — sondern 'denk so'.",
    desc: "Immobilien, Wertpapiere, digitale Assets, eigene Produkte. Welche Assetklassen passen zu welchem Gründerprofil? Entscheidungsrahmen statt Empfehlung.",
    icon: "◈"
  },
  {
    nr: "05",
    title: "IMMOBILIEN-LOGIK",
    subtitle: "Bankability ohne Festgehalt.",
    desc: "Eigenkapitalaufbau als Selbstständiger. Wie Banken dich sehen, wie du das änderst. Immobilie als Cashflow-Baustein vs. Eigennutzung — die ehrliche Rechnung.",
    icon: "⊞"
  },
  {
    nr: "06",
    title: "STEUERLICHE HEBEL",
    subtitle: "Die richtigen Fragen kennen.",
    desc: "Keine Steuerberatung — aber die Orientierung, die du brauchst, bevor du zum Steuerberater gehst. Welche Strukturen du kennen musst. Welche Fragen du stellen solltest.",
    icon: "⟐"
  },
  {
    nr: "07",
    title: "DEIN KAPITALPLAN",
    subtitle: "Zusammenführung.",
    desc: "Alles fließt zusammen in deinen individuellen Strategierahmen. Workbook-basiert. Kein generischer Plan — deine Architektur, deine Zahlen, dein System.",
    icon: "◉"
  }
];

const PROBLEMS = [
  {
    problem: "Du machst Umsatz — aber baust kein Vermögen auf.",
    detail: "Das Geld kommt rein, geht raus, wird reinvestiert. Am Ende des Jahres fragst du dich: Wo ist es hin?"
  },
  {
    problem: "Finanzbildung ist nicht für dich gemacht.",
    detail: "„Spare 20% deines Nettos." — Welches Netto? Du hast fünf Einkommensströme, variable Monate und eine GmbH."
  },
  {
    problem: "Du schiebst die Strukturfrage vor dir her.",
    detail: "Holding? VV-GmbH? Privatvermögen? Du weißt, dass du dich damit beschäftigen müsstest. Aber wann? Und wo anfangen?"
  },
  {
    problem: "Du triffst Kapitalentscheidungen aus dem Bauch.",
    detail: "Reinvestieren oder rausnehmen? Immobilie oder ETF? Du entscheidest situativ statt strategisch — und das kostet dich."
  }
];

const FAQS = [
  {
    q: "Ist das Anlageberatung?",
    a: "Nein. KAPITALARCHITEKTUR ist ein Bildungsprogramm für unternehmerische Kapitalstrategie. Wir vermitteln Denkrahmen und Orientierung — keine individuellen Anlageempfehlungen, keine Produktempfehlungen, keine Renditeversprechen. Für individuelle Finanz-, Steuer- oder Rechtsberatung wende dich bitte an die entsprechenden Fachleute."
  },
  {
    q: "Für wen ist das Programm gemacht?",
    a: "Für digitale Unternehmer, Gründer und Selbstständige im DACH-Raum, die bereits Umsatz machen — aber kein System haben, um daraus Vermögen aufzubauen. Nicht für Anfänger, die noch keinen Euro verdient haben."
  },
  {
    q: "Was bekomme ich konkret?",
    a: "7 Module als Video + Workbook. Strategische Frameworks, Entscheidungstools und einen individuellen Kapitalplan-Baukasten. Kein Frontalunterricht, sondern anwendbare Denkwerkzeuge."
  },
  {
    q: "Ich habe schon einen Steuerberater. Brauche ich das trotzdem?",
    a: "Gerade dann. Dein Steuerberater optimiert deine Steuerlast — aber er baut nicht deine Kapitalstrategie. KAPITALARCHITEKTUR gibt dir die Fragen, die du ihm stellen solltest, und die Struktur, in der seine Antworten Sinn ergeben."
  },
  {
    q: "Wie unterscheidet sich das von Finanzfluss, Immocation & Co.?",
    a: "Die richten sich an Angestellte mit festem Netto. Wir richten uns an Unternehmer mit variablem Cashflow, GmbH-Strukturen und der Frage: Reinvestieren oder rausnehmen? Das ist ein fundamental anderes Spiel."
  },
  {
    q: "Gibt es eine Geld-zurück-Garantie?",
    a: "Ja. 14 Tage Widerrufsrecht nach deutschem Fernabsatzrecht. Wenn du nach Modul 1 merkst, dass es nichts für dich ist — kein Problem."
  }
];

function AnimatedCounter({ end, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = Date.now();
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));
            if (progress < 1) requestAnimationFrame(animate);
          };
          animate();
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function KapitalarchitekturLP() {
  const [openFaq, setOpenFaq] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleFreebieSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  };

  return (
    <div style={{
      fontFamily: "'Outfit', sans-serif",
      background: "#070b14",
      color: "#e8e4df",
      minHeight: "100vh",
      overflowX: "hidden",
      position: "relative"
    }}>
      {(() => {
        const linkId = "ka-fonts";
        if (typeof document !== "undefined" && !document.getElementById(linkId)) {
          const link = document.createElement("link");
          link.id = linkId;
          link.rel = "stylesheet";
          link.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=Outfit:wght@200;300;400;500;600&family=JetBrains+Mono:wght@300;400&display=swap";
          document.head.appendChild(link);
        }
        return null;
      })()}
      <style>{`

        * { margin: 0; padding: 0; box-sizing: border-box; }

        :root {
          --brass: #c4956a;
          --brass-light: #d4a87a;
          --brass-dark: #a07850;
          --bg-deep: #070b14;
          --bg-card: #0d1320;
          --bg-card-hover: #111827;
          --text-primary: #e8e4df;
          --text-secondary: #8b8680;
          --text-muted: #5a5550;
          --grid-line: rgba(196, 149, 106, 0.06);
          --border: rgba(196, 149, 106, 0.12);
        }

        .grid-bg {
          position: fixed;
          inset: 0;
          background-image:
            linear-gradient(var(--grid-line) 1px, transparent 1px),
            linear-gradient(90deg, var(--grid-line) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
          z-index: 0;
        }

        .content { position: relative; z-index: 1; }

        .nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          padding: 16px 32px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          backdrop-filter: blur(20px);
          background: rgba(7, 11, 20, 0.85);
          border-bottom: 1px solid var(--border);
        }

        .nav-logo {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          letter-spacing: 4px;
          color: var(--brass);
          text-transform: uppercase;
        }

        .nav-cta {
          font-family: 'Outfit', sans-serif;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 10px 24px;
          background: var(--brass);
          color: var(--bg-deep);
          border: none;
          cursor: pointer;
          transition: all 0.3s;
        }

        .nav-cta:hover {
          background: var(--brass-light);
          transform: translateY(-1px);
        }

        .hero {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 120px 24px 80px;
          position: relative;
        }

        .hero-badge {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          letter-spacing: 4px;
          color: var(--brass);
          text-transform: uppercase;
          margin-bottom: 32px;
          padding: 8px 20px;
          border: 1px solid var(--border);
          display: inline-block;
        }

        .hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(42px, 7vw, 88px);
          font-weight: 300;
          letter-spacing: -1px;
          line-height: 1.05;
          margin-bottom: 28px;
          color: var(--text-primary);
        }

        .hero-title em {
          font-style: italic;
          color: var(--brass);
        }

        .hero-sub {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(16px, 2vw, 20px);
          font-weight: 300;
          color: var(--text-secondary);
          max-width: 620px;
          line-height: 1.7;
          margin-bottom: 48px;
        }

        .hero-cta {
          font-family: 'Outfit', sans-serif;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 3px;
          text-transform: uppercase;
          padding: 18px 48px;
          background: var(--brass);
          color: var(--bg-deep);
          border: none;
          cursor: pointer;
          transition: all 0.4s;
          position: relative;
          overflow: hidden;
        }

        .hero-cta:hover {
          background: var(--brass-light);
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(196, 149, 106, 0.25);
        }

        .hero-cta-secondary {
          font-family: 'Outfit', sans-serif;
          font-size: 12px;
          font-weight: 300;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 14px 32px;
          background: transparent;
          color: var(--brass);
          border: 1px solid var(--border);
          cursor: pointer;
          transition: all 0.3s;
          margin-left: 16px;
        }

        .hero-cta-secondary:hover {
          border-color: var(--brass);
          background: rgba(196, 149, 106, 0.06);
        }

        .hero-scroll {
          position: absolute;
          bottom: 40px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          letter-spacing: 3px;
          color: var(--text-muted);
          text-transform: uppercase;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }

        .section {
          padding: 120px 24px;
          max-width: 1100px;
          margin: 0 auto;
        }

        .section-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          letter-spacing: 4px;
          color: var(--brass);
          text-transform: uppercase;
          margin-bottom: 16px;
        }

        .section-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(32px, 4.5vw, 52px);
          font-weight: 300;
          line-height: 1.15;
          margin-bottom: 20px;
        }

        .section-desc {
          font-size: 16px;
          font-weight: 300;
          color: var(--text-secondary);
          max-width: 600px;
          line-height: 1.7;
          margin-bottom: 64px;
        }

        .divider {
          width: 100%;
          max-width: 1100px;
          margin: 0 auto;
          height: 1px;
          background: var(--border);
        }

        /* Problem Section */
        .problems-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2px;
        }

        .problem-card {
          background: var(--bg-card);
          padding: 40px 32px;
          border: 1px solid var(--border);
          transition: all 0.4s;
          position: relative;
          overflow: hidden;
        }

        .problem-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 3px;
          height: 0;
          background: var(--brass);
          transition: height 0.4s;
        }

        .problem-card:hover::before {
          height: 100%;
        }

        .problem-card:hover {
          background: var(--bg-card-hover);
          border-color: rgba(196, 149, 106, 0.2);
        }

        .problem-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px;
          font-weight: 600;
          margin-bottom: 16px;
          line-height: 1.3;
        }

        .problem-detail {
          font-size: 14px;
          font-weight: 300;
          color: var(--text-secondary);
          line-height: 1.7;
        }

        /* Stats */
        .stats-row {
          display: flex;
          justify-content: center;
          gap: 80px;
          flex-wrap: wrap;
          padding: 80px 24px;
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }

        .stat-item {
          text-align: center;
        }

        .stat-number {
          font-family: 'Cormorant Garamond', serif;
          font-size: 56px;
          font-weight: 300;
          color: var(--brass);
          line-height: 1;
          margin-bottom: 8px;
        }

        .stat-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          letter-spacing: 3px;
          color: var(--text-muted);
          text-transform: uppercase;
        }

        /* Modules */
        .module-item {
          display: grid;
          grid-template-columns: 80px 1fr;
          gap: 32px;
          padding: 40px 0;
          border-bottom: 1px solid var(--border);
          transition: all 0.3s;
          cursor: default;
        }

        .module-item:hover {
          padding-left: 16px;
        }

        .module-nr {
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          color: var(--brass);
          letter-spacing: 2px;
          padding-top: 4px;
        }

        .module-icon {
          font-size: 28px;
          color: var(--brass);
          opacity: 0.4;
          margin-top: 8px;
        }

        .module-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 28px;
          font-weight: 600;
          margin-bottom: 4px;
        }

        .module-subtitle {
          font-family: 'Outfit', sans-serif;
          font-size: 14px;
          color: var(--brass);
          font-weight: 400;
          margin-bottom: 12px;
        }

        .module-desc {
          font-size: 14px;
          font-weight: 300;
          color: var(--text-secondary);
          line-height: 1.7;
          max-width: 560px;
        }

        /* Pricing */
        .pricing-container {
          display: flex;
          justify-content: center;
          gap: 32px;
          flex-wrap: wrap;
        }

        .pricing-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          padding: 48px 40px;
          min-width: 320px;
          max-width: 440px;
          flex: 1;
          position: relative;
        }

        .pricing-card.featured {
          border-color: var(--brass);
          background: linear-gradient(180deg, rgba(196, 149, 106, 0.06) 0%, var(--bg-card) 100%);
        }

        .pricing-card.featured::after {
          content: 'EMPFOHLEN';
          position: absolute;
          top: -1px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--brass);
          color: var(--bg-deep);
          font-family: 'JetBrains Mono', monospace;
          font-size: 9px;
          letter-spacing: 3px;
          padding: 6px 20px;
        }

        .pricing-tier {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          letter-spacing: 3px;
          color: var(--brass);
          text-transform: uppercase;
          margin-bottom: 20px;
        }

        .pricing-amount {
          font-family: 'Cormorant Garamond', serif;
          font-size: 56px;
          font-weight: 300;
          margin-bottom: 8px;
        }

        .pricing-period {
          font-size: 13px;
          color: var(--text-muted);
          margin-bottom: 32px;
        }

        .pricing-features {
          list-style: none;
          margin-bottom: 40px;
        }

        .pricing-features li {
          font-size: 14px;
          font-weight: 300;
          color: var(--text-secondary);
          padding: 10px 0;
          border-bottom: 1px solid rgba(196, 149, 106, 0.06);
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }

        .pricing-features li::before {
          content: '—';
          color: var(--brass);
          flex-shrink: 0;
        }

        .pricing-btn {
          width: 100%;
          font-family: 'Outfit', sans-serif;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 16px;
          border: none;
          cursor: pointer;
          transition: all 0.3s;
        }

        .pricing-btn-primary {
          background: var(--brass);
          color: var(--bg-deep);
        }

        .pricing-btn-primary:hover {
          background: var(--brass-light);
          transform: translateY(-1px);
        }

        .pricing-btn-secondary {
          background: transparent;
          color: var(--brass);
          border: 1px solid var(--border);
        }

        .pricing-btn-secondary:hover {
          border-color: var(--brass);
        }

        /* Guarantee */
        .guarantee-box {
          text-align: center;
          padding: 64px 32px;
          border: 1px solid var(--border);
          background: var(--bg-card);
          max-width: 700px;
          margin: 64px auto 0;
        }

        .guarantee-icon {
          font-size: 32px;
          margin-bottom: 20px;
          opacity: 0.6;
        }

        .guarantee-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 24px;
          margin-bottom: 12px;
        }

        .guarantee-text {
          font-size: 14px;
          font-weight: 300;
          color: var(--text-secondary);
          line-height: 1.7;
          max-width: 480px;
          margin: 0 auto;
        }

        /* Freebie */
        .freebie-section {
          background: linear-gradient(135deg, rgba(196, 149, 106, 0.08) 0%, rgba(7, 11, 20, 0) 60%);
          border: 1px solid var(--border);
          padding: 64px 48px;
          display: flex;
          gap: 48px;
          align-items: center;
          flex-wrap: wrap;
        }

        .freebie-content { flex: 1; min-width: 280px; }

        .freebie-form {
          flex: 1;
          min-width: 280px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .freebie-input {
          font-family: 'Outfit', sans-serif;
          font-size: 14px;
          padding: 16px 20px;
          background: rgba(255,255,255,0.04);
          border: 1px solid var(--border);
          color: var(--text-primary);
          outline: none;
          transition: border-color 0.3s;
        }

        .freebie-input:focus {
          border-color: var(--brass);
        }

        .freebie-input::placeholder {
          color: var(--text-muted);
        }

        .freebie-submit {
          font-family: 'Outfit', sans-serif;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 16px;
          background: var(--brass);
          color: var(--bg-deep);
          border: none;
          cursor: pointer;
          transition: all 0.3s;
        }

        .freebie-submit:hover {
          background: var(--brass-light);
        }

        .freebie-legal {
          font-size: 11px;
          color: var(--text-muted);
          line-height: 1.5;
        }

        /* FAQ */
        .faq-item {
          border-bottom: 1px solid var(--border);
          cursor: pointer;
          transition: background 0.3s;
        }

        .faq-item:hover {
          background: rgba(196, 149, 106, 0.02);
        }

        .faq-q {
          padding: 24px 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-family: 'Cormorant Garamond', serif;
          font-size: 20px;
          font-weight: 400;
        }

        .faq-toggle {
          font-family: 'JetBrains Mono', monospace;
          font-size: 18px;
          color: var(--brass);
          transition: transform 0.3s;
          flex-shrink: 0;
          margin-left: 16px;
        }

        .faq-a {
          font-size: 14px;
          font-weight: 300;
          color: var(--text-secondary);
          line-height: 1.7;
          padding: 0 0 24px;
          max-width: 680px;
        }

        /* Testimonial-style social proof */
        .proof-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2px;
        }

        .proof-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          padding: 36px 32px;
        }

        .proof-quote {
          font-family: 'Cormorant Garamond', serif;
          font-size: 18px;
          font-style: italic;
          line-height: 1.6;
          margin-bottom: 20px;
          color: var(--text-primary);
        }

        .proof-author {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          letter-spacing: 2px;
          color: var(--text-muted);
          text-transform: uppercase;
        }

        /* Final CTA */
        .final-cta {
          text-align: center;
          padding: 140px 24px;
          position: relative;
        }

        .final-cta-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(32px, 5vw, 56px);
          font-weight: 300;
          line-height: 1.15;
          margin-bottom: 24px;
        }

        .final-cta-sub {
          font-size: 16px;
          font-weight: 300;
          color: var(--text-secondary);
          margin-bottom: 48px;
          max-width: 520px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.7;
        }

        /* Footer */
        .footer {
          padding: 48px 32px;
          border-top: 1px solid var(--border);
          text-align: center;
        }

        .footer-brand {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          letter-spacing: 3px;
          color: var(--text-muted);
          margin-bottom: 12px;
        }

        .footer-links {
          display: flex;
          justify-content: center;
          gap: 24px;
          margin-bottom: 20px;
        }

        .footer-links a {
          font-size: 12px;
          color: var(--text-muted);
          text-decoration: none;
          transition: color 0.3s;
        }

        .footer-links a:hover { color: var(--brass); }

        .footer-disclaimer {
          font-size: 11px;
          color: var(--text-muted);
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.7;
          padding-top: 20px;
          border-top: 1px solid var(--border);
        }

        /* Sticky mobile CTA */
        .sticky-cta {
          display: none;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 99;
          padding: 12px 16px;
          background: rgba(7, 11, 20, 0.95);
          backdrop-filter: blur(16px);
          border-top: 1px solid var(--border);
        }

        @media (max-width: 768px) {
          .sticky-cta { display: block; }
          .hero { padding: 100px 20px 80px; }
          .section { padding: 80px 20px; }
          .module-item { grid-template-columns: 1fr; gap: 8px; }
          .module-nr { display: flex; gap: 12px; align-items: center; }
          .stats-row { gap: 40px; }
          .freebie-section { padding: 40px 24px; }
          .pricing-card { min-width: 100%; }
          .hero-cta-secondary { margin-left: 0; margin-top: 12px; }
          .hero-ctas { display: flex; flex-direction: column; align-items: center; }
        }

        @media (min-width: 769px) {
          .hero-ctas { display: flex; align-items: center; }
        }
      `}</style>

      <div className="grid-bg" />

      <div className="content">
        {/* NAV */}
        <nav className="nav">
          <div className="nav-logo">Kapitalarchitektur</div>
          <button className="nav-cta">Programm sichern</button>
        </nav>

        {/* HERO */}
        <section className="hero">
          <div className="hero-badge">Ein LibryX Program</div>
          <h1 className="hero-title">
            Kapital<em>architektur</em>
          </h1>
          <p className="hero-sub">
            Das strategische Programm für digitale Unternehmer, die Umsatz machen — aber kein System haben, um daraus Vermögen aufzubauen.
          </p>
          <div className="hero-ctas">
            <button className="hero-cta">Zugang sichern — 199€</button>
            <button className="hero-cta-secondary">Kostenloser Guide ↓</button>
          </div>
          <div className="hero-scroll">↓ Scrollen</div>
        </section>

        {/* STATS */}
        <div className="stats-row">
          <div className="stat-item">
            <div className="stat-number"><AnimatedCounter end={73} suffix="%" /></div>
            <div className="stat-label">der Gründer ohne Kapitalstrategie</div>
          </div>
          <div className="stat-item">
            <div className="stat-number"><AnimatedCounter end={7} /></div>
            <div className="stat-label">strategische Module</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">∞</div>
            <div className="stat-label">Zugang — einmal zahlen</div>
          </div>
        </div>

        {/* PROBLEM */}
        <section className="section">
          <div className="section-label">Das Problem</div>
          <h2 className="section-title">Umsatz ist nicht Vermögen.</h2>
          <p className="section-desc">
            Die meisten Finanzinhalte richten sich an Angestellte mit festem Netto. 
            Du bist keiner. Dein Spiel hat andere Regeln.
          </p>
          <div className="problems-grid">
            {PROBLEMS.map((p, i) => (
              <div className="problem-card" key={i}>
                <div className="problem-text">{p.problem}</div>
                <div className="problem-detail">{p.detail}</div>
              </div>
            ))}
          </div>
        </section>

        <div className="divider" />

        {/* SOCIAL PROOF */}
        <section className="section">
          <div className="section-label">Realität</div>
          <h2 className="section-title">Was Gründer sagen, die dort standen.</h2>
          <div style={{ marginBottom: 64 }} />
          <div className="proof-grid">
            <div className="proof-card">
              <div className="proof-quote">
                „Ich habe in drei Jahren sechsstellig umgesetzt und hatte am Ende weniger Privatvermögen als vorher. Kein Finanz-YouTuber hat mir erklären können, warum."
              </div>
              <div className="proof-author">Agenturinhaber, 34 — München</div>
            </div>
            <div className="proof-card">
              <div className="proof-quote">
                „Mein Steuerberater optimiert meine Steuerlast. Aber die Frage, wie ich Vermögen aufbaue, konnte er nie beantworten. Das sind zwei völlig verschiedene Dinge."
              </div>
              <div className="proof-author">E-Commerce-Gründerin, 29 — Berlin</div>
            </div>
            <div className="proof-card">
              <div className="proof-quote">
                „Ich wusste nicht, ob ich reinvestieren oder rausnehmen soll. Also habe ich beides gleichzeitig gemacht — und beides schlecht."
              </div>
              <div className="proof-author">SaaS-Gründer, 37 — Wien</div>
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* MODULES */}
        <section className="section">
          <div className="section-label">Das Programm</div>
          <h2 className="section-title">7 Module. Ein System.</h2>
          <p className="section-desc">
            Keine generische Finanzbildung. Sondern ein Strategierahmen, der für dein Unternehmerdasein gebaut ist.
          </p>
          {MODULES.map((m, i) => (
            <div className="module-item" key={i}>
              <div>
                <div className="module-nr">M—{m.nr}</div>
                <div className="module-icon">{m.icon}</div>
              </div>
              <div>
                <div className="module-title">{m.title}</div>
                <div className="module-subtitle">{m.subtitle}</div>
                <div className="module-desc">{m.desc}</div>
              </div>
            </div>
          ))}
        </section>

        <div className="divider" />

        {/* FREEBIE / LEAD MAGNET */}
        <section className="section">
          <div className="freebie-section">
            <div className="freebie-content">
              <div className="section-label">Kostenloser Guide</div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 300, marginBottom: 16, lineHeight: 1.2 }}>
                Die 5 Kapitalfehler<br />digitaler Unternehmer.
              </h2>
              <p style={{ fontSize: 14, fontWeight: 300, color: "var(--text-secondary)", lineHeight: 1.7 }}>
                Ein 12-seitiger Guide, der dir zeigt, welche fünf Denkfehler die meisten Gründer jedes Jahr fünfstellig kosten — und wie du sie vermeidest. 
                Kein Verkaufspitch. Keine Produktempfehlung. Nur Klarheit.
              </p>
            </div>
            <div className="freebie-form">
              {submitted ? (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, marginBottom: 8 }}>Check dein Postfach.</div>
                  <div style={{ fontSize: 14, color: "var(--text-secondary)" }}>Der Guide ist unterwegs.</div>
                </div>
              ) : (
                <>
                  <input
                    type="email"
                    className="freebie-input"
                    placeholder="Deine E-Mail-Adresse"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button className="freebie-submit" onClick={handleFreebieSubmit}>
                    Kostenlosen Guide erhalten
                  </button>
                  <div className="freebie-legal">
                    Kein Spam. Du erhältst den Guide und gelegentliche strategische Impulse. 
                    Jederzeit abmeldbar. Datenschutz gemäß DSGVO.
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* NOT-FOR-SECTION */}
        <section className="section" style={{ textAlign: "center" }}>
          <div className="section-label">Ehrliche Erwartung</div>
          <h2 className="section-title">Das ist nichts für dich, wenn —</h2>
          <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "left" }}>
            {[
              "du nach einem „reich werden"-System suchst.",
              "du noch keinen regelmäßigen Umsatz machst.",
              "du konkrete Anlageempfehlungen erwartest.",
              "du glaubst, ein YouTube-Video reicht als Strategie."
            ].map((item, i) => (
              <div key={i} style={{
                padding: "16px 0",
                borderBottom: "1px solid var(--border)",
                fontSize: 15,
                fontWeight: 300,
                color: "var(--text-secondary)",
                display: "flex",
                gap: 12,
                alignItems: "flex-start"
              }}>
                <span style={{ color: "var(--brass)", flexShrink: 0 }}>✕</span>
                {item}
              </div>
            ))}
          </div>
          <div style={{ maxWidth: 600, margin: "40px auto 0", textAlign: "left" }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: 3, color: "var(--brass)", marginBottom: 16, textTransform: "uppercase" }}>
              Aber genau richtig, wenn —
            </div>
            {[
              "du Umsatz machst, aber kein Vermögen aufbaust.",
              "du als Gründer einen strategischen Rahmen brauchst.",
              "du die richtigen Fragen stellen willst — an deinen Steuerberater, an deine Bank, an dich selbst.",
              "du bereit bist, Kapital als System zu denken, nicht als Bauchgefühl."
            ].map((item, i) => (
              <div key={i} style={{
                padding: "16px 0",
                borderBottom: "1px solid var(--border)",
                fontSize: 15,
                fontWeight: 300,
                color: "var(--text-primary)",
                display: "flex",
                gap: 12,
                alignItems: "flex-start"
              }}>
                <span style={{ color: "var(--brass)", flexShrink: 0 }}>—</span>
                {item}
              </div>
            ))}
          </div>
        </section>

        <div className="divider" />

        {/* PRICING */}
        <section className="section" style={{ textAlign: "center" }}>
          <div className="section-label">Investition</div>
          <h2 className="section-title">Ein Preis. Kein Abo.</h2>
          <p className="section-desc" style={{ margin: "0 auto 64px" }}>
            Lebenslanger Zugang zu allen Modulen, Workbooks und zukünftigen Updates.
          </p>
          <div className="pricing-container">
            <div className="pricing-card">
              <div className="pricing-tier">Essential</div>
              <div className="pricing-amount">149€</div>
              <div className="pricing-period">Einmalzahlung · inkl. MwSt.</div>
              <ul className="pricing-features">
                <li>7 Videomodule</li>
                <li>Workbook pro Modul (PDF)</li>
                <li>Kapitalplan-Template</li>
                <li>Lebenslanger Zugang</li>
              </ul>
              <button className="pricing-btn pricing-btn-secondary">Zugang sichern</button>
            </div>
            <div className="pricing-card featured">
              <div className="pricing-tier">Komplett</div>
              <div className="pricing-amount">199€</div>
              <div className="pricing-period">Einmalzahlung · inkl. MwSt.</div>
              <ul className="pricing-features">
                <li>Alles aus Essential</li>
                <li>Steuerberater-Fragenkatalog</li>
                <li>Immobilien-Checkliste für Selbstständige</li>
                <li>Holding-Entscheidungsmatrix</li>
                <li>Alle zukünftigen Bonus-Module</li>
              </ul>
              <button className="pricing-btn pricing-btn-primary">Komplett-Zugang sichern</button>
            </div>
          </div>
          <div className="guarantee-box">
            <div className="guarantee-icon">⊘</div>
            <div className="guarantee-title">14 Tage. Kein Risiko.</div>
            <div className="guarantee-text">
              Du hast 14 Tage Widerrufsrecht nach deutschem Fernabsatzrecht. 
              Wenn KAPITALARCHITEKTUR nicht das richtige Werkzeug für dich ist — 
              bekommst du dein Geld zurück. Ohne Diskussion.
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* FAQ */}
        <section className="section">
          <div className="section-label">Fragen & Antworten</div>
          <h2 className="section-title">Bevor du entscheidest.</h2>
          <div style={{ marginTop: 48 }}>
            {FAQS.map((faq, i) => (
              <div className="faq-item" key={i} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <div className="faq-q">
                  <span>{faq.q}</span>
                  <span className="faq-toggle" style={{ transform: openFaq === i ? "rotate(45deg)" : "none" }}>+</span>
                </div>
                {openFaq === i && <div className="faq-a">{faq.a}</div>}
              </div>
            ))}
          </div>
        </section>

        <div className="divider" />

        {/* FINAL CTA */}
        <section className="final-cta">
          <div className="section-label">Bereit?</div>
          <h2 className="final-cta-title">
            Umsatz hast du.<br />
            Jetzt bau das System<br />
            <span style={{ color: "var(--brass)" }}>dahinter.</span>
          </h2>
          <p className="final-cta-sub">
            KAPITALARCHITEKTUR gibt dir den strategischen Rahmen, den kein Finanz-YouTuber und kein Steuerberater für dich baut.
          </p>
          <button className="hero-cta">Jetzt starten — 199€</button>
        </section>

        {/* FOOTER */}
        <footer className="footer">
          <div className="footer-brand">KAPITALARCHITEKTUR · Ein LibryX Program</div>
          <div className="footer-links">
            <a href="#">Impressum</a>
            <a href="#">Datenschutz</a>
            <a href="#">AGB</a>
            <a href="#">Widerrufsbelehrung</a>
          </div>
          <div className="footer-disclaimer">
            Dieses Programm bietet unternehmerische Bildung und strategische Orientierung. 
            Es handelt sich ausdrücklich nicht um individuelle Anlageberatung, Steuerberatung 
            oder Rechtsberatung im Sinne des §34f GewO, StBerG oder RDG. Für individuelle 
            Finanzentscheidungen wende dich bitte an die entsprechenden Fachleute. 
            Alle genannten Strategien und Frameworks dienen der Orientierung — 
            Ergebnisse hängen von deiner individuellen Situation ab.
            <br /><br />
            HIGHERPlan GmbH · Dorfstraße 43 · 39539 Havelberg · HRB 37179, Amtsgericht Stendal
            <br />
            Geschäftsführer: Dennis Goldhammer, Tarek Zeidan
          </div>
        </footer>

        {/* STICKY MOBILE CTA */}
        <div className="sticky-cta">
          <button className="hero-cta" style={{ width: "100%", padding: "14px" }}>
            Zugang sichern — 199€
          </button>
        </div>
      </div>
    </div>
  );
}
