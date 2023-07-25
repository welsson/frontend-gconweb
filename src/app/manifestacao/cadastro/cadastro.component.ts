import { Anexo } from './../../core/anexo.model';
import { NgForm } from '@angular/forms';

import { AtendimentoService } from './../atendimento.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';

import {MenuItem, MessageService} from 'primeng/api';
import { Atendimento } from 'src/app/core/atendimento.model';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { HttpClient } from '@angular/common/http';


import Swal from 'sweetalert2'
import { cpf } from 'cpf-cnpj-validator';




export class Address {
  cep!: string;
  logradouro!: string;
  complemento!: string;
  bairro!: string;
  localidade!: string;
  uf!: string;
  unidade!: string;
  ibge!: string;
  gia!: string;


  erro!: boolean;
}

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  constructor(
    private router: Router,
    private http: HttpClient,
    private atendimentoService: AtendimentoService,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private ngxLoader: NgxUiLoaderService
  ) { }

  atendimento = new Atendimento();
  fileName = '';
  cep!: Address;
  cpfInvalido = false;
  uploadedFiles: any[] = [];
  imagemLogo!: string;

  fileSelected?: File;
  base64: string = "Base64...";
  campos = false;
  anexo = new Anexo();
  tipoManifest: any;

  tipoManifestacao!: string;

  items!: MenuItem[];
  submitted: boolean = false;
  index = 0;
  abaDisabled0 = false;
  abaDisabled1 = true;
  abaDisabled2 = true;
  abaDisabled3 = true;
  tipoDocumentos!: any;
  tipoUsuarios!: any;
  numeroAnexo = 0;
  disabled = false;

  modalidadesEnsino = [
    { label: 'EAD', value: 1},
    { label: 'Presencial', value: 2},
    { label: 'Não se aplica', value: 0}
  ]

  ufs = [
      { label: 'Acre', value: 'AC'},
      { label: 'Alagoas', value: 'AL'},
      { label: 'Amazonas', value: 'AM'},
      { label: 'Amapá', value: 'AP'},
      { label: 'Bahia', value: 'BA'},
      { label: 'Ceará', value: 'CE'},
      { label: 'Distrito Federal', value: 'DF'},
      { label: 'Espírito Santo', value: 'ES'},
      { label: 'Goias', value: 'GO'},
      { label: 'Maranhão', value: 'MA'},
      { label: 'Minas Gerais', value: 'MG'},
      { label: 'Mato Grosso do Sul', value: 'MS'},
      { label: 'Mato Grosso', value: 'MT'},
      { label: 'Pará', value: 'PA'},
      { label: 'Paraíba', value: 'PB'},
      { label: 'Pernambuco', value: 'PE'},
      { label: 'Piaui', value: 'PI'},
      { label: 'Paraná', value: 'PR'},
      { label: 'Rio de Janeiro', value: 'RJ'},
      { label: 'Rio Grande do Norte', value: 'RN'},
      { label: 'Rondônia', value: 'RO'},
      { label: 'Rio Grande do Sul', value: 'RS'},
      { label: 'Santa Catarina', value: 'SC'},
      { label: 'Sergipe', value: 'SE'},
      { label: 'São Paulo', value: 'SP'},
      { label: 'Tocantins', value: 'TO'},
      { label: 'Roraima', value: 'RR'}
    ];

  ngOnInit() {
    this.atendimentoService.consultaLogotipo(this.router.url.split("/")[1])
    .then((data: any) => {
      this.imagemLogo = "assets/image/" + data;
      this.atendimento.logotipo = this.imagemLogo;
      this.activatedRoute.params.subscribe(params => {
        this.atendimento.natureza = params['id'];
        this.tipoManifestacao = this.tipoManif(params['id']);
        this.tipoManifest = params['id'];
      });
      this.atendimento.captcha = (Math.round(Math.random()*11240));
      this.atendimento.orgao = parseInt(this.router.url.split("/")[1]);
      this.atendimento.identificado = '1';
      this.carregarTiposManifestante();
      this.carregarTiposDocumento();
    })
    .catch(erro => {
      this.ngxLoader.stop();
      setTimeout(() => {
        this.errorHandler.handle(erro);
      }, 1000);
  });
  }

  tipoManif(tipo: any) {
    if (tipo == '2')
       return 'Faça seu Elogio'
    else if (tipo == '3')
      return 'Faça sua Sugestão'
    else if (tipo == '4')
      return 'Faça sua Reclamação'
    else if (tipo == '5')
      return 'Faça sua Denúncia'
    else if (tipo == '7')
      return 'Faça sua Solicitação'
    else if (tipo == '8')
      return 'Faça sua Crítica'
      else
    return '';
  }

  anonimo(){
    this.campos = true;
  }

  identificado(){
    this.campos = false;
  }


   nextPage() {
    
    if (this.atendimento.identificado == '1' && (this.atendimento.modalidadeEnsino == null)){
      Swal.fire('Informe a modalidade de ensino!')
    }else{
      if (this.atendimento.captcha == this.atendimento.captchaInformado){
        this.index = 1;
        this.abaDisabled0 = true;
        this.abaDisabled1 = false;
        this.abaDisabled2 = true;
        this.abaDisabled3 = true;
      }else{
        Swal.fire('Valor do capcha informado diferente!')
      }
    }
  }

   /**
   * Convert File To Base64
   */
    convertFileToBase64(file: File, index: number, anexo: Anexo) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        anexo.stringBase64 = reader.result as string;
        anexo.nomeArquivo = file.name;
        this.atendimento.listaAnexoDto[index] = anexo;
      }
    }

  carregaArquivo(event: { target: { files: File[]; }; files: any; }) {

    for (let index = 0; index < event.files.length; index++) {
      let anexo = new Anexo();
      const file:File = event.files[index];
      if (file) {
        this.convertFileToBase64(file, index, anexo);
      }
    }
  }

  nextPageAnexo(){
      this.index = 2;
      this.abaDisabled0 = true;
      this.abaDisabled1 = true;
      this.abaDisabled2 = false;
      this.abaDisabled3 = true;
  }

  previewAnexo(){
    this.index = 0;
    this.abaDisabled0 = false;
    this.abaDisabled1 = true;
    this.abaDisabled2 = true;
    this.abaDisabled3 = true;
  }

  concluir(form: NgForm){
    console.log(this.atendimento);
    this.ngxLoader.start();
    this.atendimentoService.adicionar(this.atendimento)
      .then(response => {
        this.atendimento = response.atendimentoDto;
        this.ngxLoader.stop();
        })
      .then(res => {
        setTimeout(() => {
          this.index = 3;
          this.abaDisabled0 = true;
          this.abaDisabled1 = true;
          this.abaDisabled2 = true;
          this.abaDisabled3 = false;
          this.messageService.add({ severity: 'success', detail: 'Manifestação enviada com sucesso!' });
            }, 1000);
      })
      .catch(erro => {
        this.ngxLoader.stop();
        setTimeout(() => {
          this.errorHandler.handle(erro);
            }, 1000);
      });


  }

  previewRevisao(){
    this.index = 1;
    this.abaDisabled0 = true;
    this.abaDisabled1 = false;
    this.abaDisabled2 = true;
    this.abaDisabled3 = true;
  }

  previewConclusao(){
    this.index = 2;
    this.abaDisabled0 = true;
    this.abaDisabled1 = true;
    this.abaDisabled2 = false;
    this.abaDisabled3 = true;
  }

  voltarInicio(){
    if (this.tipoManifest !== '5'){
      this.router.navigate([this.router.url.split("/")[1] + '/pesquisa']);
    }else{
      this.router.navigate([this.router.url.split("/")[1] + '/denuncia']);
    }
    
  }


  validaCpf(){
    if (this.atendimento.tipoDocumento == 1) {
      if (!cpf.isValid(this.atendimento.numeroDocumento)) {
        this.cpfInvalido = true;
        //Swal.fire('CPF Inválido', 'Informe um cpf válido!', 'warning');
      }else{
        this.cpfInvalido = false;
      }
    }else{
      this.cpfInvalido = false;
    }
  }

  buscar(){

    if (this.atendimento.cep != null){
      if (this.atendimento.cep.length == 8){
      return this.http
          .get(`https://viacep.com.br/ws/${this.atendimento.cep}/json/`)
          .toPromise()
        .then(res => <any>res)
            .then(data => {
            this.atendimento.cep = data.cep;
            this.atendimento.endereco = data.logradouro;
            this.atendimento.complemento = data.complemento;
            this.atendimento.bairro = data.bairro;
            this.atendimento.municipio = data.localidade;
            this.atendimento.uf = data.uf;
            return data.logradouro;
        });
        }
    }

    return this.atendimento.cep = '';

  }

  carregarTiposManifestante() {
    this.atendimentoService.listarTiposManifestante(this.atendimento.orgao)
      .then(tipoUsuarios => {
        this.tipoUsuarios = tipoUsuarios.
          map((o: { descricao: any; idAntigo: any; }) => ({ label: o.descricao, value: o.idAntigo }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }


  carregarTiposDocumento() {
    this.atendimentoService.listarTiposDocumentos(this.atendimento.orgao)
      .then(tipoDocumentos => {
        this.tipoDocumentos = tipoDocumentos.
          map((o: { descricao: any; idAntigo: any; }) => ({ label: o.descricao, value: o.idAntigo }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }




}
