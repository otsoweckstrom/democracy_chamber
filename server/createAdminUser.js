const bcrypt = require('bcrypt')
const User = require('./models/User')

const createAdminUser = async () => {
	try {
		const adminUsername = process.env.ADMIN_USERNAME || 'admin'
		const adminPassword = process.env.ADMIN_PASSWORD || 'password'

		const existingAdmin = await User.findOne({ username: adminUsername })
		if (existingAdmin) {
			return
		}

		const hashedPassword = await bcrypt.hash(adminPassword, 10)
		const newAdmin = new User({
			username: adminUsername,
			password: hashedPassword,
			admin: true,
		})
		await newAdmin.save()
		console.log('Admin user created successfully.')
	} catch (error) {
		console.error('Error creating admin user:', error)
	}
}

module.exports = createAdminUser
