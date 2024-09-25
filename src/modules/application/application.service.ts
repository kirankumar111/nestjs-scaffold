import { Injectable, HttpException, Inject } from '@nestjs/common';
import { CreateApplicationDto } from './dto/create-application.dto';
import { WWApplication } from './entities/application.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApplicationEventProducerService } from 'src/events/producers/applications/application-producer.service';
import { ApplicationEventTypes } from 'src/common/enums/application-event.enums';
import { ApplicationEventInterface } from './interfaces/application-event.interface';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(WWApplication)
    private readonly applicationRepository: Repository<WWApplication>,
    //private readonly _kafka: ProducerService
    @Inject(ApplicationEventProducerService) // Good practice to add the inject decorator in the constructor to make it clear that the service is injected as once javascript is compiled it discovers this provider as a object instance
    private readonly producer: ApplicationEventProducerService
  ) {}
  async create(createApplicationDto: CreateApplicationDto) {
    const userData =
      await this.applicationRepository.create(createApplicationDto);
    return this.applicationRepository.save(userData);
  }

  async findAll() {
    this.producer.publishEvent({
      key : ApplicationEventTypes.Created,
      value: {
        name: 'test',
        description: 'test'
      }
    });
    return await this.applicationRepository.find();
  }

  async findOne(id: number) {
    const applicationData = await this.applicationRepository.findOneBy({ id });
    if (!applicationData) {
      throw new HttpException('User Not Found', 404);
    }
    return applicationData;
  }

  async processEvent(event : ApplicationEventInterface) {
    console.log(event.key,event.value);
  }
}
