import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class AccessBlacklist {
  @Prop({ type: String, required: true })
  accessToken: string;
}

@Schema()
export class RefreshRevoked {
  @Prop({ type: String, required: true })
  refreshToken: string;
}

export type AccessBlacklistDocument = AccessBlacklist & Document;

export type RefreshRevokedDocument = RefreshRevoked & Document;

export const AccessBlacklistSchema =
  SchemaFactory.createForClass(AccessBlacklist);

export const RefreshRevokedSchema =
  SchemaFactory.createForClass(RefreshRevoked);
