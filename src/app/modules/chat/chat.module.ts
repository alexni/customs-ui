import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { AngularSplitModule } from 'angular-split';
import { ChatComponent } from 'src/app/modules/chat/chat.component';
import { ChatService } from 'src/app/modules/chat/chat.service';
import { MessageComponent } from 'src/app/modules/chat/message/message.component';
import { ChatModelsFactory } from 'src/app/modules/chat/models/chat-models.factory';
import { SendMessageComponent } from 'src/app/modules/chat/send-message/send-message.component';
import { UrlPreviewService } from 'src/app/modules/chat/url-preview/url-preview.service';
import { UsersModule } from 'src/app/modules/users/users.module';
import { UICommonModule } from 'src/app/ui/common/ui-common.module';
import { LoaderWithBackdropModule } from 'src/app/ui/loader-with-backdrop/loader-with-backdrop.module';
import { UrlParserModule } from 'src/app/ui/urls-parser/url-parser.module';

import { UrlPreviewComponent } from './url-preview/url-preview.component';

@NgModule({
  imports: [
    CommonModule,
    UICommonModule,
    FormsModule,
    ReactiveFormsModule,
    UsersModule,
    LoaderWithBackdropModule,
    MatButtonModule,
    MatIconModule,
    AngularSplitModule,
    UrlParserModule,
  ],

  declarations: [
    ChatComponent,
    MessageComponent,
    SendMessageComponent,
    UrlPreviewComponent,
  ],

  providers: [
    ChatModelsFactory,
    ChatService,
    UrlPreviewService,
  ],

  exports: [
    ChatComponent,
  ],
})
export class ChatModule {}
