import { PesquisaSatisfacao } from './../core/pesquisa-satisfacao.model';
import { environmentCloud } from './../../environments/environment-cloud';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Atendimento } from '../core/atendimento.model';
import { RespostaEncaminhamentoSetor } from '../core/resposta-encaminhamento-setor.model';

@Injectable({
  providedIn: 'root'
})
export class AtendimentoCloudService {

  atendimentoUrlCloud!: string;
  logotipoUrlCloud!: string;
  tipoManifestanteUrlCloud!: string;
  tipoDocumentoUrlCloud!: string;
  pesquisaSatisfacaoUrlCloud!: string;
  headers = new HttpHeaders()
  encaminhamentoRespostaUrlCloud!: string;
  modeloDocumentoUrlCloud!: string;
  encaminhamentoUrlCloud!: string;
  perguntasFrequentes!: string;

  constructor(
    private http: HttpClient,

  ) {
    this.atendimentoUrlCloud = `${environmentCloud.apiUrl}/atendimentos`;
    this.logotipoUrlCloud = `${environmentCloud.apiUrl}/logoTipo`;
    this.tipoManifestanteUrlCloud = `${environmentCloud.apiUrl}/tiposManifestante`;
    this.tipoDocumentoUrlCloud = `${environmentCloud.apiUrl}/tipoDocumentos`;
    this.pesquisaSatisfacaoUrlCloud = `${environmentCloud.apiUrl}/pesquisaSatisfacao`;
    this.modeloDocumentoUrlCloud = `${environmentCloud.apiUrl}/modelosDoc`;
    this.encaminhamentoUrlCloud = `${environmentCloud.apiUrl}/encaminhamentos`;
    this.encaminhamentoRespostaUrlCloud = `${environmentCloud.apiUrl}/encaminhamentosResposta`;
    this.perguntasFrequentes = `${environmentCloud.apiUrl}/pergunta-frequente`;
    this.carregaToken();
   }


