import { Controller } from '@nestjs/common';
import { GroupsService } from '../services/groups.service';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}
}
