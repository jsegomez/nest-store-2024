import { registerAs } from "@nestjs/config";

export default registerAs('config', () => {
    return {
        database: {            
            type: process.env.DATABASE_TYPE,
            name: process.env.DATABASE_NAME,
            port: process.env.DATABASE_PORT,
            host: process.env.DATABASE_HOST,
            user: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD
        }
    }
})




