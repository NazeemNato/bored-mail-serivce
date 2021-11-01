import { Notifire, ChannelTypeEnum } from "@notifire/core";
import { NodemailerProvider } from "@notifire/nodemailer";

export const sendWelcomeEmail = async (fullname: string, email: string) => {
  const notifire = new Notifire();
  await notifire.registerProvider(
    new NodemailerProvider({
      from: process.env.MAIL!,
      host: process.env.MAIL_SMTP_HOST!,
      port: 465,
      secure: true,
      user: process.env.MAIL!,
      password: process.env.MAIL_PASSWORD!,
    })
  );
  await notifire.registerTemplate({
    id: "send-welcome-mail",
    messages: [
      {
        subject: "Welcome to RabbitMQ",
        channel: ChannelTypeEnum.EMAIL,
        template: `<h1>Welcome ${fullname}</h1>`,
      },
    ],
  });

  await notifire.trigger("send-welcome-mail", {
    $user_id: `${email}-${fullname}-${new Date().toISOString}`,
    $email: email,
  });
  console.log("Welcome Email sent");
};

export const sendWeeklyEmail = async (fullname: string, email: string) => {
  const notifire = new Notifire();
  await notifire.registerProvider(
    new NodemailerProvider({
      from: process.env.MAIL!,
      host: process.env.MAIL_SMTP_HOST!,
      port: 465,
      secure: true,
      user: process.env.MAIL!,
      password: process.env.MAIL_PASSWORD!,
    })
  );

  const score =
    Math.floor(Math.random() * 100) + Math.floor(Math.random() * 100);
  await notifire.registerTemplate({
    id: "send-weekly-mail",
    messages: [
      {
        subject: "Weekly score",
        channel: ChannelTypeEnum.EMAIL,
        template: `<h1>Hey ${fullname} </h1>
            <p> Your weekly score is ${score} </p>`,
      },
    ],
  });

  await notifire.trigger("send-weekly-mail", {
    $user_id: `${email}-${fullname}-${new Date().toISOString}`,
    $email: email,
  });
  console.log("Weekly Email sent");
};
