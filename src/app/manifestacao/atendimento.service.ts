import { PesquisaSatisfacao } from './../core/pesquisa-satisfacao.model';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Atendimento } from '../core/atendimento.model';
import { RespostaEncaminhamentoSetor } from '../core/resposta-encaminhamento-setor.model';

@Injectable({
  providedIn: 'root'
})
export class AtendimentoService {

  atendimentoUrl!: string;
  logotipoUrl!: string;
  tipoManifestanteUrl!: string;
  tipoDocumentoUrl!: string;
  pesquisaSatisfacaoUrl!: string;
  headers = new HttpHeaders()
  encaminhamentoRespostaUrl!: string;
  modeloDocumentoUrl!: string;
  encaminhamentoUrl!: string;
  relatorioUrl!: string;
  orgaoUrl!: string;

  constructor(
    private http: HttpClient,

  ) {
    this.atendimentoUrl = `${environment.apiUrl}/atendimentos`;
    this.logotipoUrl = `${environment.apiUrl}/logoTipo`;
    this.tipoManifestanteUrl = `${environment.apiUrl}/tiposManifestante`;
    this.tipoDocumentoUrl = `${environment.apiUrl}/tipoDocumentos`;
    this.pesquisaSatisfacaoUrl = `${environment.apiUrl}/pesquisaSatisfacao`;
    this.modeloDocumentoUrl = `${environment.apiUrl}/modelosDoc`;
    this.encaminhamentoUrl = `${environment.apiUrl}/encaminhamentos`;
    this.encaminhamentoRespostaUrl = `${environment.apiUrl}/encaminhamentosResposta`;
    this.relatorioUrl = `${environment.apiUrl}/relatorio`;
    this.orgaoUrl = `${environment.apiUrl}/orgaos`;
    this.carregaToken();
   }


