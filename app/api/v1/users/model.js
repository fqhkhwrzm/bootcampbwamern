const mongoose = require('mongoose');
// const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); // fungsinya untuk ngehash password kita, tidak mentah2 disimpan di collection kita
const { model, Schema } = mongoose;

let userSchema = Schema(
    {
        name: {
            type: String,
            required: [true, 'Nama harus diisi'],
            minlength: 3,
            maxlength: 50,
        },
        email: {
            type: String,
            unique: true,
            required: [true, 'Email harus diisi'],
        },
        password: {
            type: String,
            required: [true, 'Password harus diisi'],
            minlength: 6,
        },
        role: {
            type: String,
            enum: ['admin', 'organizer', 'owner'],
            default: 'admin',
        },
        organizer: {
            type: mongoose.Types.ObjectId,
            ref: 'Organizer',
            required: true,
        },
    },
    { timestamps: true }
);

/* 
    fungsi user.pre ini untuk hooks, hooksnya mongo, 
    dimana nanti sblm kita simpan, waktu ngecreate user, sblm dia 
    nyimpen data name, email, pw, role, maka ia melakukan yang namanya modifikasi password
*/
userSchema.pre('save', async function (next) {
    const User = this;
    // password dimodofikasi, valuenya kita ubaha
    if (User.isModified('password')) {
        User.password = await bcrypt.hash(User.password, 12);
    }
    next();
})

// untuk mengcompare pw, ada candidatePassword yang dikirim dari client/postman kita, terus kita cek pw nya dg yg ada di db kita
userSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch; // hasil dari value ini True/false
}

module.exports = model('User', userSchema);