import { Logger, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule, ConfigService } from "@nestjs/config";
import appConfig from "@configs/app.config";
import { PrometheusModule } from "@willsoto/nestjs-prometheus";
import { CustomerResolver } from "@resolvers/customer.resolver";
import { CustomerService } from "@services/customer.service";
import gwConfig, { GatewayConfig, GW_CONFIG_KEY } from "@configs/gw.config";
import { ClientProxyFactory, Transport } from "@nestjs/microservices";

@Module({
  imports: [
    ConfigModule.forRoot({load: [appConfig, gwConfig]}),
    PrometheusModule.register(), // setups default metrics under GET /metrics path
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver, // uses Apollo
      autoSchemaFile: true, // schema generated in memory
      subscriptions: {
        'graphql-ws': true, // enables graphql-ws package for subscriptions
      },
    })
  ],
  providers: [
    CustomerResolver,
    CustomerService,
    Logger,
    {
      provide: 'CUSTOMER_MS',
      useFactory: (configService :ConfigService) => {
        const config = configService.getOrThrow<GatewayConfig>(GW_CONFIG_KEY);
        const ms = config.customerMs;
        return ClientProxyFactory.create({
          transport: Transport[ms.transport],
          options: {
            url: ms.url
          }
        })
      },
      inject: [ConfigService]
    }
  ],
})
export class AppModule {
}
