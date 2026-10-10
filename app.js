const statusBox = document.getElementById('status');
const checkBtn = document.getElementById('checkBtn');

function setStatus(kind, html) {
  statusBox.className = `status ${kind}`;
  statusBox.innerHTML = html;
}

checkBtn.addEventListener('click', async () => {
  try {
    const provider = window.safepal || window.solana || null;

    if (!provider) {
      setStatus('bad', 'SafePal non détecté. Ouvre cette page depuis le navigateur DApp de SafePal.');
      return;
    }

    let publicKey = null;

    try {
      if (provider.connect) {
        const result = await provider.connect();
        publicKey = result?.publicKey?.toString?.() || provider.publicKey?.toString?.() || null;
      } else if (provider.publicKey) {
        publicKey = provider.publicKey.toString();
      }
    } catch (err) {
      setStatus('bad', `Connexion refusée ou impossible : ${String(err.message || err)}`);
      return;
    }

    setStatus(
      'ok',
      '<strong>SafePal détecté et connecté.</strong>' +
      (publicKey ? `<br>Wallet : <code>${publicKey}</code>` : '') +
      '<br><br>Aucune transaction n’a été créée, signée ou envoyée.'
    );
  } catch (err) {
    setStatus('bad', `Erreur : ${String(err.message || err)}`);
  }
});
