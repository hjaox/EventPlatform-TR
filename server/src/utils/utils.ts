import mongoose from "mongoose";
import nodemailer from "nodemailer";
import type SMTPTransport from 'nodemailer/lib/smtp-transport';

export function checkPatchEvent(event: unknown) {
    const eventProperties = ["title", "dateStart", "dateEnd", "address", "details", "summary", "tag", "price", "openPrice"];

    if (!event || typeof event !== "object" || Array.isArray(event)) return false;

    for (const property of eventProperties) {
        if (Object.keys(event).includes(property)) return true;
    }

    return false;
}

export function checkPostEvent(event: unknown) {
    const eventProperties = ["title", "dateStart", "dateEnd", "address"];

    if (!event || typeof event !== "object" || Array.isArray(event)) return false;

    for (const property of eventProperties) {
        if (!Object.keys(event).includes(property)) return false;
    }

    return true;
}

export function checkAttendee(attendee: unknown) {
    const attendeeProperty = ["name", "email", "quantity"];

    if (!attendee || typeof attendee !== "object" || Array.isArray(attendee)) return false;

    for (const property of attendeeProperty) {
        if (!Object.keys(attendee).includes(property)) return false;
    }

    return true;
}

export function checkIfValidObjectId(objectId: unknown) {
    return mongoose.isValidObjectId(objectId);
}

// export function sendTicketEmail() {
//     nodemailer.createTestAccount((err, account) => {
//         if (err) {
//             console.error('Failed to create a testing account');
//             console.error(err);
//             return process.exit(1);
//         }

//         console.log('Credentials obtained, sending message...');

//         // NB! Store the account object values somewhere if you want
//         // to re-use the same account for future mail deliveries

//         // Create a SMTP transporter object
//         let transporter = nodemailer.createTransport(
//             {
//                 host: account.smtp.host,
//                 port: account.smtp.port,
//                 secure: account.smtp.secure,
//                 auth: {
//                     user: account.user,
//                     pass: account.pass
//                 },
//                 logger: true,
//                 transactionLog: true, // include SMTP traffic in the logs
//                 allowInternalNetworkInterfaces: false
//             } as SMTPTransport.Options,
//             {
//                 // default message fields

//                 // sender info
//                 from: 'Nodemailer <example@nodemailer.com>',
//                 headers: {
//                     'X-Laziness-level': 1000 // just an example header, no need to use this
//                 }
//             } as any
//         );

//         // Message object
//         let message = {
//             // Comma separated list of recipients
//             to: 'Nodemailer <example@nodemailer.com>',

//             // Subject of the message
//             subject: 'Nodemailer is unicode friendly ✔' + Date.now(),

//             // plaintext body
//             text: 'Hello to myself!',

//             // HTML body
//             html: `<p><b>Hello</b> to myself <img src="cid:note@example.com"/></p>
//             <p>Here's a nyan cat for you as an embedded attachment:<br/><img src="cid:nyan@example.com"/></p>`,

//             // AMP4EMAIL
//             amp: `<!doctype html>
//             <html ⚡4email>
//               <head>
//                 <meta charset="utf-8">
//                 <style amp4email-boilerplate>body{visibility:hidden}</style>
//                 <script async src="https://cdn.ampproject.org/v0.js"></script>
//                 <script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>
//               </head>
//               <body>
//                 <p><b>Hello</b> to myself <amp-img src="https://cldup.com/P0b1bUmEet.png" width="16" height="16"/></p>
//                 <p>No embedded image attachments in AMP, so here's a linked nyan cat instead:<br/>
//                   <amp-anim src="https://cldup.com/D72zpdwI-i.gif" width="500" height="350"/></p>
//               </body>
//             </html>`,

//             // An array of attachments
//             attachments: [
//                 // String attachment
//                 {
//                     filename: 'notes.txt',
//                     content: 'Some notes about this e-mail',
//                     contentType: 'text/plain' // optional, would be detected from the filename
//                 },

//                 // Binary Buffer attachment
//                 {
//                     filename: 'image.png',
//                     content: Buffer.from(
//                         'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAD/' +
//                             '//+l2Z/dAAAAM0lEQVR4nGP4/5/h/1+G/58ZDrAz3D/McH8yw83NDDeNGe4U' +
//                             'g9C9zwz3gVLMDA/A6P9/AFGGFyjOXZtQAAAAAElFTkSuQmCC',
//                         'base64'
//                     ),

//                     cid: 'note@example.com' // should be as unique as possible
//                 },

//                 // File Stream attachment
//                 {
//                     filename: 'nyan cat ✔.gif',
//                     path: __dirname + '/assets/nyan.gif',
//                     cid: 'nyan@example.com' // should be as unique as possible
//                 }
//             ],

//             list: {
//                 // List-Help: <mailto:admin@example.com?subject=help>
//                 help: 'admin@example.com?subject=help',

//                 // List-Unsubscribe: <http://example.com> (Comment)
//                 unsubscribe: [
//                     {
//                         url: 'http://example.com/unsubscribe',
//                         comment: 'A short note about this url'
//                     },
//                     'unsubscribe@example.com'
//                 ],

//                 // List-ID: "comment" <example.com>
//                 id: {
//                     url: 'mylist.example.com',
//                     comment: 'This is my awesome list'
//                 }
//             }
//         };

//         transporter.sendMail(message, (error, info) => {
//             if (error) {
//                 console.log('Error occurred');
//                 console.log(error.message);
//                 return process.exit(1);
//             }

//             console.log('Message sent successfully!');
//             console.log(nodemailer.getTestMessageUrl(info));

//             // only needed when using pooled connections
//             transporter.close();
//         });
//     });
// }
// sendTicketEmail();

const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "aliya.blick@ethereal.email",
      pass: "FKMR5uBHfkwMsBsn1S",
    },
  });

  // async..await is not allowed in global scope, must use a wrapper
  async function main() {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"Aliya Blick" <aliya.blick@ethereal.email>', // sender address
      to: "aliya.blick@ethereal.email, baz@example.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
  }

  main().catch(console.error);