import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { GroupsService } from '../services/groups.service';
import { Response } from 'express';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Get()
  async getAllGroups(@Res() response: Response) {
    const groups = await this.groupsService.findAllGroups();

    return response
      .status(HttpStatus.OK)
      .json({ message: 'success', data: groups });
  }

  @Get('/:id')
  async getGroup(
    @Param('id', ParseUUIDPipe) id: string,
    @Res() response: Response,
  ) {
    const group = await this.groupsService.findGroupById(id);

    return response
      .status(HttpStatus.OK)
      .json({ message: 'success', data: group });
  }

  @Post()
  async createNewGroup(@Body() body: any, @Res() response: Response) {
    const group = await this.groupsService.createGroup(body);
    return response
      .status(HttpStatus.OK)
      .json({ message: 'success', data: group });
  }

  @Patch('/:id')
  async updateGroup(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: any,
    @Res() response: Response,
  ) {
    const group = await this.groupsService.updateGroup(id, body);

    return response
      .status(HttpStatus.OK)
      .json({ message: 'success', data: group });
  }

  @Delete('/:id')
  async deleteGroup(
    @Param('id', ParseUUIDPipe) id: string,
    @Res() response: Response,
  ) {
    await this.groupsService.deleteGroupById(id);

    return response
      .status(HttpStatus.OK)
      .json({ message: 'success', data: null });
  }
}
