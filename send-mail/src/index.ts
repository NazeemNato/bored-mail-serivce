import "dotenv/config";
import amqp from "amqplib/callback_api";
import { sendWeeklyEmail, sendWelcomeEmail } from "./service/email_serivce";

const main = () => {
  console.log("Starting send-mail");
  amqp.connect(process.env.RABBITMQ_URL!, (err, conn) => {
    if (err) {
      console.error(err);
      return;
    }
    conn.createChannel((err, ch) => {
      if (err) {
        console.error(err);
        return;
      }
      ch.assertQueue("email-queue");
      ch.consume(
        "email-queue",
        async (msg) => {
          const { fullname, email, welcome } = JSON.parse(
            msg?.content.toString()!
          );
          console.log(
            `Received message: ${fullname} ${email} ${welcome}`
          );

          if (welcome) {
            await sendWelcomeEmail(fullname, email);
          } else {
            await sendWeeklyEmail(fullname, email);
          }
        },
        { noAck: true }
      );
    });
  });
};

main();
