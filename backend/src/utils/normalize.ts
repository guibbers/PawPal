export const normalize = (str: string): string => {
	return str
		.normalize('NFD') // separa os acentos
		.replace(/[\u0300-\u036f]/g, '') // remove os acentos
		.toLowerCase(); // minúsculas
};
