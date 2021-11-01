import amqp from "amqplib";

export const connection = amqp.connect(process.env.RABBITMQ_URL!);