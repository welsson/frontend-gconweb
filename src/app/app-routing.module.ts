import { ConsultaManifestacaoComponent } from './manifestacao/consulta-manifestacao/consulta-manifestacao.component';
import { CadastroComponent } from './manifestacao/cadastro/cadastro.component';
import { PesquisaComponent } from './manifestacao/pesquisa/pesquisa.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PesquisacloudComponent } from './manifestacao/pesquisacloud/pesquisacloud.component';
import { RespostaEncaminhamentoComponent } from './manifestacao/resposta-encaminhamento/resposta-encaminhamento.component';
import { RespostaRecursoComponent } from './manifestacao/resposta-recurso/resposta-recurso.component';
import { RespostaEncaminhamentoCloudComponent } from './manifestacao/resposta-encaminhamento-cloud/resposta-encaminhamento-cloud.component';
import { CadastrocCloudComponent } from './manifestacao-cloud/cadastro/cadastro.component';
import { ConsultaCloudComponent } from './manifestacao-cloud/consulta/consulta.component';
import { PesquisaSatisfacaoComponent } from './manifestacao/pesquisa-satisfacao/pesquisa-satisfacao.component';
import { DenunciaUbecComponent } from './manifestacao/denuncia-ubec/denuncia-ubec.component';
import { PerguntasFrequentesComponent } from './perguntas-frequentes/perguntas-frequentes.component';
import { DenunciaComponent } from './manifestacao/denuncia/denuncia.component';
import { DenunciaDiversasComponent } from './manifestacao/denuncia-diversas/denuncia-diversas.component';

