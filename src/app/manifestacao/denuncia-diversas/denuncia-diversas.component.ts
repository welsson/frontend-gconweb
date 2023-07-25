import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AtendimentoService } from '../atendimento.service';
import { MenuItem, MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

import Swal from 'sweetalert2'
import { cpf } from 'cpf-cnpj-validator';
import { NgForm } from '@angular/forms';
import { Atendimento } from 'src/app/core/atendimento.model';
import { Address } from '../cadastro/cadastro.component';
import { Anexo } from 'src/app/core/anexo.model';


@Component({
  selector: 'app-denuncia-diversas',
  templateUrl: './denuncia-diversas.component.html',
  styleUrls: ['./denuncia-diversas.component.css']
})
export class DenunciaDiversasComponent implements OnInit {




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
  checkTermo!: any;
  numeroAnexo = 0;
  disabled = false;
  tipoUsuarios!: any;
  orgaos!: any;
  desabilitarUnidade = true;
  habilitaCampoTipoUsuarioOutros!: boolean;
  habilitaCampoTipoDenunciaOutros!: boolean;


  tipoDenuncia = [
    { label: 'Agressão Física', value: 1},
    { label: 'Assédio Moral', value: 2},
    { label: 'Bullying', value: 3},
    { label: 'Conflito de Interesses', value: 4},
    { label: 'Corrupção ', value: 5},
    { label: 'Cyberbullying', value: 6},
    { label: 'Discriminação', value: 7},
    { label: 'Fake News', value: 8},
    { label: 'Favorecimento de fornecedores ou clientes', value: 9},
    { label: 'Irregularidades nas demonstrações financeiras ou relatório de gestão', value: 10},
    { label: 'LGPD - Lei Geral de Proteção de Dados', value: 11},
    { label: 'Violação de Leis Trabalhistas', value: 12},
    { label: 'Outros', value: 13}
  ]

  relacao = [
    { label: 'Professor/a, instrutor/a ou monitor/a ', value: 1},
    { label: 'Colaborador/a', value: 2},
    { label: 'Gestor/a', value: 3},
    { label: 'Religioso/a', value: 4},
    { label: 'Estudante ', value: 5},
    { label: 'Familiar de estudante', value: 6},
    { label: 'Prestador de serviços', value: 7},
    { label: 'Outros', value: 8}
  ]


  ngOnInit() {
    this.atendimentoService.consultaLogotipo(this.router.url.split("/")[1])
    .then((data: any) => {
      this.imagemLogo = "assets/image/" + data;
      this.atendimento.logotipo = this.imagemLogo;
      this.activatedRoute.params.subscribe(params => {
        this.atendimento.natureza = parseInt(params['id']);
        this.tipoManifestacao = this.tipoManif(params['id']);
        this.tipoManifest = params['id'];
      });
      this.atendimento.captcha = (Math.round(Math.random()*11240));
      this.atendimento.codigoUnidadeMissao = parseInt(this.router.url.split("/")[1]);
      this.atendimento.orgao = 2
      this.atendimento.identificado = '1';
      this.carregarTiposManifestante();
      this.carregarOrgaos();
      this.habilitaCampoTipoUsuarioOutros = true;
      this.habilitaCampoTipoDenunciaOutros = true;
      if (this.atendimento.codigoUnidadeMissao === 2){
        this.desabilitarUnidade = false;
      }else{
        this.desabilitarUnidade = true;
      }

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


  campoTipoUsuario(){
    if (this.atendimento.tipoUsuario === 89 || this.atendimento.tipoUsuario === 90 || this.atendimento.tipoUsuario === 92 || 
      this.atendimento.tipoUsuario === 94 || this.atendimento.tipoUsuario === 95 || this.atendimento.tipoUsuario === 96 || 
      this.atendimento.tipoUsuario === 97 || this.atendimento.tipoUsuario === 98 || this.atendimento.tipoUsuario === 99 || this.atendimento.tipoUsuario === 100){
      this.habilitaCampoTipoUsuarioOutros = false;
    }else{
      this.habilitaCampoTipoUsuarioOutros = true;
    }
  }


  campoTipoDenuncia(){
    if (this.atendimento.codigoTipoDenuncia === 13){
      this.habilitaCampoTipoDenunciaOutros = false;
    }else{
      this.habilitaCampoTipoDenunciaOutros = true;
    }
  }
 
  carregarTiposManifestante() {
    this.atendimentoService.listarTiposManifestante(this.atendimento.orgao)
      .then(tipoUsuarios => {
        this.tipoUsuarios = tipoUsuarios.
          map((o: { descricao: any; idAntigo: any; }) => ({ label: o.descricao, value: o.idAntigo }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarOrgaos() {
    this.atendimentoService.listarOrgaoAtivos()
      .then(orgaos => {
        this.orgaos = orgaos.
          map((o: { descricao: any; id: any; }) => ({ label: o.descricao, value: o.id }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
