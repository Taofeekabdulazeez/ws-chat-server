import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Group } from './group.entity';

@Entity({ name: 'user_group' })
export class UserGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'member' })
  role: string;

  @CreateDateColumn({ name: 'joined_at' })
  joinedAt: Date;

  @PrimaryColumn({ name: 'user_id', type: 'uuid' })
  userId: string;

  @PrimaryColumn({ name: 'group_id', type: 'uuid' })
  groupId: string;

  @ManyToOne(() => User, (user) => user.groups)
  user: User;

  @ManyToOne(() => Group, (group) => group.users)
  group: Group;
}
