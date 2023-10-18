import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop({ default: uuidv4, type: String })
    _id: string;

    @Prop({ required: true })
    firstName: string;

    @Prop({ required: true })
    lastName: string;

    @Prop({ unique: true, required: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop([String])
    roles: string[];

    @Prop({ default: Date.now })
    createdAt: Date;
};

export const UserSchema = SchemaFactory.createForClass(User);
