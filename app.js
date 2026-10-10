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
      setStatus(
        'bad',
        'Aucun provider Solana/SafePal détecté.<br><br>Ouvre cette page depuis le navigateur DApp de SafePal.'
      );
      return;
    }

    const providerName = window.safepal ? 'SafePal' : 'Provider Solana';
    let publicKey = null;

    try {
      if (provider.publicKey) {
        publicKey = provider.publicKey.toString();
      }
    } catch (_) {}

    setStatus(
      'ok',
      `<strong>${providerName} détecté.</strong>` +
      (publicKey ? `<br>Wallet : <code>${publicKey}</code>` : '') +
      '<br><br>Aucune transaction n’a été créée, signée ou envoyée.'
    );
  } catch (err) {
    setStatus('bad', `Erreur : ${String(err.message || err)}`);
  }
});
