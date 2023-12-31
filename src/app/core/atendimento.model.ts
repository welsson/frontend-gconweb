export class Atendimento {
  id!: number;
  descricao!: string;
  orgao!: number;
  numeroProtocolo!: string;
  sequencialOrgao!: number;
  anoAtendimento!: number;
  protocoloAnterior!: string;
  sigilo!: boolean;
  tipoUsuario!: any;
  nomeSolicitante!: string;
  tipoDocumento!: number;
  numeroDocumento!: string;
  cep!: string;
  endereco!: string;
  numero!: string;
  complemento!: string;
  uf!: string;
  bairro!: string;
  municipio!: string;
  email!: string;
  dddCelular!: string;
  foneCelular!: string;
  origemManifestacao!: any;
  descricaoOque!: string;
  natureza!: number;
  captcha!: number;
  captchaInformado!: number;
  atendimentoDto!: Atendimento;
  senhaManifestante!: string;
  identificado = '';
  logotipo!: string;
  listaAnexoDto: any[] = [];
  modalidadeEnsino!: any;
  codigoRelacaoSuspeito: any;
  evidencias!: string;
  descricaoOutrosTipoUsuario!: string;
  descricaoOutrosRelacaoSuspeito!: string;
  codigoTipoDenuncia: any;
  descricaoOutrosTipoDenuncia!: string;
  codigoUnidadeMissao!: number;
}
