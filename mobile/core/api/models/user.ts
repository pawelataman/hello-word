export interface CreateUser {
	id: string,
	username: string | null,
	firstName: string | null,
	lastName: string | null,
	fullName: string | null,
	emailAddress: string | null,
	createdAt: Date | null
}

// const {id, username, firstName, lastName, fullName, emailAddresses, createdAt} = user