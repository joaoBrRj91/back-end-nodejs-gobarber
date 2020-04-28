import { uuid } from 'uuidv4';

class Appointment {
	id: string;

	provider: string;

	date: Date;

	// Uma forma de tipar o parametro do construtor omitindo uma propriedade da estrutura atual
	constructor({ provider, date }: Omit<Appointment, 'id'>) {
		this.id = uuid();
		this.provider = provider;
		this.date = date;
	}
}

export default Appointment;
