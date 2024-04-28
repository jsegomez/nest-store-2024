import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from 'config';

@Global()
@Module({
    imports: [
        TypeOrmModule.forRootAsync({            
            useFactory: (configServ: ConfigType<typeof config>) => {
                const { name, password, port, host, user } = configServ.database;
                return {                    
                    type: 'postgres',
                    host: host,
                    port: port,
                    database: name,    
                    username: user,
                    password: password,
                    autoLoadEntities: true,                      
                    synchronize: true
                } as TypeOrmModule
            }, 
            inject: [config.KEY],
        }),
    ],
    exports: [TypeOrmModule]
})
export class DatabaseModule { }


