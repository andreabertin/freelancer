import { Logger, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from "@nestjs/config";
import appConfig from "@configs/app.config";
import { PrometheusModule } from "@willsoto/nestjs-prometheus";
import { CustomerResolver } from "@resolvers/customer.resolver";
import { CustomerService } from "@services/customer.service";

@Module({
  imports: [
    ConfigModule.forRoot({load: [appConfig]}),
    PrometheusModule.register(), // setups default metrics under GET /metrics path
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver, // uses Apollo
      autoSchemaFile: true, // schema generated in memory
      subscriptions: {
        'graphql-ws': true, // enables graphql-ws package for subscriptions
      },
    }),
  ],
  providers: [CustomerResolver, CustomerService, Logger],
})
export class AppModule {
}
