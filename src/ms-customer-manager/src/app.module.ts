import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { TypeOrmModule } from '@nestjs/typeorm';
import appConfig from '@configs/app.config';
import ormConfig from '@configs/orm.config';
import msConfig, { MicroserviceConfig, MS_CONFIG_KEY } from '@configs/ms.config';
import { CqrsModule } from "@nestjs/cqrs";
import { CommandHandlers } from "@commands/handlers";
import { EventHandlers } from "@events/handlers";
import { Customer } from "@entities/customer.entity";
import { QueryHandlers } from "@queries/handlers";
import { ClientProxyFactory, Transport } from "@nestjs/microservices";
import { BROADCASTER_TOKEN } from "@decorators/broadcaster.decorator";
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from "@nestjs/graphql";
import { CustomersResolver } from "@resolvers/customer.resolver";

@Module({
  imports: [
    ConfigModule.forRoot({load: [appConfig, msConfig]}),
    TypeOrmModule.forRoot(ormConfig),
    TypeOrmModule.forFeature([Customer]),
    CqrsModule,
    PrometheusModule.register(), // setups default metrics under GET /metrics path
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: true,
      subscriptions: {
        'graphql-ws': true, // enables graphql-ws package for subscriptions
      },
    }),
  ],
  providers: [
    Logger,
    ...CommandHandlers,
    ...QueryHandlers,
    ...EventHandlers,
    CustomersResolver,
    {
      provide: BROADCASTER_TOKEN,
      useFactory: (configService: ConfigService) => {
        const ms = configService.getOrThrow<MicroserviceConfig>(MS_CONFIG_KEY);
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
