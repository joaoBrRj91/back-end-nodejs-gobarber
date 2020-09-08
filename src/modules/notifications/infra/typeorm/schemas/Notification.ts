import {
	ObjectID,
	ObjectIdColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	Entity,
} from 'typeorm';

@Entity('notifications')
class Notification {
	@ObjectIdColumn()
	id: ObjectID;

	@Column()
	content: string;

	@Column('uuid')
	recipient_id: string;

	@Column({ default: false })
	read: boolean;

	@CreateDateColumn()
	create_at: Date;

	@UpdateDateColumn()
	updated_at: Date;
}

export default Notification;
