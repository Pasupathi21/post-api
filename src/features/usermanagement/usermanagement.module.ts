import { Module } from '@nestjs/common';
import { UsermanagementService } from './usermanagement.service';
import { UsermanagementController } from './usermanagement.controller';

@Module({
  controllers: [UsermanagementController],
  providers: [UsermanagementService],
})
export class UsermanagementModule {}
