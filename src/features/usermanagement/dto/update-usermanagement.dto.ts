import { PartialType } from '@nestjs/swagger';
import { CreateUsermanagementDto } from './create-usermanagement.dto';

export class UpdateUsermanagementDto extends PartialType(CreateUsermanagementDto) {}
