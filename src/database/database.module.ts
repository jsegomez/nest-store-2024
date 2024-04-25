import { Global, Module } from '@nestjs/common';


@Global()
@Module({
    providers: [
        {
            provide: 'API_KEY',
            useValue: 'Este es la clave que debo enviar'
        }
    ],
    exports: [
        'API_KEY'
    ]
})
export class DatabaseModule {}