const routes: Routes = [
  { path: '1/pesquisa', component: PesquisaComponent },
  { path: '2/pesquisa', component: PesquisaComponent },
  { path: '3/pesquisa', component: PesquisaComponent },
  { path: '4/pesquisa', component: PesquisaComponent },
  { path: '5/pesquisa', component: PesquisaComponent },     
  { path: '6/pesquisa', component: PesquisaComponent },
  { path: '7/pesquisa', component: PesquisaComponent },
  { path: '8/pesquisa', component: PesquisaComponent },
  { path: '9/pesquisa', component: PesquisaComponent },
  { path: '10/pesquisa', component: PesquisaComponent },
  { path: '11/pesquisa', component: PesquisaComponent },
  { path: '11/pesquisacloud', component: PesquisacloudComponent },
  { path: '12/pesquisacloud', component: PesquisacloudComponent },

  { path: '1/denuncia', component: DenunciaUbecComponent },
  { path: '2/denuncia', component: DenunciaUbecComponent },
  { path: '3/denuncia', component: DenunciaUbecComponent },
  { path: '4/denuncia', component: DenunciaUbecComponent },
  { path: '5/denuncia', component: DenunciaUbecComponent },     
  { path: '6/denuncia', component: DenunciaUbecComponent },
  { path: '7/denuncia', component: DenunciaUbecComponent },
  { path: '8/denuncia', component: DenunciaUbecComponent },
  { path: '9/denuncia', component: DenunciaUbecComponent },
  { path: '10/denuncia', component: DenunciaUbecComponent },

  { path: '1/cadastro/:id', component: CadastroComponent },
  { path: '2/cadastro/:id', component: CadastroComponent },
  { path: '3/cadastro/:id', component: CadastroComponent },
  { path: '4/cadastro/:id', component: CadastroComponent },
  { path: '5/cadastro/:id', component: CadastroComponent },
  { path: '6/cadastro/:id', component: CadastroComponent },
  { path: '7/cadastro/:id', component: CadastroComponent },
  { path: '8/cadastro/:id', component: CadastroComponent },
  { path: '9/cadastro/:id', component: CadastroComponent },
  { path: '10/cadastro/:id', component: CadastroComponent },
  { path: '11/cadastro/:id', component: CadastroComponent },

  { path: '1/cadastro/denuncia/:id', component: DenunciaComponent },
  { path: '2/cadastro/denuncia/:id', component: DenunciaComponent },
  { path: '3/cadastro/denuncia/:id', component: DenunciaComponent },
  { path: '4/cadastro/denuncia/:id', component: DenunciaComponent },
  { path: '5/cadastro/denuncia/:id', component: DenunciaComponent },
  { path: '6/cadastro/denuncia/:id', component: DenunciaComponent },
  { path: '7/cadastro/denuncia/:id', component: DenunciaComponent },
  { path: '8/cadastro/denuncia/:id', component: DenunciaComponent },
  { path: '9/cadastro/denuncia/:id', component: DenunciaComponent },
  { path: '10/cadastro/denuncia/:id', component: DenunciaComponent },
  { path: '11/cadastro/denuncia/:id', component: DenunciaComponent },

  { path: '1/cadastro/denuncia-diversas/:id', component: DenunciaDiversasComponent },
  { path: '2/cadastro/denuncia-diversas/:id', component: DenunciaDiversasComponent },
  { path: '3/cadastro/denuncia-diversas/:id', component: DenunciaDiversasComponent },
  { path: '4/cadastro/denuncia-diversas/:id', component: DenunciaDiversasComponent },
  { path: '5/cadastro/denuncia-diversas/:id', component: DenunciaDiversasComponent },
  { path: '6/cadastro/denuncia-diversas/:id', component: DenunciaDiversasComponent },
  { path: '7/cadastro/denuncia-diversas/:id', component: DenunciaDiversasComponent },
  { path: '8/cadastro/denuncia-diversas/:id', component: DenunciaDiversasComponent },
  { path: '9/cadastro/denuncia-diversas/:id', component: DenunciaDiversasComponent },
  { path: '10/cadastro/denuncia-diversas/:id', component: DenunciaDiversasComponent },
  { path: '11/cadastro/denuncia-diversas/:id', component: DenunciaDiversasComponent },

  { path: '11/cadastrocloud/:id', component: CadastrocCloudComponent },
  { path: '12/cadastrocloud/:id', component: CadastrocCloudComponent },
  { path: '1/consulta', component: ConsultaManifestacaoComponent },
  { path: '2/consulta', component: ConsultaManifestacaoComponent },
  { path: '3/consulta', component: ConsultaManifestacaoComponent },
  { path: '4/consulta', component: ConsultaManifestacaoComponent },
  { path: '5/consulta', component: ConsultaManifestacaoComponent },
  { path: '6/consulta', component: ConsultaManifestacaoComponent },
  { path: '7/consulta', component: ConsultaManifestacaoComponent },
  { path: '8/consulta', component: ConsultaManifestacaoComponent },  
  { path: '9/consulta', component: ConsultaManifestacaoComponent },
  { path: '10/consulta', component: ConsultaManifestacaoComponent },
  { path: '11/consulta', component: ConsultaManifestacaoComponent },
  { path: '11/consultacloud', component: ConsultaCloudComponent },
  { path: '12/consultacloud', component: ConsultaCloudComponent },

  { path: '1/pergunta-frequente', component: PerguntasFrequentesComponent },
  { path: '2/pergunta-frequente', component: PerguntasFrequentesComponent },
  { path: '3/pergunta-frequente', component: PerguntasFrequentesComponent },
  { path: '4/pergunta-frequente', component: PerguntasFrequentesComponent },
  { path: '5/pergunta-frequente', component: PerguntasFrequentesComponent },
  { path: '6/pergunta-frequente', component: PerguntasFrequentesComponent },
  { path: '7/pergunta-frequente', component: PerguntasFrequentesComponent },
  { path: '8/pergunta-frequente', component: PerguntasFrequentesComponent },
  { path: '9/pergunta-frequente', component: PerguntasFrequentesComponent },
  { path: '10/pergunta-frequente', component: PerguntasFrequentesComponent },
  { path: '11/pergunta-frequente', component: PerguntasFrequentesComponent },
  { path: '12/pergunta-frequente', component: PerguntasFrequentesComponent },

  { path: 'resposta-encaminhamento-cloud/:parametro', component: RespostaEncaminhamentoCloudComponent },
  { path: 'resposta-encaminhamento/:parametro', component: RespostaEncaminhamentoComponent },
  { path: 'resposta-recurso/:parametro', component: RespostaRecursoComponent },
  { path: 'pesquisa-satisfacao/:parametro', component: PesquisaSatisfacaoComponent },
  { path: '**', redirectTo: 'pagina-nao-encontrada' }
];

@NgModule({
  //imports: [RouterModule.forRoot(routes, {useHash: true})],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
