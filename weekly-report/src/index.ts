import "dotenv/config";
import { Agenda } from "agenda";
import { sendReports } from "./service/report_service";

const mongoConnectionString = process.env.MONGO_URL!;
const agenda = new Agenda({ db: { address: mongoConnectionString } });

agenda.define("send weekly report", async (_, done) => {
  console.log("Sending weekly report");
  await sendReports()
  done();
});

(async function () {
  const weeklyReport = agenda.create("send weekly report", {});
  await agenda.start();
  await weeklyReport.repeatEvery("1 week").save();
})();
