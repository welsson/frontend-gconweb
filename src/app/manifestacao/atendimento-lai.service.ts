import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RespostaEncaminhamentoSetor } from '../core/resposta-encaminhamento-setor.model';
import { RespostaRecurso } from '../core/resposta-recurso.model';


@Injectable({
  providedIn: 'root'
})
export class AtendimentoLaiService {
  
  atendimentoLaiUrl: string;
  encaminhamentoRespostaLaiUrl!: string;
  modeloDocumentoLaiUrl!: string;
  encaminhamentoLaiUrl!: string;
  recursoLaiUrl!: string;
  headers = new HttpHeaders()


  constructor(
    private http: HttpClient
  ) {
    this.atendimentoLaiUrl = `${environment.apiUrl}/atendimentos-lai`;
    this.encaminhamentoRespostaLaiUrl = `${environment.apiUrl}/encaminhamento-resposta-lai`;
    this.modeloDocumentoLaiUrl = `${environment.apiUrl}/modelos-doc-lai`;
    this.encaminhamentoLaiUrl = `${environment.apiUrl}/encaminhamento-lai`;
    this.recursoLaiUrl = `${environment.apiUrl}/recurso-lai`;
    this.carregaToken();
   }

   carregaToken(){
    this.headers = new HttpHeaders()
    .append('Content-Type', 'application/json')
    .append('Authorization', 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c3VhcmlvIjoxLCJ1c2VyX25hbWUiOiIwMDg5NjUzMzQzMyIsImlkX29yZ2FvIjo3LCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwibm9tZSI6Im11bHRpYWRtaW4iLCJleHAiOjE2OTU0NDI5MjQsImp0aSI6InNNQWRiQ2lfNDFGOU5jdVh1QUtrMVRsajNPWSIsImNsaWVudF9pZCI6ImFuZ3VsYXIifQ.JAAkqs_sdSsUsa8vcqVLZIsGSzCttt8TnVHUf1QaVfc')
   }


   enviarResposta(respostaEncaminhamentoSetor: RespostaEncaminhamentoSetor): Promise<any> {
    let params = new HttpParams()
    return this.http.post<any>(`${this.encaminhamentoRespostaLaiUrl}/encaminhamentosRespostaSetor`, respostaEncaminhamentoSetor, { headers: this.headers })
      .toPromise();
  }

  enviarRespostaRecurso(respostaRecurso: RespostaRecurso): Promise<any> {
    let params = new HttpParams()
    return this.http.post<any>(`${this.recursoLaiUrl}/encaminhamento-resposta-recurso`, respostaRecurso, { headers: this.headers })
      .toPromise();
  }

  listarModeloDocumento(orgao: string, codigo: string): Promise<any> {
    let params = new HttpParams()
    params = params.set('orgao', orgao);
    params = params.set('codigo', codigo);
    return this.http.get<any>(`${this.modeloDocumentoLaiUrl}/modeloDocTiposSite?`,{headers: this.headers, params})
    .toPromise()
     .then(res => <any>res)
         .then(data => {
           return data.modeloDocumentoDtoList;
     });
  }


  listarPorTipo(tipo: string): Promise<any[]> {

    let params = new HttpParams()
    params = params.set('codigo', tipo);
    params = params.set('orgao', "7");
    
    return this.http.get<any>(`${this.modeloDocumentoLaiUrl}/modeloDocTiposSite?`, { headers: this.headers, params })
    .toPromise()
     .then(res => <any>res)
         .then(data => {
           return data.modeloDocumentoLaiDtoList;
     });
  }


  consultaEncaminhamento(parametro: string): Promise<any>{
    let params = new HttpParams()
    params = params.set('parametro', parametro);
    return this.http.get<any>(`${this.encaminhamentoLaiUrl}/resposta-setor/`+parametro, {headers: this.headers})
    .toPromise()
     .then(res => <any>res)
         .then(data => {
           return data;
     });
  }

  consultaRecurso(parametro: string): Promise<any>{
    let params = new HttpParams()
    params = params.set('parametro', parametro);
    return this.http.get<any>(`${this.recursoLaiUrl}/resposta-recurso/`+parametro, {headers: this.headers})
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

    return this.http.get<any>(`${this.modeloDocumentoLaiUrl}/modeloDocOutros?`, { headers: this.headers, params })
    .toPromise()
     .then(data => {
       return data.resposta;
     });
  }

      

}
