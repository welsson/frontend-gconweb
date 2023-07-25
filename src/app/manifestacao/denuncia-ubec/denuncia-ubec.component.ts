import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { AtendimentoService } from '../atendimento.service';

@Component({
  selector: 'app-denuncia-ubec',
  templateUrl: './denuncia-ubec.component.html',
  styleUrls: ['./denuncia-ubec.component.css']
})
export class DenunciaUbecComponent implements OnInit {

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

  denuncia() {
    this.codigoNatureza = 5;
    this.router.navigate([this.router.url.split("/")[1] + '/cadastro/denuncia-diversas/'+this.codigoNatureza]);    
  }

  denunciaSexual() {
    this.codigoNatureza = 5;
    this.router.navigate([this.router.url.split("/")[1] + '/cadastro/denuncia/'+this.codigoNatureza]);    
  }

  voltarInicio(){
      this.router.navigate([this.router.url.split("/")[1] + '/pesquisa']);
  }

  consulta() {
    this.router.navigate([this.router.url.split("/")[1] + '/consulta']);  
  }

  showLgpd(){
    this.displayModalLgpd = true;
  }

  continuar(){
    this.router.navigate([this.router.url.split("/")[1] + '/cadastro/'+this.codigoNatureza]);
  }

  sair(){
    this.displayModalLgpd = false;
  }


}
