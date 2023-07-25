import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AtendimentoService } from './../atendimento.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';


@Component({
  selector: 'app-pesquisa',
  templateUrl: './pesquisa.component.html',
  styleUrls: ['./pesquisa.component.css']
})
export class PesquisaComponent  {

  nomeLogotipo!: any;
  imagemLogo!: string;
  backendForaAr!: boolean;
  backendNoAr!: boolean;
  displayModalLgpd!: boolean;
  codigoNatureza!: number;

  constructor(
    private router: Router,
    private atendimentoService: AtendimentoService,
    private errorHandler: ErrorHandlerService,
    private ngxLoader: NgxUiLoaderService
  ) { }

  ngOnInit(): void {
    this.backendForaAr = true;
    this.backendNoAr = false;
    this.displayModalLgpd = false;
    this.ngxLoader.start();
      this.atendimentoService.consultaLogotipo(this.router.url.split("/")[1])
        .then((data: any) => {
          this.ngxLoader.stop();
          this.nomeLogotipo = data;
          this.imagemLogo = "assets/image/" + this.nomeLogotipo;
          this.backendForaAr = true;
          this.backendNoAr = false;
        })
        .catch(erro => {
          this.ngxLoader.stop();
          this.backendForaAr = false;
          this.backendNoAr = true;
            this.errorHandler.handle(erro);
          });
  }


  showLgpd(){
    this.displayModalLgpd = true;
  }

  continuar(){
    if (this.codigoNatureza === 5){
      this.router.navigate([this.router.url.split("/")[1] + '/denuncia']);
    }else{
      this.router.navigate([this.router.url.split("/")[1] + '/cadastro/'+this.codigoNatureza]);
    }
  }

  sair(){
    this.displayModalLgpd = false;
  }


  elogio() {
    this.showLgpd();
    this.codigoNatureza = 2;
//    this.router.navigate([this.router.url.split("/")[1] + '/cadastro/2']);
  }

  sugestao() {
    this.showLgpd();
    this.codigoNatureza = 3;
  }

  reclamacao() {
//    this.router.navigate([this.router.url.split("/")[1] + '/cadastro/4']);
      this.showLgpd();
      this.codigoNatureza = 4;
  }

  denuncia() {
    this.codigoNatureza = 5;
    let url = this.router.url;
    //this.router.navigate([this.router.url.split("/")[1] + '/denuncia']);
    if (this.router.url.includes('10')){
      window.open('https://colegio.catolica.edu.br/machadodeassis/canal-de-denuncias/', '_blank');
    }
    else if (this.router.url.includes('2')){
      window.open('https://www.ubec.edu.br/canal-de-denuncias/', '_blank');
    }
    else if (this.router.url.includes('3')){
      window.open('https://colegio.catolica.edu.br/padredeman/canal-de-denuncias/', '_blank');
    }
    else if (this.router.url.includes('4')){
      window.open('https://colegio.catolica.edu.br/brasilia/canal-de-denuncias/', '_blank');
    }
    else if (this.router.url.includes('5')){
      window.open('https://ucb.catolica.edu.br/portal/canal-de-denuncias/', '_blank');
    }
    else if (this.router.url.includes('6')){
      window.open('https://unileste.catolica.edu.br/portal/canal-de-denuncias/', '_blank');
    }
    else if (this.router.url.includes('7')){
      window.open('https://ficr.catolica.edu.br/portal/canal-de-denuncias/', '_blank');
    }
    else if (this.router.url.includes('8')){
      window.open('https://to.catolica.edu.br/portal/canal-de-denuncias/', '_blank');
    }
    else if (this.router.url.includes('9')){
      window.open('https://colegio.catolica.edu.br/curitiba/canal-de-denuncias/', '_blank');
    }
    else if (this.router.url.includes('1')){
      window.open('https://colegio.catolica.edu.br/timoteo/canal-de-denuncias/', '_blank');
    }

//    this.router.navigate([this.router.url.split("/")[1] + '/cadastro/5']);
  }

  solicitacao() {
    this.showLgpd();
    this.codigoNatureza = 7;
    //this.router.navigate([this.router.url.split("/")[1] + '/cadastro/7']);
  }

  critica() {
    this.showLgpd();
    this.codigoNatureza = 8;
    //this.router.navigate([this.router.url.split("/")[1] + '/cadastro/8']);
  }

  consulta() {
    this.router.navigate([this.router.url.split("/")[1] + '/consulta']);  
  }


}
