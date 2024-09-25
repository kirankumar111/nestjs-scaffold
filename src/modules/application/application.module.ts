import { Module } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { ApplicationController } from './application.controller';
import { WWApplication } from './entities/application.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KafkaModule } from 'src/providers/infra/kafka/kafka.module';
import { EventProducerModule } from 'src/events/producers/producer.module';

@Module({
  imports: [TypeOrmModule.forFeature([WWApplication]),
  KafkaModule,
  EventProducerModule],
  controllers: [ApplicationController],
  providers: [ApplicationService],
  exports: [ApplicationService],
})
export class ApplicationModule {}