   carregaToken(){
    this.headers = new HttpHeaders()
    .append('Content-Type', 'application/json')
    .append('Authorization', 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c3VhcmlvIjoxLCJ1c2VyX25hbWUiOiIwMDg5NjUzMzQzMyIsImlkX29yZ2FvIjo3LCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwibG9nbyI6IjZfMThfbG9nb19maWMucG5nIiwibm9tZSI6Im11bHRpYWRtaW4iLCJleHAiOjE3MDc0Mzg0OTgsImF1dGhvcml0aWVzIjpbIlJPTEVfQ09OQ0xVSVJfQVRFTkRJTUVOVE8iLCJST0xFX0NPTlNVTFRBUl9USVBPX01BTklGRVNUQU5URSIsIlJPTEVfUkVMQVRPUklPX01FRElBX1JFU1BPU1RBIiwiUk9MRV9SRUxBVE9SSU9fUEVSSU9ETyIsIlJPTEVfQ09ORklHVVJBQ0FPIiwiUk9MRV9DT05TVUxUQVJfQVRFTkRJTUVOVE8iLCJST0xFX0NPTlNVTFRBUl9USVBPX0RPQ1VNRU5UTyIsIlJPTEVfVFJBVEFSX0VOQ0FNSU5IQU1FTlRPIiwiUk9MRV9DQURBU1RSQVJfQVRFTkRJTUVOVE8iLCJST0xFX1JFTEFUT1JJT19OQVRVUkVaQSIsIlJPTEVfQ0FEQVNUUkFSX1JFU1BPU1RBX1BBUkNJQUwiLCJST0xFX0RFU0NSSUNBT19FTUFJTCIsIlJPTEVfUEFJTkVMX0lOVEVSQVRJVk8iLCJST0xFX1JFTEFUT1JJT19BUkVBIiwiUk9MRV9SRUxBVE9SSU9fVElQT19NQU5JRkVTVEFOVEUiLCJST0xFX0RBU0hCT0FSRCIsIlJPTEVfSU5ESUNBRE9SIiwiUk9MRV9QQUlORUxfQ09OVFJPTEUiLCJST0xFX0NBREFTVFJBUl9ERVNQQUNITyIsIlJPTEVfUkVMQVRPUklPX1VTVUFSSU8iLCJST0xFX0NPTlNVTFRBUl9PUklHRU1fTUFOSUZFU1RBQ0FPIiwiUk9MRV9SRUxBVE9SSU9TIiwiUk9MRV9DT05TVUxUQVJfTkFUVVJFWkEiLCJST0xFX0NPTlNVTFRBUl9NT0RFTE9fRE9DVU1FTlRPIiwiUk9MRV9ERVNQQUNIT19DT0JSQU5DQSIsIlJPTEVfQ09NUEFSQVRJVk9fUEVSSU9ETyIsIlJPTEVfUkVMQVRPUklPX1BSSU9SSVpBQ0FPIiwiUk9MRV9DQURBU1RSQVJfRU5DQU1JTkhBTUVOVE8iLCJST0xFX0NPTlNVTFRBUl9TRVRPUiIsIlJPTEVfUkVMQVRPUklPX1NFQ1JFVEFSSUEiLCJST0xFX0NPTlNVTFRBUl9GRVJJQURPIiwiUk9MRV9ERVNDUklDQU9fT1VWSURPUklBIiwiUk9MRV9JTkRJQ0FET1JfRUZJQ0lFTkNJQV9PVVZJRE9SSUEiLCJST0xFX1JFTEFUT1JJT19BUkVBX0FTU1VOVE8iLCJST0xFX0NPTlNVTFRBUl9BUkVBIiwiUk9MRV9DT05TVUxUQVJfQVNTVU5UTyIsIlJPTEVfUkVMQVRPUklPX0dFUkFMIiwiUk9MRV9DT05TVUxUQVJfVElQT19SRVNQT1NUQSIsIlJPTEVfUkVMQVRPUklPX0FTU1VOVE8iLCJST0xFX0FURU5ESU1FTlRPIiwiUk9MRV9QUk9EVVRJVklEQURFX0NBTExDRU5URVIiLCJST0xFX0NBTkNFTEFSX0FURU5ESU1FTlRPIiwiUk9MRV9SRUxBVE9SSU9fT1JJR0VNIl0sImp0aSI6IkNkdjdQTWlFaEpBZFBoVjFuc0FCWkVIVTltayIsImNsaWVudF9pZCI6ImFuZ3VsYXIifQ.0EmOv7Atsyk2bFqlxlVfknehefHKCGpgisgC5956DZY')
   }

   adicionar(atendimento: Atendimento): Promise<any> {
    console.log(atendimento);
    return this.http.post<any>(`${this.atendimentoUrl}/site-ubec`, atendimento, { headers: this.headers })
      .toPromise();
  }

  salvarPesquisa(pesquisa: PesquisaSatisfacao): Promise<any> {
    return this.http.post<PesquisaSatisfacao>(`${this.atendimentoUrl}/pesquisaSatisfacao`, pesquisa, {headers: this.headers})
      .toPromise();
  }

  enviarResposta(respostaEncaminhamentoSetor: RespostaEncaminhamentoSetor): Promise<any> {
    let params = new HttpParams()
    return this.http.post<any>(`${this.encaminhamentoRespostaUrl}/encaminhamentosRespostaSetor`, respostaEncaminhamentoSetor, { headers: this.headers })
      .toPromise();
  }

  uploadAnexo(): string {
    return `${this.atendimentoUrl}/anexo`;
  }

  listarTiposManifestante(orgao: number): Promise<any> {
    let params = new HttpParams()
    params = params.set('orgao', orgao);
    return this.http.get<any>(`${this.tipoManifestanteUrl}/listar-site?`,{headers: this.headers, params})
    .toPromise()
     .then(res => <any>res)
         .then(data => {
           return data.tipoManifestanteDtoList;
     });
  }

  listarOrgaoAtivos(): Promise<any> {
    let params = new HttpParams()
    return this.http.get<any>(`${this.orgaoUrl}/listar-ativos?`,{headers: this.headers, params})
    .toPromise()
     .then(res => <any>res)
         .then(data => {
           return data.orgaoDtoList;
     });
  }


  listarTiposDocumentos(orgao: number): Promise<any> {
    let params = new HttpParams()
    params = params.set('orgao', orgao);
    return this.http.get<any>(`${this.tipoDocumentoUrl}/listar?`,{headers: this.headers, params})
    .toPromise()
     .then(res => <any>res)
         .then(data => {
           return data.tipoDocumentoDtoList;
     });
  }

  consultarTipoDocumento(tipoManifestante: number, orgao: number): Promise<any>{

    let params = new HttpParams()
    params = params.set('codigoTipoManifestante', tipoManifestante);
    params = params.set('orgao', orgao);

    return this.http.get<any>(`${this.tipoManifestanteUrl}/consulta-tipodocumento?`, {headers: this.headers, params})
    .toPromise()
     .then(data => {
       return data;
     });
  }

  consultaLogotipo(orgao: string): Promise<any>{
    let params = new HttpParams()
    params = params.set('orgao', orgao);
    return this.http.get<any>(`${this.logotipoUrl}?`, {headers: this.headers, params})
    .toPromise()
     .then(res => <any>res)
         .then(data => {
           return data.logoTipoDto.nome;
     });
  }

  consultaLogotipoCloud(orgao: string): Promise<any>{
    let params = new HttpParams()
    params = params.set('orgao', orgao);
    return this.http.get<any>(`${this.logotipoUrl}?`, {headers: this.headers, params})
    .toPromise()
     .then(res => <any>res)
         .then(data => {
           return data.logoTipoDto.nome;
     });
  }

  consulta(consulta: any): Promise<any>{
    let params = new HttpParams()
    params = params.set('orgao', consulta.orgao);
    params = params.set('numero', consulta.numero);
    params = params.set('senha', consulta.senha);
    return this.http.get<any>(`${this.atendimentoUrl}/consultaAtendimento`, {headers: this.headers, params})
    .toPromise()
     .then(res => <any>res)
         .then(data => {
           return data.resumoAtendimentoDto;
     });
  }

  consultaParametroPesquisaEmail(parametro: string): Promise<any>{
    let params = new HttpParams()
    params = params.set('parametro', parametro);
    return this.http.get<any>(`${this.atendimentoUrl}/pesquisa-satisfacao/`+parametro, {headers: this.headers})
    .toPromise()
     .then(res => <any>res)
         .then(data => {
           return data.resumoAtendimentoDto;
     });
  }


  listarPorTipo(tipo: string): Promise<any[]> {

    let params = new HttpParams()
    params = params.set('codigo', tipo);
    params = params.set('orgao', "7");
    
    return this.http.get<any>(`${this.modeloDocumentoUrl}/modeloDocTipos?`, { headers: this.headers, params })
    .toPromise()
     .then(res => <any>res)
         .then(data => {
           return data.modeloDocumentoLaiDtoList;
     });
  }

  consultaEncaminhamento(parametro: string): Promise<any>{
    let params = new HttpParams()
    params = params.set('parametro', parametro);
    return this.http.get<any>(`${this.encaminhamentoUrl}/resposta-setor/`+parametro, {headers: this.headers})
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

    return this.http.get<any>(`${this.modeloDocumentoUrl}/modeloDocOutros?`, { headers: this.headers, params })
    .toPromise()
     .then(data => {
       return data.resposta;
     });
  }


  relatorioAtendimento(idAtendimento: number): Promise<any> {
    let params = new HttpParams()
    params = params.set('idAtendimento', idAtendimento.toString());

    return this.http.get<Blob>(`${this.relatorioUrl}/atendimento`, {headers: this.headers, params, responseType: 'blob' as 'json' })
      .toPromise().then((response) => {
        return response;
      })
  }


}
