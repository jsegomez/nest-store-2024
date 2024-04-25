import { registerAs } from "@nestjs/config";

export default registerAs('config', () => {
    return {
        database: {
            user: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            dbName: process.env.DATABASE_NAME,
            port: process.env.DATABASE_PORT,
            uri: process.env.DABASE_URL,
        }
    }
})