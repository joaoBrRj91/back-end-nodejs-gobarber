// Similar ao estensions methods onde é adicionado a biblioteca novaas funcionaldades
// Essa funcionalidade não sobreescreve as interfaces já criada,mas adiciona novos membros
declare namespace Express {
	export interface Request {
		user: {
			id: string;
		};
	}
}
