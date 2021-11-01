import axios from "axios";
import { connection } from "../config/rabbitmq";
export const sendReports = async () => {
  const response = await axios.get(process.env.EMAIL_API!);
  const { data } = response.data;
  for (const user of data) {
    const { fullname, email } = user;
    console.log(`Sending email to ${fullname} at ${email}`);
    (await connection).createChannel().then((channel) => {
      channel.assertQueue("email-queue");
      channel.sendToQueue(
        "email-queue",
        Buffer.from(JSON.stringify({ fullname, email, welcome: false }))
      );
    });
  }
};
