import { CadastroComponent } from './manifestacao/cadastro/cadastro.component';
import { PesquisaComponent } from './manifestacao/pesquisa/pesquisa.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { NgxUiLoaderModule, NgxUiLoaderRouterModule } from "ngx-ui-loader";
import {AccordionModule} from 'primeng/accordion';
import {ToastModule} from 'primeng/toast';
import {CheckboxModule} from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { EditorModule } from 'primeng/editor';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {DynamicDialogModule} from 'primeng/dynamicdialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {CardModule} from 'primeng/card';
import {RadioButtonModule} from 'primeng/radiobutton';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {DropdownModule} from 'primeng/dropdown';
import {PanelModule} from 'primeng/panel';
import {ButtonModule} from 'primeng/button';
import {DividerModule} from 'primeng/divider';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {StepsModule} from 'primeng/steps';
import {TabViewModule} from 'primeng/tabview';
import {FileUploadModule} from 'primeng/fileupload';
import {HttpClientModule} from '@angular/common/http';
import { ConfirmationService, MessageService } from 'primeng/api';
import {InputMaskModule} from 'primeng/inputmask';
import { ConsultaManifestacaoComponent } from './manifestacao/consulta-manifestacao/consulta-manifestacao.component';
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







@NgModule({
  declarations: [
    AppComponent,
    PesquisaComponent,
    CadastroComponent,
    ConsultaManifestacaoComponent,
    RespostaEncaminhamentoComponent,
    RespostaRecursoComponent,
    PesquisacloudComponent,
    RespostaRecursoComponent,
    RespostaEncaminhamentoCloudComponent,
    PesquisacloudComponent,
    CadastrocCloudComponent,
    ConsultaCloudComponent,
    PesquisaSatisfacaoComponent,
    DenunciaUbecComponent,
    PerguntasFrequentesComponent,
    DenunciaComponent,
    DenunciaDiversasComponent

  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CardModule,
    InputTextModule,
    PanelModule,
    DropdownModule,
    InputTextareaModule,
    DividerModule,
    BrowserAnimationsModule,
    StepsModule,
    DialogModule,
    DynamicDialogModule,
    ButtonModule,
    ConfirmDialogModule,
    TabViewModule,
    FileUploadModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    InputMaskModule,
    ProgressSpinnerModule,
    NgxUiLoaderModule,
    NgxUiLoaderRouterModule,
    RadioButtonModule,
    AccordionModule,
    ToastModule,
    EditorModule,
    CheckboxModule

  ],
  providers: [
    MessageService,
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
