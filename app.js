const statusBox = document.getElementById('status');
const checkBtn = document.getElementById('checkBtn');

function setStatus(kind, html) {
  statusBox.className = `status ${kind}`;
  statusBox.innerHTML = html;
}

checkBtn.textContent = 'Connecter SafePal';

checkBtn.addEventListener('click', async () => {
  try {
    const provider = window.safepal;

    if (!provider) {
      setStatus(
        'bad',
        'SafePal non détecté. Ouvre cette page depuis le navigateur DApp de SafePal.'
      );
      return;
    }

    setStatus('neutral', 'Demande de connexion envoyée à SafePal…');

    try {
      await provider.connect();

      let publicKey = null;

      if (typeof provider.getAccount === 'function') {
        publicKey = await provider.getAccount();
      }

      if (!publicKey && provider.publicKey) {
        publicKey = provider.publicKey.toString();
      }

      setStatus(
        'ok',
        '<strong>SafePal connecté.</strong>' +
          (publicKey ? `<br><br>Wallet Solana : <code>${publicKey}</code>` : '') +
          '<br><br>Aucune transaction n’a été créée, signée ou envoyée.'
      );
    } catch (err) {
      setStatus(
        'bad',
        `Connexion refusée ou impossible : ${String(err?.message || err)}`
      );
    }
  } catch (err) {
    setStatus('bad', `Erreur : ${String(err?.message || err)}`);
  }
});
