const startButton = document.getElementById("start-camera");
const stopButton = document.getElementById("stop-camera");
const status = document.getElementById("scanner-status");
const scannerView = document.getElementById("scanner-view");

let scanner;
let cameraActive = false;
let scanHandled = false;

async function stopCamera() {
  if (!cameraActive) return;

  try {
    await scanner.stop();
    cameraActive = false;
    scannerView.classList.remove("scanner-view--active");
    startButton.disabled = false;
    stopButton.disabled = true;
  } catch (error) {
    console.error("Não foi possível parar a câmera.", error);
    status.textContent = "Não foi possível parar a câmera. Feche ou atualize esta página.";
  }
}

async function startCamera() {
  if (!window.isSecureContext) {
    status.textContent = "A câmera exige uma conexão segura (HTTPS ou localhost).";
    return;
  }

  scanHandled = false;
  startButton.disabled = true;
  status.textContent = "Aguardando permissão para acessar a câmera...";

  try {
    scanner ??= new Html5Qrcode("qr-reader", {
      formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE],
      verbose: false
    });

    await scanner.start(
      { facingMode: "environment" },
      { fps: 10, qrbox: { width: 250, height: 250 } },
      async (text) => {
        if (scanHandled) return;
        scanHandled = true;
        await stopCamera();
        status.textContent = `QR Code lido: ${text}`;
      }
    );

    cameraActive = true;
    scannerView.classList.add("scanner-view--active");
    stopButton.disabled = false;
    if (scanHandled) {
      await stopCamera();
    } else {
      status.textContent = "Câmera ativa. Posicione o QR Code dentro da moldura.";
    }
  } catch (error) {
    console.error("Não foi possível iniciar a câmera.", error);
    startButton.disabled = false;
    stopButton.disabled = true;
    status.textContent = "Não foi possível iniciar a câmera. Verifique a permissão e tente novamente.";
  }
}

startButton.addEventListener("click", startCamera);
stopButton.addEventListener("click", async () => {
  await stopCamera();
  if (!cameraActive) status.textContent = "Leitura pausada.";
});
window.addEventListener("pagehide", () => {
  if (cameraActive) void scanner.stop();
});
