import React, { useState } from 'react';
import { 
  Shield, ShieldAlert, CreditCard, MessageSquare, Play, HelpCircle, 
  CheckCircle, Landmark, Terminal, Cpu, Network, ArrowRight, ShieldCheck,
  AlertOctagon, CheckCircle2, User, Database, RefreshCw
} from 'lucide-react';

interface LogEntry {
  time: string;
  type: 'POP' | 'SHIELD' | 'SOVEREIGN';
  message: string;
}

export default function App() {
  const [activeView, setActiveView] = useState<'pop' | 'shield'>('pop');
  
  // Sovereign general stats
  const [securedVolume, setSecuredVolume] = useState<number>(1840000); // F CFA
  const [threatsBlocked, setThreatsBlocked] = useState<number>(2410);

  // Kékéli-Pop: Voice accounting state
  const [voiceInput, setVoiceInput] = useState("Vente de 3 paniers de bananes a Mme Kafui pour 6000 F CFA paye via T-Money");
  const [isProcessingVoice, setIsProcessingVoice] = useState(false);
  const [voiceReceipt, setVoiceReceipt] = useState<any>(null);

  // Kékéli-Pop: Anti-Fraud state
  const [smsInput, setSmsInput] = useState("Félicitations ! Vous avez gagné 500 000 F de la part de Togocom. Pour réclamer votre gain, veuillez taper le code *145*2*1*90123456*500000# puis valider.");
  const [fraudAnalysis, setFraudAnalysis] = useState<any>(null);
  const [isAnalysingFraud, setIsAnalysingFraud] = useState(false);

  // Kékéli-Shield: Code auditor state
  const [vulnFixed, setVulnFixed] = useState(false);

  // Kékéli-Shield: Active defense logs
  const [sysLogs, setSysLogs] = useState<LogEntry[]>([
    { time: "23:55:01", type: "SOVEREIGN", message: "Demarrage du serveur souverain local (Lome Node)" },
    { time: "23:56:12", type: "SHIELD", message: "Claw Code daemon a bloque une tentative d'injection SQL sur l'API Admin" },
    { time: "23:57:45", type: "POP", message: "Transaction Mobile Money FedaPay traitee avec succes pour 15000 F CFA" }
  ]);

  const handleVoiceProcess = () => {
    setIsProcessingVoice(true);
    setVoiceReceipt(null);

    setTimeout(() => {
      setIsProcessingVoice(false);
      // Simulate parser
      let amount = 6000;
      let client = "Mme Kafui";
      let item = "3 paniers de bananes";
      let gateway = "T-Money";

      if (voiceInput.toLowerCase().includes('manioc')) {
        item = "1 sac de manioc";
        amount = 8000;
        client = "M. Kodjo";
        gateway = "Flooz";
      }

      setVoiceReceipt({
        id: `KEK-${Math.floor(1000 + Math.random() * 9000)}`,
        date: new Date().toISOString().substring(0, 16).replace('T', ' '),
        client,
        item,
        amount,
        gateway,
        netProfit: Math.floor(amount * 0.3) // 30% mock margin
      });

      setSecuredVolume(prev => prev + amount);

      setSysLogs(prev => [
        { 
          time: new Date().toLocaleTimeString(), 
          type: "POP", 
          message: `Facture generee pour ${client}. CA +${amount} F CFA via ${gateway}` 
        },
        ...prev
      ]);
    }, 1200);
  };

  const handleFraudScan = () => {
    setIsAnalysingFraud(true);
    setFraudAnalysis(null);

    setTimeout(() => {
      setIsAnalysingFraud(false);
      // Parse query
      if (smsInput.includes('*145*')) {
        setFraudAnalysis({
          scamProbability: 98.6,
          urgencyFactor: "CRITICAL (Promesse de gain eleve + incitation immediate)",
          technique: "Ingénierie sociale (Fausse loterie Togocom + code USSD de transfert de fonds camoufle)",
          action: "SMS bloque. Notification envoyee au reseau anti-scam ScamShield."
        });
        setThreatsBlocked(prev => prev + 1);
        setSysLogs(prev => [
          { time: new Date().toLocaleTimeString(), type: "SHIELD", message: "Tentative d'arnaque USSD interceptee et bloquee." },
          ...prev
        ]);
      } else {
        setFraudAnalysis({
          scamProbability: 12.4,
          urgencyFactor: "Faible",
          technique: "Message standard",
          action: "Message autorise."
        });
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen text-slate-100 flex flex-col p-4 md:p-8 space-y-6">
      
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center md:justify-between pb-6 border-b border-yellow-500/20 space-y-4 md:space-y-0">
        <div className="flex items-center space-x-3">
          <span className="text-3xl">✨</span>
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-400 via-yellow-200 to-red-400 bg-clip-text text-transparent title-font">
              Kékéli-AI Sovereign Platform
            </h1>
            <p className="text-slate-400 text-sm mt-0.5 font-medium">
              Plateforme souveraine d'agents IA hybrides (FinTech Vocale & Cyber-Sentinelle)
            </p>
          </div>
        </div>

        {/* Sovereign Memory Panel */}
        <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl flex items-center space-x-4 font-mono text-xs">
          <div>
            <span className="text-[10px] text-slate-500 block uppercase">Local Node</span>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping"></span>
              Lomé Active
            </span>
          </div>
          <div className="w-[1px] h-8 bg-slate-800"></div>
          <div>
            <span className="text-[10px] text-slate-500 block uppercase">Souverainete</span>
            <span className="text-yellow-400 font-bold">Données 100% locales</span>
          </div>
        </div>
      </header>

      {/* Main Stats bar */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="kekeli-glass p-4 rounded-xl flex flex-col justify-between border-t-3 border-emerald-500">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">Volume Securise</span>
          <div className="mt-2">
            <h3 className="text-xl md:text-2xl font-extrabold text-emerald-400 font-mono">
              {securedVolume.toLocaleString()} F CFA
            </h3>
            <span className="text-[10px] text-slate-500">Flux financiers PME</span>
          </div>
        </div>

        <div className="kekeli-glass p-4 rounded-xl flex flex-col justify-between border-t-3 border-red-500">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">Attaques Bloquees</span>
          <div className="mt-2">
            <h3 className="text-xl md:text-2xl font-extrabold text-red-500 font-mono">{threatsBlocked}</h3>
            <span className="text-[10px] text-slate-500">UFW & ScamShield filters</span>
          </div>
        </div>

        <div className="kekeli-glass p-4 rounded-xl flex flex-col justify-between border-t-3 border-yellow-500">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">Modeles Locaux</span>
          <div className="mt-2">
            <h3 className="text-xl md:text-2xl font-extrabold text-yellow-400 font-mono">Hermes-Togo</h3>
            <span className="text-[10px] text-slate-500">Fine-tune Éwé / Kabyè</span>
          </div>
        </div>

        <div className="kekeli-glass p-4 rounded-xl flex flex-col justify-between border-t-3 border-cyan-500">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">Latency</span>
          <div className="mt-2">
            <h3 className="text-xl md:text-2xl font-extrabold text-cyan-400 font-mono">14 ms</h3>
            <span className="text-[10px] text-slate-500">Temps de reponse Edge</span>
          </div>
        </div>
      </section>

      {/* View Toggle */}
      <div className="flex border-b border-slate-800 space-x-2 font-mono">
        <button
          onClick={() => setActiveView('pop')}
          className={`px-4 py-2 text-sm font-semibold border-b-2 transition ${
            activeView === 'pop' ? 'border-yellow-500 text-yellow-400' : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          Kékéli-Pop (Public & PME)
        </button>
        <button
          onClick={() => setActiveView('shield')}
          className={`px-4 py-2 text-sm font-semibold border-b-2 transition ${
            activeView === 'shield' ? 'border-red-500 text-red-400' : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          Kékéli-Shield (Entreprise & Admin)
        </button>
      </div>

      {/* Main Content View */}
      <main className="flex-1">
        
        {/* Kékéli-Pop view */}
        {activeView === 'pop' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left: Voice notes accounting assistant */}
            <div className="lg:col-span-6 flex flex-col space-y-6">
              
              <div className="kekeli-glass p-6 rounded-xl space-y-4">
                <h2 className="text-base font-bold flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-yellow-500" /> Assistant d'Affaires Vocal (WhatsApp / Telegram)
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-slate-400 block mb-1.5 font-medium">Message vocal transcrit</label>
                    <textarea
                      value={voiceInput}
                      onChange={(e) => setVoiceInput(e.target.value)}
                      rows={3}
                      className="w-full text-xs bg-slate-950 border border-slate-800 p-2.5 rounded-lg text-white focus:outline-none"
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => { setVoiceInput("Aujourd'hui j'ai achete 5 sacs de maïs a 12000 F CFA chacun et j'ai vendu 2 sacs a 15000 F CFA via Flooz"); }}
                      className="px-2 py-1 bg-slate-800 text-[10px] rounded text-slate-400 hover:text-white border border-slate-700"
                    >
                      Preset: Vente Maïs
                    </button>
                    <button
                      onClick={() => { setVoiceInput("Vente de 1 sac de manioc pour 8000 F CFA paye via Flooz a M. Kodjo"); }}
                      className="px-2 py-1 bg-slate-800 text-[10px] rounded text-slate-400 hover:text-white border border-slate-700"
                    >
                      Preset: Vente Manioc
                    </button>
                  </div>

                  <button
                    onClick={handleVoiceProcess}
                    disabled={isProcessingVoice}
                    className="w-full py-2.5 rounded-lg btn-kekeli text-xs font-bold flex items-center justify-center gap-1.5"
                  >
                    {isProcessingVoice ? "Traitement vocal..." : "Traiter la transaction vocale"}
                  </button>
                </div>
              </div>

              {/* Receipt generator display */}
              {voiceReceipt && (
                <div className="receipt-bg p-6 rounded-xl text-stone-900 font-mono text-xs space-y-4 shadow-xl border border-stone-300 fade-in">
                  <div className="text-center pb-3 border-b border-dashed border-stone-400 font-bold">
                    <h3 className="text-sm tracking-wide">KÉKÉLI COMPTA MOBILE</h3>
                    <p className="text-[10px] font-normal"> Lomé Grand Marché - TOGO</p>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex justify-between">
                      <span>REF FACTURE:</span>
                      <span className="font-bold">{voiceReceipt.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>CLIENT:</span>
                      <span>{voiceReceipt.client}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>DATE:</span>
                      <span>{voiceReceipt.date}</span>
                    </div>
                  </div>
                  <div className="border-t border-b border-dashed border-stone-400 py-3 space-y-1">
                    <div className="flex justify-between font-bold">
                      <span>ARTICLE</span>
                      <span>MONTANT</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{voiceReceipt.item}</span>
                      <span>{voiceReceipt.amount} F</span>
                    </div>
                  </div>
                  <div className="flex justify-between font-bold text-sm">
                    <span>NET APPORT:</span>
                    <span>{voiceReceipt.amount} F CFA</span>
                  </div>
                  <div className="text-center text-[9px] pt-3 border-t border-dashed border-stone-400">
                    <p>Payé par {voiceReceipt.gateway}</p>
                    <p className="mt-1 text-emerald-700 font-bold">Bénéfice estimé: +{voiceReceipt.netProfit} F CFA</p>
                  </div>
                </div>
              )}

            </div>

            {/* Right: Anti-Scam Shield Simulator */}
            <div className="lg:col-span-6 flex flex-col space-y-6">
              
              <div className="kekeli-glass p-6 rounded-xl space-y-4">
                <h2 className="text-base font-bold flex items-center gap-2">
                  <AlertOctagon className="h-5 w-5 text-yellow-500 animate-pulse" /> Bouclier Anti-Fraude Mobile Money
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-slate-400 block mb-1.5 font-medium">Contenu du SMS suspect recu</label>
                    <textarea
                      value={smsInput}
                      onChange={(e) => setSmsInput(e.target.value)}
                      rows={4}
                      className="w-full text-xs bg-slate-950 border border-slate-800 p-2.5 rounded-lg text-white focus:outline-none"
                    />
                  </div>

                  <button
                    onClick={handleFraudScan}
                    disabled={isAnalysingFraud}
                    className="w-full py-2.5 rounded-lg bg-yellow-600 hover:bg-yellow-500 text-white font-bold text-xs btn-kekeli"
                  >
                    {isAnalysingFraud ? "Scan de securite..." : "Scanner le message (Cialdini Engine)"}
                  </button>
                </div>
              </div>

              {/* Fraud result display */}
              {fraudAnalysis && (
                <div className="kekeli-glass p-6 rounded-xl space-y-4 border-l-4 border-red-500 fade-in">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <h3 className="text-sm font-bold text-red-500">Analyse de Menace Mobile Money</h3>
                    <span className="text-xs bg-red-500/10 text-red-400 px-2 py-0.5 rounded font-mono">
                      Probabilite d'Arnaque: {fraudAnalysis.scamProbability}%
                    </span>
                  </div>

                  <div className="space-y-3 font-mono text-xs">
                    <div>
                      <span className="text-[10px] text-slate-500 block uppercase">Facteur d'Urgence</span>
                      <p className="text-slate-200 mt-0.5">{fraudAnalysis.urgencyFactor}</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block uppercase">Technique Psychologique</span>
                      <p className="text-slate-200 mt-0.5">{fraudAnalysis.technique}</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block uppercase">Action Securite</span>
                      <p className="text-red-400 font-bold mt-0.5">{fraudAnalysis.action}</p>
                    </div>
                  </div>
                </div>
              )}

            </div>

          </div>
        )}

        {/* Kékéli-Shield view */}
        {activeView === 'shield' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left: Code auditor */}
            <div className="lg:col-span-6 flex flex-col space-y-6">
              <div className="kekeli-glass p-6 rounded-xl space-y-4">
                <h2 className="text-base font-bold flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-red-500" /> DevSecOps Moteur d'Audit Continue
                </h2>

                <div className="p-4 bg-slate-950 border border-slate-850 rounded-xl space-y-3 font-mono text-xs">
                  <div className="flex justify-between pb-2 border-b border-slate-850">
                    <span>Fichier cible:</span>
                    <span className="text-indigo-400">ScamShield/db_helper.rs</span>
                  </div>
                  
                  <div className="space-y-1">
                    <span className="text-[10px] text-red-400 block uppercase">Vulnérabilité Detectee (Claw AST)</span>
                    <p className="text-slate-300">Fuite de memoire potentielle et acces non synchronise sur la base sqlite locale.</p>
                  </div>

                  <div className="p-2.5 bg-red-950/20 border border-red-900/30 text-red-400 rounded">
                    {vulnFixed ? (
                      <span className="text-emerald-400">✔ Code securise et synchronise via Mutex thread-safe.</span>
                    ) : (
                      <span>Unsafe raw pointer assignment without thread Mutex validation.</span>
                    )}
                  </div>

                  {!vulnFixed && (
                    <button
                      onClick={() => setVulnFixed(true)}
                      className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white rounded text-[10px] font-bold"
                    >
                      Corriger et Patch via Claw Code
                    </button>
                  )}
                </div>
              </div>

              {/* Host defense logs */}
              <div className="kekeli-glass p-6 rounded-xl space-y-4">
                <h3 className="text-sm font-bold text-slate-200">System Activity Terminal</h3>
                <div className="bg-slate-950 p-4 rounded-lg font-mono text-[10px] text-slate-300 h-44 overflow-y-auto space-y-1.5 border border-slate-900">
                  {sysLogs.map((log, i) => (
                    <p key={i}>
                      <span className="text-slate-600">[{log.time}]</span>
                      <span className={`ml-2 px-1 rounded text-[8px] font-bold ${
                        log.type === 'SHIELD' ? 'bg-red-500/20 text-red-400' :
                        log.type === 'POP' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {log.type}
                      </span>
                      <span className="ml-2">{log.message}</span>
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Intrusion detection console */}
            <div className="lg:col-span-6 togo-card togo-card-warning p-6 rounded-xl space-y-6">
              <h2 className="text-base font-bold flex items-center gap-2">
                <Network className="h-5 w-5 text-yellow-500" /> Demon de Securite Active (SysAdmin)
              </h2>

              <div className="space-y-4">
                <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-xl space-y-2">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span>Moniteur reseau local</span>
                    <span className="text-emerald-400">STATUS: ACTIVE</span>
                  </div>
                  
                  {/* Simulated network traffic graph */}
                  <div className="h-16 flex items-end gap-1 pt-4 border-b border-slate-850">
                    <div className="w-full h-8 bg-emerald-500/20 rounded"></div>
                    <div className="w-full h-6 bg-emerald-500/20 rounded"></div>
                    <div className="w-full h-10 bg-emerald-500/20 rounded"></div>
                    <div className="w-full h-14 bg-red-500/40 rounded animate-pulse"></div>
                    <div className="w-full h-4 bg-emerald-500/20 rounded"></div>
                    <div className="w-full h-7 bg-emerald-500/20 rounded"></div>
                  </div>
                  <p className="text-[10px] text-slate-500 text-center">Trafic Reseau (DDoS filtre actif de 15:40 a 15:45)</p>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Firewall Actif</span>
                  <div className="space-y-2 font-mono text-xs">
                    <div className="p-3 bg-slate-950 rounded border border-slate-850 flex items-center justify-between">
                      <span className="text-red-400">DROP ALL 103.85.28.14 (SSH brute force)</span>
                      <span className="text-[10px] text-slate-500">Règle UFW</span>
                    </div>
                    <div className="p-3 bg-slate-950 rounded border border-slate-850 flex items-center justify-between">
                      <span className="text-red-400">DROP ALL 185.220.101.4 (Scam scan)</span>
                      <span className="text-[10px] text-slate-500">Règle UFW</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

      </main>
    </div>
  );
}
