  const btnEmpezar = document.getElementById('btnEmpezar')
  var ultimonivel = 10;

  class Juego {
    constructor() {
      this.inicializar = this.inicializar.bind(this)
      this.inicializar()
      this.generarSecuencia()
      setTimeout(()=>this.siguienteNivel(),1000)
    }
    inicializar() {
      this.siguienteNivel=this.siguienteNivel.bind(this)
      this.elegirColor=this.elegirColor.bind(this)
      btnEmpezar.classList.add('hide');
      this.nivel=1;
      this.colores={
        celeste:document.getElementById('celeste'),
        violeta:document.getElementById('violeta'),
        naranja:document.getElementById('naranja'),
        verde: document.getElementById('verde'),
      };
      this.timerInterval = undefined;
    }

    generarSecuencia() {
      this.secuencia = new Array(ultimonivel).fill(0).map(n=>{ return Math.floor(Math.random() *4) })
    }

    siguienteNivel(){
      this.subnivel=0;
      this.iluminarSecuencia()
    }

    iluminarSecuencia(){
      for (let i = 0; i < this.nivel; i++) {
        let color = this.transformarNumeroAColor(this.secuencia[i])
        setTimeout(()=>this.iluminarColor(color),1000*i)
      }
      setTimeout(()=>{
        this.agregarEventosClic()
        this.timer(this.nivel)
      },1000*this.nivel)
    }

    transformarNumeroAColor(num) {
      switch (num) {
        case 0:return 'celeste';
        case 1:return 'violeta';
        case 2:return 'naranja';
        case 3: return 'verde';
      }
    }

    transformarColorANumero(color) {
      switch (color) {
        case 'celeste':return 0;
        case 'violeta':return 1;
        case 'naranja':return 2;
        case 'verde': return 3;
      }
    }

    iluminarColor(color){
      this.colores[color].classList.add('light');
      setTimeout(()=>this.apagarColor(color),350);
    }

    apagarColor(color){
      this.colores[color].classList.remove('light');
    }

    agregarEventosClic(){
      this.colores.celeste.addEventListener('click',this.elegirColor)
      this.colores.violeta.addEventListener('click',this.elegirColor)
      this.colores.naranja.addEventListener('click',this.elegirColor)
      this.colores.verde.addEventListener('click',this.elegirColor)
    }

    eliminarEventosClic(){
      this.colores.celeste.removeEventListener('click',this.elegirColor)
      this.colores.violeta.removeEventListener('click',this.elegirColor)
      this.colores.naranja.removeEventListener('click',this.elegirColor)
      this.colores.verde.removeEventListener('click',this.elegirColor)
    }

    elegirColor(ev){
      let nombreColor = ev.target.dataset.color
      let numeroColor = this.transformarColorANumero(nombreColor)
      this.iluminarColor(nombreColor)
      if (numeroColor === this.secuencia[this.subnivel]) {
        this.subnivel++
        if (this.nivel === this.subnivel) {
          if (this.timerInterval!=undefined) {
            clearInterval(this.timerInterval)
            this.timerInterval=undefined;
          }
          this.nivel++
          this.eliminarEventosClic()
          if (this.nivel > ultimonivel) {
            this.gano()

          }else {
            $('#nivelDisplay').text(this.nivel);
            $('#timerRing').css('background','#2c3e50')
            swal("Simon Dice", "MUY bien", {
              buttons: false,
              timer: 1000,
            });
            setTimeout(()=>this.siguienteNivel(),2500);
          }
        }
      }else {
        this.perdio()
      }
    }

    gano(){
      if (this.timerInterval!=undefined) {
        clearInterval(this.timerInterval)
        this.timerInterval=undefined;
      }
      swal("Simon Dice!", "TU GANASTE!!!", "success")
      .then(()=>{
        this.inicializar()
        btnEmpezar.classList.remove('hide');
        $('#nivelDisplay').text(1);
        $('#timerRing').css('background','#2c3e50')
      })
    }

    perdio(){
      if (this.timerInterval!=undefined) {
        clearInterval(this.timerInterval)
        this.timerInterval=undefined;
      }
      swal("Simon Dice!", "TU PERDISTE", "error")
      .then(()=>{
        this.eliminarEventosClic()
        this.inicializar()
        $('#nivelDisplay').text(1);
        $('#timerRing').css('background','#2c3e50')
        btnEmpezar.classList.remove('hide');
      })
    }
    timer(numero) {
      var contador=-45;
      if (this.timerInterval!=undefined) {
        clearInterval(this.timerInterval)
        this.timerInterval=undefined;
      }

      this.timerInterval =setInterval(()=>{
        contador++;
        if (contador > 314 ) {
          contador = -45;
          clearInterval(this.timerInterval)
          this.timerInterval=undefined;
          if (this.nivel != this.subnivel) {
            this.perdio();
          }
        }
        $('#timerRing').css('background',
         `linear-gradient(${contador}deg, #f00615 10%, #b3222c 15%, #86181f 19%, #2c3e50  20%)`)
      },Math.floor(numero*(1800/360)))

    }
  }

function empezarJuego() {
  var juego = new Juego()
}
