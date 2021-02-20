import Adapters from "next-auth/adapters";

class User extends (<any>Adapters.TypeORM.Models.User.model) {
	constructor(name, email, image, emailVerified, role) {
		super(name, email, image, emailVerified);
		this.role = "Client";
	}
}

const UserSchema = {
	name: "User",
	target: User,
	columns: {
		...Adapters.TypeORM.Models.User.schema.columns,
		role: {
			type: "varchar",
			nullable: true,
		},
	},
};

export default {
	User: {
		model: User,
		schema: UserSchema,
	},
};
