const mongoose = require('mongoose') // Erase if already required

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true,
		},
		// đồng hồ apple -> convert: dong-ho-apple
		slug: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
		},
		description: {
			type: Array,
			required: true,
		},
		brand: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		thumb: {
			type: String,
			required: true,
		},
		category: {
			type: String,
			required: true,
		},
		quantity: {
			type: Number,
			default: 0,
		},
		sold: {
			type: Number,
			default: 0,
		},
		images: {
			type: Array,
		},
		color: {
			type: String,
			// required: true,
		},
		rating: [
			{
				star: { type: Number },
				postedBy: { type: mongoose.Types.ObjectId, ref: 'User' },
				comment: { type: String },
				updatedAt: { type: Date },
			},
		],
		totalRating: {
			type: Number,
			default: 0,
		},
		varriants: [
			{
				color: String,
				price: Number,
				thumb: String,
				images: Array,
				title: String,
				sku: String,
			},
		],
	},
	{
		timestamps: true,
	},
)

//Export the model
module.exports = mongoose.model('Product', productSchema)