   carregaToken(){
    this.headers = new HttpHeaders()
    .append('Content-Type', 'application/json')
    .append('Authorization', 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c3VhcmlvIjoxLCJ1c2VyX25hbWUiOiIwMDg5NjUzMzQzMyIsImlkX29yZ2FvIjo3LCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwibm9tZSI6Im11bHRpYWRtaW4iLCJleHAiOjE2OTU0NDI5MjQsImp0aSI6InNNQWRiQ2lfNDFGOU5jdVh1QUtrMVRsajNPWSIsImNsaWVudF9pZCI6ImFuZ3VsYXIifQ.JAAkqs_sdSsUsa8vcqVLZIsGSzCttt8TnVHUf1QaVfc')
   }

  adicionarCloud(atendimento: Atendimento): Promise<any> {
    return this.http.post<any>(`${this.atendimentoUrlCloud}/site-cloud`, atendimento, { headers: this.headers })
      .toPromise();
  }

  salvarPesquisaCloud(pesquisa: PesquisaSatisfacao): Promise<any> {
    return this.http.post<PesquisaSatisfacao>(`${this.pesquisaSatisfacaoUrlCloud}`, pesquisa, {headers: this.headers})
      .toPromise();
  }

  enviarResposta(respostaEncaminhamentoSetor: RespostaEncaminhamentoSetor): Promise<any> {
    let params = new HttpParams()
    return this.http.post<any>(`${this.encaminhamentoRespostaUrlCloud}/encaminhamentosRespostaSetor`, respostaEncaminhamentoSetor, { headers: this.headers })
      .toPromise();
  }


  uploadAnexo(): string {
    return `${this.atendimentoUrlCloud}/anexo`;
  }

  listarTiposManifestanteCloud(orgao: any): Promise<any> {
    let params = new HttpParams()
    params = params.set('orgao', orgao);
    return this.http.get<any>(`${this.tipoManifestanteUrlCloud}/listar?`,{headers: this.headers, params})
    .toPromise()
     .then(res => <any>res)
         .then(data => {
           return data.tipoManifestanteDtoList;
     });
  }

  listarTiposDocumentos(orgao: any): Promise<any> {
    let params = new HttpParams()
    params = params.set('orgao', orgao);
    return this.http.get<any>(`${this.tipoDocumentoUrlCloud}/listar?`,{headers: this.headers, params})
    .toPromise()
     .then(res => <any>res)
         .then(data => {
           return data.tipoDocumentoDtoList;
     });
  }

  consultarTipoDocumento(tipoManifestante: number, orgao: any): Promise<any>{

    let params = new HttpParams()
    params = params.set('codigoTipoManifestante', tipoManifestante);
    params = params.set('orgao', orgao);

    return this.http.get<any>(`${this.tipoManifestanteUrlCloud}/consulta-tipodocumento?`, {headers: this.headers, params})
    .toPromise()
     .then(data => {
       return data;
     });
  }

  consultaLogotipo(orgao: any): Promise<any>{
    let params = new HttpParams()
    params = params.set('orgao', orgao);
    return this.http.get<any>(`${this.logotipoUrlCloud}?`, {headers: this.headers, params})
    .toPromise()
     .then(res => <any>res)
         .then(data => {
           return data.logoTipoDto.nome;
     });
  }

  consultaLogotipoCloud(orgao: any): Promise<any>{
    let params = new HttpParams()
    params = params.set('orgao', orgao);
    return this.http.get<any>(`${this.logotipoUrlCloud}?`, {headers: this.headers, params})
    .toPromise()
     .then(res => <any>res)
         .then(data => {
           return data.logoTipoDto.nome;
     });
  }


  consultaCloud(consulta: any): Promise<any>{
    let params = new HttpParams()
    params = params.set('orgao', consulta.orgao);
    params = params.set('numero', consulta.numero);
    params = params.set('senha', consulta.senha);
    return this.http.get<any>(`${this.atendimentoUrlCloud}/consultaAtendimento?`, {headers: this.headers, params})
    .toPromise()
     .then(res => <any>res)
         .then(data => {
          console.log(data);

           return data.resumoAtendimentoDto;
     });
  }


  listarPorTipo(tipo: string): Promise<any[]> {

    let params = new HttpParams()
    params = params.set('codigo', tipo);
    params = params.set('orgao', "7");
    
    return this.http.get<any>(`${this.modeloDocumentoUrlCloud}/modeloDocTipos?`, { headers: this.headers, params })
    .toPromise()
     .then(res => <any>res)
         .then(data => {
           return data.modeloDocumentoLaiDtoList;
     });
  }

  listarPerguntaFrequente(orgao: string): Promise<any[]> {

    let params = new HttpParams()
    params = params.set('orgao', orgao);
    
    return this.http.get<any>(`${this.perguntasFrequentes}/listar?`, { headers: this.headers, params })
    .toPromise()
     .then(res => <any>res)
         .then(data => {
           return data.perguntaFrequenteDtoList;
     });
  }

  consultaEncaminhamento(parametro: string): Promise<any>{
    let params = new HttpParams()
    params = params.set('parametro', parametro);
    return this.http.get<any>(`${this.encaminhamentoUrlCloud}/resposta-setor/`+parametro, {headers: this.headers})
    .toPromise()
     .then(res => <any>res)
         .then(data => {
           return data;
     });
  }

  consultarModeloOutros(codigoModelo: any, codigoAtendimento: any): Promise<any>{

    let params = new HttpParams()
    params = params.set('codigoAtendimento', codigoAtendimento);
    params = params.set('codigoModelo',  codigoModelo);

    return this.http.get<any>(`${this.modeloDocumentoUrlCloud}/modeloDocOutros?`, { headers: this.headers, params })
    .toPromise()
     .then(data => {
       return data.resposta;
     });
  }


}
