import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isMongoId } from 'class-validator';

@Injectable()
export class MongoIdPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    if(!value) throw new BadRequestException(`Favor proporcionar un id`);
    if(!isMongoId(value)) throw new BadRequestException(`El id ${value} no es válido`);
    return value;
  }
}
