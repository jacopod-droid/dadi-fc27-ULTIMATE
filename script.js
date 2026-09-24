let currentMode = 'd20'; // 'd20' oppure 'd6'

// Database Imprevisti D20
const imprevistiD20 = [
  { range: [1, 2], title: "Tensioni nello Spogliatoio", desc: "Il tuo giocatore con l'overall più alto salta per scelta tecnica la prima partita del mese." },
  { range: [3, 4], title: "Stanchezza / Rotazioni", desc: "Alla prima gara del mese devi schierare titolari almeno 4 riserve (o giocatori <75 overall)." },
  { range: [5, 6], title: "Il Pupillo della Chat", desc: "Sondaggio rapido: la chat sceglie una riserva che giocherà almeno 45 minuti nel mese." },
  { range: [7, 8], title: "Focus Giovani", desc: "Per tutte le gare del mese schiera titolare fisso almeno un Under 21 o un Primavera." },
  { range: [9, 12], title: "Spogliatoio Sereno", desc: "Mese tranquillo: nessuna restrizione tattica o di formazione." },
  { range: [13, 14], title: "Modulo dalla Chat", desc: "Il modulo per la partita più importante del mese viene scelto dalla chat in live." },
  { range: [15, 16], title: "Rotazione Obbligatoria", desc: "Tra una partita e l'altra fai almeno 5 cambi nell'undici titolare per simulare impegni ravvicinati." },
  { range: [17, 18], title: "Esplosione Primavera", desc: "Promuovi un giovane dal vivaio e dagli almeno una presenza da titolare entro fine mese." },
  { range: [19, 20], title: "Rinnovo Chiave", desc: "Rinnova il contratto al giocatore con più presenze (o dagli la fascia di capitano)." }
];

// Database Regole D6 - Bilancio
const regoleD6Bilancio = [
  { range: [1, 2], title: "Fair Play Finanziario", desc: "Stretta di bilancio: puoi spendere al massimo il 50% del budget trasferimenti iniziale." },
  { range: [3, 4], title: "Gestione Standard", desc: "Nessun vincolo speciale. Uso libero del budget fornito dalla società." },
  { range: [5, 6], title: "Mercato a Saldo Zero", desc: "Acquisti consentiti SOLO reinvestendo gli incassi delle vendite (Budget = Cessioni)." }
];

// Database Regole D6 - Mercato Cessioni
const regoleD6Mercato = [
  { range: [1, 2], title: "Spinta per la Cessione", desc: "Il giocatore vuole andare via: obbligo di accettare l'offerta o trattare al massimo fino a +20% sul valore." },
  { range: [3, 4], title: "Trattativa Libera", desc: "Nessun vincolo: puoi accettare, rifiutare o richiedere una controofferta a tua scelta." },
  { range: [5, 6], title: "Amore per la Maglia", desc: "Il giocatore rifiuta la destinazione e blocca la trattativa: rifiuta l'offerta subito." }
];

// Cambio Tab (D20 vs D6)
function switchMode(mode) {
  currentMode = mode;
  document.getElementById('tab-d20').classList.toggle('active', mode === 'd20');
  document.getElementById('tab-d6').classList.toggle('active', mode === 'd6');
  
  const d6Options = document.getElementById('d6-options');
  if (mode === 'd6') {
    d6Options.classList.remove('hidden');
    document.getElementById('dice-display').innerText = "D6";
  } else {
    d6Options.classList.add('hidden');
    document.getElementById('dice-display').innerText = "D20";
  }

  document.getElementById('title').innerText = "Pronto al lancio";
  document.getElementById('description').innerText = mode === 'd20' ? "Incrocia le dita per l'imprevisto del mese!" : "Seleziona la tipologia e lancia il D6.";
}

// Funzione di Lancio del Dado
function rollDice() {
  const diceDisplay = document.getElementById('dice-display');
  const btn = document.getElementById('roll-btn');
  const titleEl = document.getElementById('title');
  const descEl = document.getElementById('description');

  const maxVal = currentMode === 'd20' ? 20 : 6;

  btn.disabled = true;
  diceDisplay.classList.add('rolling');

  setTimeout(() => {
    const rolledValue = Math.floor(Math.random() * maxVal) + 1;
    diceDisplay.classList.remove('rolling');
    diceDisplay.innerText = rolledValue;

    let risultato = null;

    if (currentMode === 'd20') {
      risultato = imprevistiD20.find(item => rolledValue >= item.range[0] && rolledValue <= item.range[1]);
    } else {
      const d6Type = document.querySelector('input[name="d6-type"]:checked').value;
      const targetDb = d6Type === 'bilancio' ? regoleD6Bilancio : regoleD6Mercato;
      risultato = targetDb.find(item => rolledValue >= item.range[0] && rolledValue <= item.range[1]);
    }

    if (risultato) {
      titleEl.innerText = `[Risultato: ${rolledValue}] ${risultato.title}`;
      descEl.innerText = risultato.desc;
    }

    btn.disabled = false;
  }, 700);
}