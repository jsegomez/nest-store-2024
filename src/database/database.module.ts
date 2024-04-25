import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import config from 'config';

@Global()
@Module({
    imports: [
        MongooseModule.forRootAsync({
            useFactory: (configServ: ConfigType<typeof config>) => {                
                const { user, password, dbName, port, uri } = configServ.database;
                
                return {
                    uri: `${uri}:${port}`, 
                    user,
                    pass: password,
                    dbName
                }
            },
            inject: [config.KEY]
        })
    ],
    exports: [
        MongooseModule
    ]
})
export class DatabaseModule {}
