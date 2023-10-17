const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({

host: "smtp.gmail.com",
auth: {
  user: 'tkkoksall@gmail.com',
  pass: 'kqgp zkxj inov quba'
}
  
});

const mailOptions = {
  from: {
    name: "Mustafa Berk",
    address: "tkkoksall@gmail.com",
  },
  attachments: [
    {
      filename: "deneme dosya", 
      path:"/Users/krymac/Desktop/zaglitLogo.png",
    },
  ],
  to: 'tanrivermis.mehmet@gmail.com',
  subject: 'Geyik :)',
  text: 'Baby sen bir harikasın :D 🤟🏽!'
};


module.exports = async function(){

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

}


