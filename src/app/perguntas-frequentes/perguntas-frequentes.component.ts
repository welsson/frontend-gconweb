import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from '../core/error-handler.service';
import { AtendimentoCloudService } from '../manifestacao/atendimento-cloud.service';

@Component({
  selector: 'app-perguntas-frequentes',
  templateUrl: './perguntas-frequentes.component.html',
  styleUrls: ['./perguntas-frequentes.component.css']
})
export class PerguntasFrequentesComponent implements OnInit {

  imagemLogo!: string;
  list!: any;

  constructor(
    private router: Router,
    private atendimentoService: AtendimentoCloudService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private ngxLoader: NgxUiLoaderService
  ) { }

  ngOnInit(): void {
    this.atendimentoService.consultaLogotipoCloud(this.router.url.split("/")[1])
      .then((data: any) => {
        this.imagemLogo = "assets/image/" + data;
      });
      this.atendimentoService.listarPerguntaFrequente(this.router.url.split("/")[1])
      .then((data: any) => {
        this.list = data;
      });

  }

  voltarInicio(){
    this.router.navigate([this.router.url.split("/")[1] + '/pesquisacloud']);
  }

}
