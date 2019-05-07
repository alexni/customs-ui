import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { AngularSplitModule } from 'angular-split';
import { ChatComponent } from 'src/app/modules/claims/chat/chat.component';
import { ChatService } from 'src/app/modules/claims/chat/chat.service';
import { MessageComponent } from 'src/app/modules/claims/chat/message/message.component';
import { ChatModelsFactory } from 'src/app/modules/claims/chat/models/chat-models.factory';
import { SendMessageComponent } from 'src/app/modules/claims/chat/send-message/send-message.component';
import { UsersModule } from 'src/app/modules/users/users.module';
import { UICommonModule } from 'src/app/ui/common/ui-common.module';
import { LoaderWithBackdropModule } from 'src/app/ui/loader-with-backdrop/loader-with-backdrop.module';

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
  ],

  declarations: [
    ChatComponent,
    MessageComponent,
    SendMessageComponent,
  ],

  providers: [
    ChatModelsFactory,
    ChatService,
  ],

  exports: [
    ChatComponent,
  ],
})
export class ChatModule {}
