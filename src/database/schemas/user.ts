import mongoose from 'mongoose';

const reqString = { type: String, required: true };

const userSchema = new mongoose.Schema({
	guildId: reqString,
	userId: reqString,
	experience: {
		type: Number,
		required: true,
	},
});

export default mongoose.model('users', userSchema);
