class VideoWithBackground {
  constructor(videoId, canvasId) {
    // Verifica se o usuário prefere reduzir animações
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      this.video = document.getElementById(videoId);
      this.canvas = document.getElementById(canvasId);

      if (!this.canvas || !this.video) {
        console.error("Video or canvas element not found.");
        return;
      }

      this.ctx = this.canvas.getContext("2d");
      this.step = null;

      // Bind automático das funções
      this.init();
    }
  }

  // Desenha o quadro atual do vídeo no canvas
  draw = () => {
    this.ctx.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);
  };

  // Inicia um loop de desenho
  drawLoop = () => {
    this.draw();
    this.step = requestAnimationFrame(this.drawLoop);
  };

  // Pausa o loop de desenho
  drawPause = () => {
    if (this.step) {
      cancelAnimationFrame(this.step);
      this.step = null;
    }
  };

  // Inicializa os eventos e configurações
  init() {
    this.ctx.filter = "blur(1px)";

    // Configura os eventos do vídeo
    this.video.addEventListener("loadeddata", this.draw);
    this.video.addEventListener("seeked", this.draw);
    this.video.addEventListener("play", this.drawLoop);
    this.video.addEventListener("pause", this.drawPause);
    this.video.addEventListener("ended", this.drawPause);

    // Remove os eventos ao descarregar a página
    window.addEventListener("beforeunload", this.cleanup);
  }

  // Remove os eventos e limpa o estado
  cleanup = () => {
    this.drawPause(); // Garante que o loop seja pausado
    this.video.removeEventListener("loadeddata", this.draw);
    this.video.removeEventListener("seeked", this.draw);
    this.video.removeEventListener("play", this.drawLoop);
    this.video.removeEventListener("pause", this.drawPause);
    this.video.removeEventListener("ended", this.drawPause);
    window.removeEventListener("beforeunload", this.cleanup);
  };
}

// Instancia a classe
new VideoWithBackground("main-hero-video", "js-canvas");
