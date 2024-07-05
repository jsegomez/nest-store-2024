import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isEmail } from 'class-validator';

@Injectable()
export class EmailPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if(!value) throw new BadRequestException(`Favor proporcionar un email`);
    if(!isEmail(value)) throw new BadRequestException(`El email proporcionado no es válido`);
    return value;
  }
}
