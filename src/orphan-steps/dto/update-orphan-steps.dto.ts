import { PartialType } from '@nestjs/mapped-types';
import { CreateOrphanStepsDto } from './create-orphan-steps.dto';

export class UpdateOrphanStepsDto extends PartialType(CreateOrphanStepsDto) {}
