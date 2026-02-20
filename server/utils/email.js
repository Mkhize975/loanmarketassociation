const nodemailer = require('nodemailer');

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
    host: 'smtp.example.com', // replace with your SMTP host
    port: 587, // replace with your SMTP port
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'your_email@example.com', // replace with your email
        pass: 'your_password' // replace with your email password
    }
});

// Function to send booking confirmation email
const sendBookingConfirmation = (to, bookingDetails) => {
    const mailOptions = {
        from: 'your_email@example.com', // sender address
        to: to, // list of receivers
        subject: 'Booking Confirmation', // Subject line
        text: `Dear Customer,\n\nThank you for your booking. Here are your booking details:\n${bookingDetails}\n\nBest Regards,\nYour Company Name`, // plain text body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log('Error occurred: ' + error.message);
        }
        console.log('Message sent: %s', info.messageId);
    });
};

module.exports = { sendBookingConfirmation };