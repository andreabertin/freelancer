import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from "@nestjs/config";
import appConfig from "@configs/app.config";
import { PrometheusModule } from "@willsoto/nestjs-prometheus";
import gwConfig, { CUSTOMER_MS_CONFIG_KEY, MicroserviceConfig } from "@configs/gw.config";
import { ClientProxyFactory, Transport } from "@nestjs/microservices";
import { CustomerController } from "./controllers/customer.controller";

@Module({
  imports: [
    ConfigModule.forRoot({load: [appConfig, gwConfig]}),
    PrometheusModule.register(), // setups default metrics under GET /metrics path
  ],
  controllers: [
    CustomerController
  ],
  providers: [
    Logger,
    {
      provide: 'CUSTOMER_GATEWAY',
      useFactory: (configService: ConfigService) => {
        const config = configService.getOrThrow<MicroserviceConfig>(CUSTOMER_MS_CONFIG_KEY);
        return ClientProxyFactory.create({
          transport: Transport[config.transport],
          options: {
            url: config.url
          }
        })
      },
      inject: [ConfigService]
    }
  ],
})
export class AppModule {

}
