import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { AtendimentoCloudService } from '../atendimento-cloud.service';
import { AtendimentoService } from '../atendimento.service';

@Component({
  selector: 'app-pesquisacloud',
  templateUrl: './pesquisacloud.component.html',
  styleUrls: ['./pesquisacloud.component.css']
})
export class PesquisacloudComponent {

  nomeLogotipo!: any;
  imagemLogo!: string;
  backendForaAr!: boolean;
  backendNoAr!: boolean;

  constructor(
    private router: Router,
    private atendimentoService: AtendimentoCloudService,
    private errorHandler: ErrorHandlerService,
    private ngxLoader: NgxUiLoaderService
  ) { }

  ngOnInit(): void {
    this.backendForaAr = true;
    this.backendNoAr = false;
    this.ngxLoader.start();
      this.atendimentoService.consultaLogotipoCloud(this.router.url.split("/")[1])
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

  elogio() {
    this.router.navigate([this.router.url.split("/")[1] + '/cadastrocloud/2']);
  }

  sugestao() {
    this.router.navigate([this.router.url.split("/")[1] + '/cadastrocloud/3']);
  }

  reclamacao() {
    this.router.navigate([this.router.url.split("/")[1] + '/cadastrocloud/11']);
  }

  denuncia() {
    this.router.navigate([this.router.url.split("/")[1] + '/cadastrocloud/5']);
  }

  consulta() {
    this.router.navigate([this.router.url.split("/")[1] + '/consultacloud']);
  }

  perguntaFrequente(){
    console.log(this.router.url.split("/")[1]);
    this.router.navigate([this.router.url.split("/")[1] + '/pergunta-frequente']);
  }


}
