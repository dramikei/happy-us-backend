import { PartialType } from '@nestjs/mapped-types';
import { CreateOrphanStepDto } from './create-orphan-step.dto';

export class UpdateOrphanStepDto extends PartialType(CreateOrphanStepDto) {}
